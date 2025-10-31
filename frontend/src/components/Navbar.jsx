import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UploadModal from "@/components/UploadModal";

const linkClass = (isActive) =>
  [
    "relative px-1 py-0.5 text-sm font-semibold tracking-wide transition-all",
    "text-slate-200/90 hover:text-cyan-300",
    isActive ? "text-cyan-300" : "",
    "drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]",
    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:rounded-full",
    "after:bg-gradient-to-r after:from-fuchsia-400 after:to-cyan-400 after:shadow-[0_0_10px_#22d3ee] after:transition-all",
    isActive ? "after:w-full" : "hover:after:w-full",
  ].join(" ");

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0b1220]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/70">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="group inline-flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-fuchsia-500 via-cyan-400 to-emerald-400 shadow-[0_0_18px_rgba(34,211,238,0.7)] ring-1 ring-cyan-300/50" />
            <span className="text-sm font-bold tracking-wide text-slate-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">Still Nature</span>
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
              Home
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => linkClass(isActive)}>
              Gallery
            </NavLink>
            <button
              onClick={() => {
                setOpen(true);
                navigate("/gallery");
              }}
              className="inline-flex h-9 items-center rounded-md bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 px-3 text-xs font-bold text-slate-900 shadow-[0_0_18px_rgba(56,189,248,0.8)] ring-1 ring-cyan-300/60 transition-transform hover:scale-[1.02] active:scale-95"
            >
              Upload
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <UploadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
