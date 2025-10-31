import React, { useEffect, useRef } from "react";

const ConfirmDialog = ({ open, title = "Confirm", description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel }) => {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
    };
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => confirmRef.current?.focus(), 10);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-desc">
      <div className="w-full max-w-sm rounded-xl border bg-background p-5 shadow-2xl">
        <h3 id="confirm-title" className="text-lg font-semibold">{title}</h3>
        {description ? (
          <p id="confirm-desc" className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div className="mt-5 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            {cancelLabel}
          </button>
          <button ref={confirmRef} onClick={onConfirm} className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
