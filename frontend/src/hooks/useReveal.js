import { useEffect } from "react";

export default function useReveal(selector = "[data-reveal]", rootMargin = "0px 0px -10% 0px") {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(selector));
    if (!('IntersectionObserver' in window) || items.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin });

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, rootMargin]);
}
