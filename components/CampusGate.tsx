"use client";

import { useCampus } from "@/context/CampusContext";

export default function CampusGate() {
  const { campus, selectCampus } = useCampus();

  if (campus !== null) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2 mb-12">
        <h1 className="font-serif text-9xl text-gray-900 tracking-wide">AWSSBG</h1>
        <h2 className="font-serif text-7xl text-gray-800">T.I.P</h2>
        <p className="font-serif text-2xl italic text-gray-600 mt-6">Choose your campus</p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <button
          onClick={() => selectCampus("manila")}
          className="relative overflow-hidden w-96 px-16 py-5 rounded-full
            text-xl font-mono tracking-wide font-medium text-white
            bg-gradient-to-b from-orange-300 to-accent
            border border-white/50
            shadow-[0_2px_8px_rgba(0,0,0,0.25)]
            hover:brightness-105 transition-all"
        >
          <span
            className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2
              rounded-full bg-gradient-to-b from-white/60 to-transparent"
          />
          <span className="relative">Manila</span>
        </button>
        <button
          onClick={() => selectCampus("quezon-city")}
          className="relative overflow-hidden w-96 px-16 py-5 rounded-full
            text-xl font-mono tracking-wide font-medium text-white
            bg-gradient-to-b from-orange-300 to-accent
            border border-white/50
            shadow-[0_2px_8px_rgba(0,0,0,0.25)]
            hover:brightness-105 transition-all"
        >
          <span
            className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2
              rounded-full bg-gradient-to-b from-white/60 to-transparent"
          />
          <span className="relative">Quezon City</span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <hr className="border-gray-300" />
        <div className="bg-gray-900 py-8 flex items-center justify-center gap-20">
          <img
            src="/images/tip-logo.png"
            alt="TIP Institute"
            className="h-12 w-auto"
          />
          {/* public/images/tip-logo.png — TIP institute logo */}

          <img
            src="/images/club-logo.png"
            alt="AWSSBG Club Mascot"
            className="h-12 w-auto"
          />
          {/* public/images/club-logo.png — round mascot medallion */}

          <img
            src="/images/aws-logo.png"
            alt="AWS Logo"
            className="h-12 w-auto"
          />
          {/* public/images/aws-logo.png — AWS logo */}
        </div>
      </div>
    </div>
  );
}
