import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UploadModal from "@/components/UploadModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkBase = "relative transition-colors hover:text-foreground text-muted-foreground after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-emerald-400 after:to-sky-500 after:transition-all hover:after:w-full";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-emerald-50/90 via-sky-50/80 to-cyan-50/90 backdrop-blur supports-[backdrop-filter]:bg-sky-50/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="group inline-flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 via-sky-500 to-cyan-500 shadow ring-1 ring-white/40" />
            <span className="text-sm font-semibold tracking-wide">MSVAV's Clicks</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => `${linkBase} ${isActive ? "text-foreground" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) => `${linkBase} ${isActive ? "text-foreground" : ""}`}
            >
              Gallery
            </NavLink>
            <button
              onClick={() => {
                setOpen(true);
                navigate("/gallery");
              }}
              className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:shadow-md active:scale-95"
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
