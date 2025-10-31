import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Still Nature</p>
        <p>Built with love for photography</p>
      </div>
    </footer>
  );
};

export default Footer;
