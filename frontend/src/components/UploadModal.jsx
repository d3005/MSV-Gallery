import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const UploadModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (title) fd.append("title", title);
      if (alt) fd.append("alt", alt);
      await axios.post(`${API}/photos`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // notify gallery to refresh
      window.dispatchEvent(new CustomEvent("gallery:refresh"));
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload Image</h3>
          <button onClick={onClose} className="rounded-md border px-2 py-1 text-xs hover:bg-accent">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Image file</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 w-full rounded-md border p-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm">Title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-md border p-2 text-sm"
              placeholder="Sunset at the lake"
            />
          </div>
          <div>
            <label className="text-sm">Alt text (optional)</label>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="mt-1 w-full rounded-md border p-2 text-sm"
              placeholder="A beautiful sunset across the lake"
            />
          </div>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">Cancel</button>
            <button disabled={loading} type="submit" className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-sky-700 disabled:opacity-60">
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
