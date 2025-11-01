# MSV's Clicks — Nature Clicks Gallery

A simple full‑stack photo gallery for nature clicks.

## Prerequisites
- Node.js 18 LTS (recommended) or Node 20
- npm (bundled with Node)
- Python 3.11+
- MongoDB (local or cloud URI)

> Note: Create React App (react-scripts) is not compatible with Node 24. Use Node 18/20.

## Project Structure
- `frontend/` — React app (CRA + craco + Tailwind)
- `backend/` — FastAPI service with MongoDB (GridFS) for images

## Backend Setup
1) Create and activate a Python virtual environment (optional but recommended).
2) Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3) Create `backend/.env` with at least:
   ```bash
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=msv_gallery
   # Optional: comma-separated origins
   CORS_ORIGINS=*
   ```
4) Run the server:
   ```bash
   uvicorn backend.server:app --reload --port 8000
   ```
   Backend base URL: `http://localhost:8000`

### Useful Backend Endpoints
- `GET /api/` — Hello World
- `POST /api/status` — Write a status check
- `GET /api/status` — List status checks
- `POST /api/photos` — Upload a photo (multipart form)
- `GET /api/photos` — List photos (pagination)
- `GET /api/photos/{id}/raw` — Original image
- `GET /api/photos/{id}/thumb?max=800&q=72` — Thumbnail
- `DELETE /api/photos/{id}` — Delete
- `POST /api/photos/seed` — Seed from `frontend/public/images` using `images.json`

## Frontend Setup
1) Ensure Node 18/20 is active:
   ```powershell
   node -v
   ```
   If you see v24, switch to Node 18/20.

2) Configure `frontend/.env` (example):
   ```env
   VITE_BACKEND_URL=http://localhost:8000/api
   REACT_APP_ENABLE_VISUAL_EDITS=false
   ENABLE_HEALTH_CHECK=false
   ```

3) Install and run (Vite):
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

## Verify Debranding
- Browser tab title should be: `MSV's Clicks`
- Meta description: `Nature clicks`
- No “Made with Emergent” badge in the bottom-right

## Build/Preview (frontend)
```bash
cd frontend
npm run build
npm run preview
```
Output in `frontend/dist/`. Preview serves on a random local port.

## Troubleshooting
- If `npm install` fails on peer deps, use `--legacy-peer-deps` (as above).
- If the dev server exits immediately, confirm Node 18/20 is active.
- Clear cache/hard refresh if you still see old branding.
- PostHog/rrweb are optional; remove if you prefer no analytics/session capture.

## Notes
- Sample images live in `frontend/public/images/` with metadata in `images.json`.
- The backend’s `/api/photos/seed` can populate the DB from these files.
