"use client";

import PolaroidCard from "./PolaroidCard";

const captainCeo = [
  { name: "James Ryan Amba", role: "Captain" },
  { name: "Alaine Cariño", role: "Chief Executive Officer" },
];

const leadOfficers = [
  { name: "Joshua Parnaso", role: "LORSO Representative" },
  { name: "Majha Valencia", role: "BuildHers+ Ambassadors" },
  { name: "Paul Edwin Iglesia", role: "Executive Secretary" },
  { name: "Mico Aldred Makilan", role: "Executive Assistant" },
];

const glassHeader = "backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl px-8 py-3 shadow-lg";

export default function CoreOfficersPanel() {
  return (
    <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto">
      <div className={`${glassHeader} border-b-2 border-b-yellow-400`}>
        <h2 className="text-2xl font-mono tracking-wide text-gray-900 text-center">Core Officers</h2>
      </div>

      <div className="flex justify-center gap-6">
        {captainCeo.map((m) => (
          <div key={m.name} className="w-72">
            <PolaroidCard name={m.name} role={m.role} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {leadOfficers.map((m) => (
          <div key={m.name} className="w-52 md:w-64">
            <PolaroidCard name={m.name} role={m.role} />
          </div>
        ))}
      </div>
    </div>
  );
}
