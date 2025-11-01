import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "@/components/ConfirmDialog";
import Lightbox from "@/components/Lightbox";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PAGE_LIMIT = 12;

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const fetchPhotos = useCallback(async (p = 1) => {
    try {
      const resp = await axios.get(`${API}/photos`, { params: { page: p, limit: PAGE_LIMIT } });
      const data = resp.data || { photos: [], has_more: false };
      if (p === 1) setPhotos(data.photos);
      else setPhotos((prev) => [...prev, ...(data.photos || [])]);
      setHasMore(!!data.has_more);
    } catch (e) {
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPhotos(1); }, [fetchPhotos]);
  useEffect(() => {
    const refresh = () => { setPage(1); fetchPhotos(1); };
    window.addEventListener("gallery:refresh", refresh);
    return () => window.removeEventListener("gallery:refresh", refresh);
  }, [fetchPhotos]);

  const onDelete = (id) => setConfirm({ open: true, id });
  const handleConfirm = async () => {
    const id = confirm.id;
    setConfirm({ open: false, id: null });
    try {
      await axios.delete(`${API}/photos/${id}`);
      setPage(1);
      fetchPhotos(1);
    } catch (e) {
      console.error(e);
      alert("Delete failed. Please try again.");
    }
  };

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextLightbox = () => setLightbox((s) => ({ open: true, index: Math.min(photos.length - 1, s.index + 1) }));
  const prevLightbox = () => setLightbox((s) => ({ open: true, index: Math.max(0, s.index - 1) }));

  const lightboxSrc = useMemo(() => (photos[lightbox.index] ? `${API}${photos[lightbox.index].path}` : ""), [lightbox.index, photos]);
  const lightboxAlt = useMemo(() => photos[lightbox.index]?.alt || `Photo ${lightbox.index + 1}`, [lightbox.index, photos]);

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
    <>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Gallery</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <p>
              Page {page} • {photos.length} loaded
            </p>
            {hasMore && (
              <button
                onClick={() => { const np = page + 1; setPage(np); fetchPhotos(np); }}
                className="rounded-md border px-3 py-1.5 text-xs hover:bg-accent"
              >
                Load more
              </button>
            )}
          </div>
        </div>
        <div className="columns-1 gap-5 sm:columns-2 md:columns-3">
          {photos.map((photo, index) => (
            <div key={photo.id} className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-border">
              <button onClick={() => openLightbox(index)} aria-label={`Open photo ${index + 1}`} className="block w-full">
                <img
                  src={`${API}${photo.path.replace('/raw', '/thumb')}`}
                  alt={photo.alt || `Photo ${index + 1}`}
                  className="w-full rounded-2xl object-cover opacity-0 transition-all duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                />
              </button>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <Link
                  to={`/photo/${index}`}
                  className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm backdrop-blur group-hover:bg-white"
                >
                  View
                </Link>
                <a
                  href={`${API}${photo.path}?download=true`}
                  className="inline-flex items-center rounded-md bg-sky-600/90 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-sky-700"
                  download
                >
                  Download
                </a>
                <button
                  onClick={() => onDelete(photo.id)}
                  className="inline-flex items-center rounded-md bg-red-600/90 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-700"
                  aria-label={`Delete photo ${index + 1}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <ConfirmDialog
        open={confirm.open}
        title="Delete photo?"
        description="This will permanently remove the photo from the gallery and database."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setConfirm({ open: false, id: null })}
      />
      <Lightbox
        open={lightbox.open}
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />
    </>
  );
};

export default Gallery;
