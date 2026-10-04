"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTodayKey } from "@/lib/date";
import { readSavedState } from "@/lib/storage";

export default function HomePage() {
  const [todayKey, setTodayKey] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayKey(getTodayKey());
    setStreak(readSavedState().streak);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-4 py-8 text-slate-100">
      <header className="flex items-center justify-between">
        <div className="rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
          {todayKey || "Today"}
        </div>
        <div className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-amber-300">
          🔥 {streak}
        </div>
      </header>

      <section className="space-y-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Daily food showdown</p>
        <h1 className="text-4xl font-black leading-tight text-white">Plate Pick</h1>
        <p className="text-base text-slate-300">
          Five matchups. One obvious answer. Zero patience for fake “healthy” branding.
        </p>
      </section>

      <div className="space-y-3">
        <Link
          href="/play"
          className="flex items-center justify-center rounded-full bg-amber-400 px-4 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-300"
        >
          Play today’s round
        </Link>
        <Link
          href="/how-to-play"
          className="flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-3 text-base font-semibold text-slate-100 transition hover:border-slate-500"
        >
          How to play
        </Link>
      </div>

      <footer className="text-center text-xs text-slate-400">
        For fun and general education. Not medical advice.
      </footer>
    </main>
  );
}
