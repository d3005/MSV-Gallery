import React, { useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  useEffect(() => {
    const ping = async () => {
      try {
        await axios.get(`${API}/`);
      } catch (e) {
        // no-op: backend might be offline in some environments
        // console.warn("Backend ping failed", e);
      }
    };
    ping();
  }, []);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2 md:pt-16">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span>Photography</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>Nature • Travel • Moments</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            MSVAV's Photography Journey Begins Here
          </h1>
          <p className="text-muted-foreground md:text-lg">
            Capturing the whispers of the wind, the glow of the moon, and the colors of a setting sun. Every tree tells a
            story, every flower blooms with joyful moments of nature, frozen in time.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/gallery"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
            >
              Explore Now
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-pink-500/30 via-fuchsia-500/20 to-yellow-500/20 blur-xl" />
          <img
            src="/images/logo.jpg"
            alt="Gallery preview"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg ring-1 ring-border"
          />
        </div>
      </section>
      <section id="about" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Curated", desc: "Handpicked shots that tell a story." },
            { title: "High-quality", desc: "Optimized for crisp viewing across devices." },
            { title: "Explorable", desc: "Browse details for each moment with ease." },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
