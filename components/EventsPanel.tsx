"use client";

import { useState } from "react";

// Placeholder — replace with real event data when available
const PAST_EVENTS = Array.from({ length: 6 }, (_, i) => ({
  slug: `event-${i + 1}`,
  name: "Event Name",
  date: "Month Year",
}));

const segments = ["past", "current", "next"] as const;
type View = (typeof segments)[number];

const labels: Record<View, string> = {
  past: "Past Events",
  current: "Current Event",
  next: "Next Events",
};

const segmentBase =
  "flex-1 text-center py-2.5 text-xs md:text-sm font-mono tracking-wide whitespace-nowrap px-2 transition-all cursor-pointer select-none";

const orangeActive =
  "bg-gradient-to-b from-orange-400 to-accent text-white relative overflow-hidden";

const darkActive = "bg-gray-900 text-white shadow-inner";

const inactiveBase = "bg-white/60 text-gray-700 hover:bg-white/80";

const highlight =
  "pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/20 to-transparent";

function PastEventTile({
  slug,
  name,
  date,
}: {
  slug: string;
  name: string;
  date: string;
}) {
  const [errored, setErrored] = useState(false);
  const path = `/images/events/${slug}.jpg`;

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-300">
      {!errored && (
        <img
          src={path}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <p className="text-white text-xl font-medium">{name}</p>
        <p className="text-gray-300 text-base mt-0.5">{date}</p>
      </div>
    </div>
  );
}

export default function EventsPanel() {
  const [view, setView] = useState<View>("current");

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-full shadow-lg border border-white/20 overflow-hidden w-full max-w-md">
        <div className="flex items-center w-full">
          {segments.map((seg) => {
            const isActive = seg === view;

            return (
              <button
                key={seg}
                onClick={() => setView(seg)}
                className={`${segmentBase} ${
                  isActive ? darkActive : orangeActive
                } ${seg === "past" ? "rounded-l-full" : seg === "next" ? "rounded-r-full" : ""}`}
              >
                {!isActive && <span className={highlight} />}
                <span className="relative">{labels[seg]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {view === "current" && (
        <div className="flex gap-8 w-full flex-col lg:flex-row">
          <div className="flex-[2] backdrop-blur-md bg-white/40 border border-black/10 rounded-3xl shadow-xl flex items-center justify-center aspect-video lg:aspect-auto lg:min-h-[450px]">
            <p className="text-gray-400 font-mono text-2xl">Event Photos</p>
          </div>
          <div className="flex-1 backdrop-blur-md bg-white/40 border border-black/10 rounded-3xl shadow-xl px-14 py-12 flex flex-col justify-center">
            <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">
              Latest Event
            </p>
            <p className="text-gray-900 font-mono text-3xl mt-3">
              No upcoming event
            </p>
            <p className="text-gray-400 text-lg mt-3">
              Details will appear here once an event is scheduled.
            </p>
          </div>
        </div>
      )}

      {view === "past" && (
        <div className="w-full max-w-6xl overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {PAST_EVENTS.map((event) => (
              <div key={event.slug} className="w-[400px] flex-shrink-0">
                <PastEventTile {...event} />
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "next" && (
        <div className="backdrop-blur-md bg-white/40 border border-black/10 rounded-3xl shadow-xl px-16 py-28 w-full flex flex-col items-center justify-center text-center">
          <p className="text-gray-900 font-mono text-3xl">No upcoming events</p>
          <p className="text-gray-400 text-lg mt-2">
            Check back later for future events.
          </p>
        </div>
      )}
    </div>
  );
}
