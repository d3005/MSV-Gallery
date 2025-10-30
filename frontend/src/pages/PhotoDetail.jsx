import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const index = Number(id);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch("/images.json");
        const data = await resp.json();
        setPhotos(data.images || []);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  const photo = photos[index];

  if (!Number.isFinite(index)) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center">Invalid photo id</div>;
  }

  if (!photo) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center">Photo not found</div>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      <div className="mb-6 flex items-center justify-between">
        <nav className="text-sm text-muted-foreground">
          <Link to="/gallery" className="hover:text-foreground">Gallery</Link>
          <span className="mx-2">/</span>
          <span>Photo {index + 1}</span>
        </nav>
        <button
          onClick={() => navigate(-1)}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
        >
          Back
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={photo.url} alt={photo.alt || `Photo ${index + 1}`} className="w-full object-contain" />
      </div>
    </main>
  );
};

export default PhotoDetail;
