"use client";

import { useEffect, useState } from "react";

function getTimeUntilNextRound(): string {
  const now = new Date();
  const etNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const nextMidnight = new Date(etNow);
  nextMidnight.setDate(etNow.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const diffMs = nextMidnight.getTime() - now.getTime();
  const hours = Math.max(0, Math.floor(diffMs / 3_600_000));
  const minutes = Math.max(0, Math.floor((diffMs % 3_600_000) / 60_000));
  const seconds = Math.max(0, Math.floor((diffMs % 60_000) / 1000));

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    const update = () => setTimeLeft(getTimeUntilNextRound());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="text-sm text-slate-300">Next round in {timeLeft}</div>;
}
