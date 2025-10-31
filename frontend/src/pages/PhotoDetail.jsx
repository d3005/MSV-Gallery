import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const index = Number(id);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await axios.get(`${API}/photos`);
        setPhotos(resp.data.photos || []);
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

  useEffect(() => {
    // Preload prev/next for quicker navigation
    const preload = (idx) => {
      if (idx >= 0 && idx < photos.length) {
        const img = new Image();
        img.src = `${API}${photos[idx].path}`;
      }
    };
    preload(index + 1);
    preload(index - 1);
  }, [index, photos]);

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
          <span>{photo.title || `Photo ${index + 1}`}</span>
        </nav>
        <div className="flex items-center gap-2">
          <button
            disabled={index <= 0}
            onClick={() => navigate(`/photo/${index - 1}`)}
            className="rounded-md border px-3 py-1.5 text-sm enabled:hover:bg-accent disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Prev
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back
          </button>
          <button
            disabled={index >= photos.length - 1}
            onClick={() => navigate(`/photo/${index + 1}`)}
            className="rounded-md border px-3 py-1.5 text-sm enabled:hover:bg-accent disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Next
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={`${API}${photo.path}`} alt={photo.alt || `Photo ${index + 1}`} className="w-full object-contain" />
      </div>
    </main>
  );
};

export default PhotoDetail;
