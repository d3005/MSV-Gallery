import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UploadModal from "@/components/UploadModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-sky-50/90 via-sky-100/80 to-sky-50/90 backdrop-blur supports-[backdrop-filter]:bg-sky-50/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="group inline-flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-sky-400 to-sky-600" />
            <span className="text-sm font-semibold tracking-wide">MSVAV's Clicks</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              Gallery
            </NavLink>
            <button
              onClick={() => {
                setOpen(true);
                navigate("/gallery");
              }}
              className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-sky-700"
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
