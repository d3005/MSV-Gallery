import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPhotos = useCallback(async () => {
    try {
      const resp = await axios.get(`${API}/photos`);
      setPhotos(resp.data.photos || []);
      if (!resp.data.photos || resp.data.photos.length === 0) {
        try {
          await axios.post(`${API}/photos/seed`);
          const resp2 = await axios.get(`${API}/photos`);
          setPhotos(resp2.data.photos || []);
        } catch {}
      }
    } catch (e) {
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);
  useEffect(() => {
    const refresh = () => fetchPhotos();
    window.addEventListener("gallery:refresh", refresh);
    return () => window.removeEventListener("gallery:refresh", refresh);
  }, [fetchPhotos]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="columns-1 gap-5 sm:columns-2 md:columns-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="mb-5 h-60 animate-pulse rounded-2xl bg-gradient-to-br from-sky-50 to-white" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Gallery</h2>
        <p className="text-sm text-muted-foreground">{photos.length} photos</p>
      </div>
      <div className="columns-1 gap-5 sm:columns-2 md:columns-3">
        {photos.map((photo, index) => (
          <Link
            key={photo.id}
            to={`/photo/${index}`}
            className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-border"
          >
            <img
              src={`${API}${photo.path}`}
              alt={photo.alt || `Photo ${index + 1}`}
              className="w-full rounded-2xl object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm backdrop-blur group-hover:bg-white">
                View
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
