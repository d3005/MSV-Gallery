import React, { useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  useEffect(() => {
    const ping = async () => {
      try { await axios.get(`${API}/`); } catch (e) {}
    };
    ping();
    document.title = "Still Nature";
  }, []);

  return (
    <main>
      {/* Clean, minimal hero with sky gradient */}
      <section className="relative">
        <div className="absolute inset-x-0 -z-10 h-[420px] bg-gradient-to-b from-sky-100 via-sky-50 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-14 md:grid-cols-2 md:pt-20">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 drop-shadow-sm dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.4)] md:text-6xl">
              Still Nature
            </h1>
            <p className="text-muted-foreground md:text-lg">
              A calm, nature-first showcase of sky, moon, and bloom. Simple. Serene. Yours to explore.
            </p>
            <div className="flex gap-3">
              <a href="/gallery" className="inline-flex items-center justify-center rounded-md bg-sky-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-sky-700">
                Explore Gallery
              </a>
            </div>
          </div>
          <div className="relative">
            <img src="/images/logo.jpg" alt="Preview" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-border" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
