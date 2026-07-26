"use client";

const glassHeader = "backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl px-8 py-3 shadow-lg";

export default function EventsPanel() {
  return (
    <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto">
      <div className={glassHeader}>
        <h2 className="text-2xl font-mono tracking-wide text-gray-900 text-center">Events</h2>
      </div>
      <div className="backdrop-blur-md bg-white/40 border border-black/10 rounded-3xl shadow-xl px-12 py-24 max-w-3xl w-full mx-4 flex items-center justify-center">
        <p className="text-gray-400 font-mono text-lg">Placeholder</p>
      </div>
    </div>
  );
}
