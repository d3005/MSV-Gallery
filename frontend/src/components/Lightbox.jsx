import React, { useEffect } from "react";

const Lightbox = ({ open, src, alt, onClose, onNext, onPrev }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNext, onPrev]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-md border border-white/30 bg-black/50 px-3 py-1.5 text-white hover:bg-white/10"
      >
        Close
      </button>
      <button
        onClick={onPrev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md border border-white/30 bg-black/50 px-3 py-1.5 text-white hover:bg-white/10"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/30 bg-black/50 px-3 py-1.5 text-white hover:bg-white/10"
      >
        ›
      </button>
      <img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] object-contain" />
    </div>
  );
};

export default Lightbox;
