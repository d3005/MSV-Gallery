import React, { useEffect } from "react";
import axios from "axios";
import useReveal from "@/hooks/useReveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  useEffect(() => {
    const ping = async () => {
      try { await axios.get(`${API}/`); } catch (e) {}
    };
    ping();
  }, []);

  useReveal();

  return (
    <main className="relative">
      {/* Soft sky gradient backdrop with floating blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-x-0 -z-10 h-[480px] bg-gradient-to-b from-sky-100 via-sky-50 to-transparent" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:pt-20">
          <div className="space-y-6" data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs text-sky-700 shadow-sm">
              <span>Good vibes only</span>
              <span className="h-1 w-1 rounded-full bg-sky-400" />
              <span>Sky • Sea • Forest</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Nature feels better with every click
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Breathe in the breeze, follow the sunlight, and wander into warm hues. This is a cozy corner for
              moonlit nights and glowing mornings—crafted to spark joy.
            </p>
            <div className="flex flex-wrap gap-3" data-reveal>
              <a href="/gallery" className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-600 to-cyan-600 px-5 py-2 text-sm font-medium text-white shadow hover:shadow-md active:scale-95">
                Explore Gallery
              </a>
              <a href="#about" className="inline-flex items-center justify-center rounded-md border px-5 py-2 text-sm font-medium hover:bg-accent">
                Learn more
              </a>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground" data-reveal>
              <div className="rounded-lg border bg-white/60 px-3 py-2 shadow-sm">15+ serene shots</div>
              <div className="rounded-lg border bg-white/60 px-3 py-2 shadow-sm">Smooth vibes</div>
              <div className="rounded-lg border bg-white/60 px-3 py-2 shadow-sm">Dark mode ready</div>
            </div>
          </div>
          <div className="relative" data-reveal>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-sky-300/30 via-sky-400/20 to-cyan-400/20 blur-2xl" />
            <img src="/images/logo.jpg" alt="Gallery preview" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-border" />
          </div>
        </div>
      </section>

      {/* Vibes section */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-6 text-2xl font-bold" data-reveal>Vibes of Nature</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Sun-lit", desc: "Warm tones and gentle light.", emoji: "☀️" },
            { title: "Moon-kissed", desc: "Quiet nights and silver skies.", emoji: "🌙" },
            { title: "Blooming", desc: "Petals, colors, and hope.", emoji: "🌸" },
          ].map((card) => (
            <div key={card.title} data-reveal className="group rounded-xl border bg-gradient-to-b from-white to-sky-50 p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 text-3xl">{card.emoji}</div>
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border bg-gradient-to-r from-emerald-50 to-sky-50 p-6 text-center shadow-sm" data-reveal>
          <p className="text-sm text-muted-foreground">
            "In every walk with nature one receives far more than he seeks."
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
