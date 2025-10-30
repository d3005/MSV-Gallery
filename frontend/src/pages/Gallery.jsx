import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch("/images.json");
        const data = await resp.json();
        setPhotos(data.images || []);
      } catch (e) {
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-red-500">{error}</div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Gallery</h2>
        <p className="text-sm text-muted-foreground">{photos.length} photos</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo, index) => (
          <Link
            key={index}
            to={`/photo/${index}`}
            className="group relative block overflow-hidden rounded-2xl ring-1 ring-border"
          >
            <img
              src={photo.url}
              alt={photo.alt || `Photo ${index + 1}`}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
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
