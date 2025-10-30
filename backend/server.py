from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# GridFS bucket (store image binaries in DB)
bucket = AsyncIOMotorGridFSBucket(db)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Photo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    filename: str
    content_type: Optional[str] = None
    size: int
    created_at: datetime
    alt: Optional[str] = None
    title: Optional[str] = None
    path: str  # frontend should prefix with `${API}`

class PhotoList(BaseModel):
    photos: List[Photo]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Photos API
@api_router.post("/photos", response_model=Photo)
async def upload_photo(
    file: UploadFile = File(...),
    alt: Optional[str] = Form(None),
    title: Optional[str] = Form(None),
):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")

    photo_id = str(uuid.uuid4())

    # Stream upload into GridFS with custom string id
    try:
        file_data = await file.read()
        total = len(file_data)
        await bucket.upload_from_stream_with_id(
            photo_id,
            file.filename,
            file_data,
            metadata={"contentType": file.content_type},
        )
    except Exception as e:
        # Cleanup partial file if needed
        try:
            await bucket.delete(photo_id)
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Upload failed: {e}")

    created = datetime.now(timezone.utc)

    photo_doc = {
        "id": photo_id,
        "file_id": photo_id,  # same as id to avoid exposing ObjectId
        "filename": file.filename,
        "content_type": file.content_type,
        "size": total,
        "created_at": created.isoformat(),
        "alt": alt,
        "title": title,
    }
    await db.photos.insert_one(photo_doc)

    resp = Photo(
        id=photo_id,
        filename=file.filename,
        content_type=file.content_type,
        size=total,
        created_at=created,
        alt=alt,
        title=title,
        path=f"/photos/{photo_id}/raw",
    )
    return resp

@api_router.get("/photos", response_model=PhotoList)
async def list_photos():
    docs = await db.photos.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    photos: List[Photo] = []
    for d in docs:
        created = d.get("created_at")
        if isinstance(created, str):
            created = datetime.fromisoformat(created)
        photos.append(
            Photo(
                id=d["id"],
                filename=d.get("filename", ""),
                content_type=d.get("content_type"),
                size=int(d.get("size", 0)),
                created_at=created or datetime.now(timezone.utc),
                alt=d.get("alt"),
                title=d.get("title"),
                path=f"/photos/{d['id']}/raw",
            )
        )
    return PhotoList(photos=photos)

@api_router.get("/photos/{photo_id}/raw")
async def get_photo_raw(photo_id: str):
    # Ensure photo metadata exists
    meta = await db.photos.find_one({"id": photo_id}, {"_id": 0})
    if not meta:
        raise HTTPException(status_code=404, detail="Photo not found")
    content_type = meta.get("content_type") or "application/octet-stream"

    try:
        download_stream = await bucket.open_download_stream(photo_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Image binary not found")

    async def file_iterator():
        while True:
            chunk = await download_stream.readchunk()
            if not chunk:
                break
            yield chunk

    return StreamingResponse(file_iterator(), media_type=content_type)

@api_router.post("/photos/seed")
async def seed_photos_from_public():
    """Seed database with images from frontend/public/images.json and images directory.
    Only runs if collection is empty, to avoid duplicates.
    """
    existing = await db.photos.estimated_document_count()
    if existing and existing > 0:
        return {"status": "skipped", "reason": "photos collection not empty", "count": existing}

    public_dir = Path("/app/frontend/public")
    json_path = public_dir / "images.json"
    images_dir = public_dir / "images"

    if not json_path.exists() or not images_dir.exists():
        raise HTTPException(status_code=404, detail="images.json or images directory not found")

    import json
    with open(json_path, "r") as f:
        data = json.load(f)
    images = data.get("images", [])

    created_total = 0
    for item in images:
        url = item.get("url")
        alt = item.get("alt")
        if not url:
            continue
        # url is like /images/img1.jpg
        disk_path = images_dir / Path(url).name
        if not disk_path.exists():
            continue
        photo_id = str(uuid.uuid4())
        filename = disk_path.name
        content_type = "image/jpeg" if filename.lower().endswith(".jpg") or filename.lower().endswith(".jpeg") else "image/png"
        try:
            with open(disk_path, "rb") as rf:
                file_data = rf.read()
            await bucket.upload_from_stream_with_id(
                photo_id, 
                filename, 
                file_data, 
                metadata={"contentType": content_type}
            )
        except Exception as e:
            try:
                await bucket.delete(photo_id)
            except Exception:
                pass
            raise HTTPException(status_code=500, detail=f"Seed upload failed for {filename}: {e}")

        created = datetime.now(timezone.utc)
        size = disk_path.stat().st_size
        await db.photos.insert_one({
            "id": photo_id,
            "file_id": photo_id,
            "filename": filename,
            "content_type": content_type,
            "size": size,
            "created_at": created.isoformat(),
            "alt": alt,
            "title": alt,
        })
        created_total += 1

    return {"status": "ok", "created": created_total}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
