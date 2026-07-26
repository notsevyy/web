"use client";

import { useState } from "react";
import PolaroidCard from "./PolaroidCard";

const tier5Pairs = [
  {
    office: "Operations",
    chief: { name: "John Joshua Leal", role: "Chief Operations Officer" },
    vice: { name: "John Laurence Paz", role: "Vice-Chief Operations Officer" },
  },
  {
    office: "Relations",
    chief: { name: "Stephen Jarcelle Nera", role: "Chief Relations Officer" },
    vice: { name: "John Jeremy Mitra", role: "Vice-Chief Relations Officer" },
  },
  {
    office: "Marketing",
    chief: { name: "Rubilyn Ayuban", role: "Chief Marketing Officer" },
    vice: { name: "Chelsey Manila", role: "Vice-Chief Marketing Officer" },
  },
  {
    office: "Creatives",
    chief: { name: "Sophia Jullia De Jesus", role: "Chief Creatives Officer" },
    vice: { name: "Jaisen Paulo Co", role: "Vice-Chief Creatives Officer" },
  },
  {
    office: "Finance",
    chief: { name: "Euryle Vivien Ang", role: "Chief Financial Officer" },
    vice: { name: "Kenn Dacanay", role: "Vice-Chief Financial Officer" },
  },
  {
    office: "Technology",
    chief: { name: "William Sayson", role: "Chief Tech Officer" },
    vice: { name: "Andre Vinzent Dy", role: "Vice-Chief Tech Officer" },
  },
];

const glassHeader = "backdrop-blur-md bg-white/60 border border-black/10 rounded-2xl px-8 py-3 shadow-lg";

const tealPill = [
  "bg-gradient-to-b from-teal-300 to-teal-500",
  "text-white",
  "border border-white/50",
  "shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
];

const navGlass =
  "bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.2)]";

export default function OfficesPanel() {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto">
      <div className={glassHeader}>
        <h2 className="text-2xl font-mono tracking-wide text-gray-900 text-center">Offices</h2>
      </div>
      <div className={`flex flex-wrap justify-center gap-2 rounded-2xl px-5 py-3 ${navGlass}`}>
        {tier5Pairs.map((pair, i) => (
          <button
            key={pair.office}
            onClick={() => setTab(i)}
            className={`relative overflow-hidden rounded-full font-mono tracking-wide font-medium transition-all whitespace-nowrap px-4 py-2 text-sm
              ${tab === i
                ? tealPill.join(" ")
                : `text-white/60 ${tealPill.map((c) => `hover:${c}`).join(" ")}`
              }`}
          >
            <span
              className={`pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent
                ${tab === i ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
            />
            <span className="relative">{pair.office}</span>
          </button>
        ))}
      </div>

      <div key={tab} className="flex justify-center gap-6 animate-fadeIn">
        <div className="w-72">
          <PolaroidCard name={tier5Pairs[tab].chief.name} role={tier5Pairs[tab].chief.role} />
        </div>
        <div className="w-72">
          <PolaroidCard name={tier5Pairs[tab].vice.name} role={tier5Pairs[tab].vice.role} />
        </div>
      </div>
    </div>
  );
}
