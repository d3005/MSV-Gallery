import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="group inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-gradient-to-br from-pink-500 to-red-500" />
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
          <a
            href="https://emergent.sh"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-muted-foreground hover:text-primary transition-colors"
          >
            Emergent
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
