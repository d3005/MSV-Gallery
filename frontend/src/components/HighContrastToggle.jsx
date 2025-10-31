import React, { useEffect, useState } from "react";

const HighContrastToggle = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("contrast") === "high";
    setOn(saved);
    document.documentElement.classList.toggle("hc", saved);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    localStorage.setItem("contrast", next ? "high" : "normal");
    document.documentElement.classList.toggle("hc", next);
  };

  return (
    <button onClick={toggle} className="inline-flex h-9 items-center rounded-md border px-2 text-xs text-foreground hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" aria-label="Toggle high contrast mode">
      {on ? "Default Contrast" : "High Contrast"}
    </button>
  );
};

export default HighContrastToggle;
