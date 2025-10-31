import React, { useEffect, useState, useRef } from "react";

const applyContrast = (on) => {
  document.documentElement.classList.toggle("hc", !!on);
  localStorage.setItem("contrast", on ? "high" : "normal");
};

const HighContrastToggle = () => {
  const [on, setOn] = useState(false);
  const clickTimer = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("contrast") === "high";
    setOn(saved);
    document.documentElement.classList.toggle("hc", saved);
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    applyContrast(next);
  };

  const handleDoubleClick = () => {
    // Double click: force-switch contrast and persist
    const next = !on;
    setOn(next);
    applyContrast(next);
  };

  const handleClick = () => {
    // Support both single click and double click without conflict
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    clickTimer.current = setTimeout(() => {
      toggle();
      clickTimer.current = null;
    }, 200);
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      aria-pressed={on}
      aria-label={on ? "Switch to default contrast" : "Switch to high contrast"}
      className="inline-flex h-9 items-center rounded-md border px-2 text-xs text-foreground hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      title={on ? "Default Contrast" : "High Contrast"}
    >
      {on ? "Default Contrast" : "High Contrast"}
    </button>
  );
};

export default HighContrastToggle;
