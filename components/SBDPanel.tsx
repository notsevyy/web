"use client";

import { useState } from "react";
import PolaroidCard from "./PolaroidCard";

const sbdCTO = { name: "TBD", role: "Chief Technology Officer" };
const sbdViceCTO = { name: "TBD", role: "Vice-Chief Technology Officer" };

const sbdTracks = [
  { code: "SWE", fullName: "Software Engineering", lead: "TBD", coLead: "TBD" },
  { code: "DSE", fullName: "Data Science/Engineering", lead: "TBD", coLead: "TBD" },
  { code: "AIML", fullName: "AI/Machine Learning", lead: "TBD", coLead: "TBD" },
];

const glassHeader = "backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl px-8 py-3 shadow-lg";

const purplePill = [
  "bg-gradient-to-b from-purple-400 to-purple-600",
  "text-white",
  "border border-white/50",
  "shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
];

const navGlass =
  "bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.2)]";

export default function SBDPanel() {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5 max-w-5xl mx-auto">
      <div className={glassHeader}>
        <h2 className="text-2xl font-mono tracking-wide text-gray-900 text-center">Skill Builder Department</h2>
      </div>
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="w-64">
          <PolaroidCard name={sbdCTO.name} role={sbdCTO.role} />
        </div>
        <div className="w-64">
          <PolaroidCard name={sbdViceCTO.name} role={sbdViceCTO.role} />
        </div>
      </div>

      <div className={`flex flex-wrap justify-center gap-2 rounded-2xl px-5 py-3 ${navGlass}`}>
        {sbdTracks.map((track, i) => (
          <button
            key={track.code}
            onClick={() => setTab(i)}
            className={`relative overflow-hidden rounded-full font-mono tracking-wide font-medium transition-all whitespace-nowrap px-5 py-2 text-sm
              ${tab === i
                ? purplePill.join(" ")
                : `text-white/60 ${purplePill.map((c) => `hover:${c}`).join(" ")}`
              }`}
          >
            <span
              className={`pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent
                ${tab === i ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
            />
            <span className="relative">{track.code}</span>
          </button>
        ))}
      </div>

      <div key={tab} className="flex justify-center gap-6 animate-fadeIn">
        <div className="w-72">
          <PolaroidCard name={sbdTracks[tab].lead} role="Lead" />
        </div>
        <div className="w-72">
          <PolaroidCard name={sbdTracks[tab].coLead} role="Co-Lead/Mentor" />
        </div>
      </div>
    </div>
  );
}
