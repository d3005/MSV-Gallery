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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") navigate(-1);
      if (e.key === "ArrowLeft" && index > 0) navigate(`/photo/${index - 1}`);
      if (e.key === "ArrowRight" && index < photos.length - 1) navigate(`/photo/${index + 1}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, navigate, photos.length]);

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
        <div className="flex items-center gap-2">
          <button
            disabled={index <= 0}
            onClick={() => navigate(`/photo/${index - 1}`)}
            className="rounded-md border px-3 py-1.5 text-sm enabled:hover:bg-accent disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
          >
            Back
          </button>
          <button
            disabled={index >= photos.length - 1}
            onClick={() => navigate(`/photo/${index + 1}`)}
            className="rounded-md border px-3 py-1.5 text-sm enabled:hover:bg-accent disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={photo.url} alt={photo.alt || `Photo ${index + 1}`} className="w-full object-contain" />
      </div>
    </main>
  );
};

export default PhotoDetail;
