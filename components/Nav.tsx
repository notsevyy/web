"use client";

import { useState, useRef, useEffect } from "react";
import { useCampus } from "@/context/CampusContext";

type NavProps = {
  onNavigate: (index: number) => void;
  activeIndex: number;
};

type NavLink = {
  label: string;
  index: number;
};

const links: NavLink[] = [
  { label: "Home", index: 0 },
  { label: "Events", index: 1 },
  { label: "About", index: 6 },
  { label: "Contact Us", index: 7 },
];

const orangePill = [
  "bg-gradient-to-b from-orange-300 to-accent",
  "text-white",
  "border border-white/50",
  "shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
];

const glassBg =
  "bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.2)]";

function NavButton({
  label,
  isActive,
  onClick,
  size = "lg",
  className = "",
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  size?: "lg" | "md" | "sm";
  className?: string;
}) {
  const sizes = {
    lg: "px-6 py-3 text-lg md:px-12 md:py-5 md:text-2xl",
    md: "px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-lg",
    sm: "px-2 py-2 text-xs",
  };
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-mono tracking-wide font-medium transition-all whitespace-nowrap
        ${sizes[size]} ${className}
        ${isActive
          ? orangePill.join(" ")
          : `text-white/60 ${orangePill.map((c) => `hover:${c}`).join(" ")}`
        }`}
    >
      <span
        className={`pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent
          ${isActive ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
      />
      <span className="relative">{label}</span>
    </button>
  );
}

function MembersDropdownContent({
  onNavigate,
  close,
}: {
  onNavigate: (index: number) => void;
  close: () => void;
}) {
  return (
    <>
      <button
        onClick={() => { onNavigate(2); close(); }}
        className="relative overflow-hidden w-full px-6 py-3 rounded-full
          text-sm font-mono tracking-wide font-medium text-white
          bg-gradient-to-b from-yellow-300 to-yellow-500
          border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          hover:brightness-105 transition-all"
      >
        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent" />
        <span className="relative">Core Officers</span>
      </button>
      <button
        onClick={() => { onNavigate(3); close(); }}
        className="relative overflow-hidden w-full px-6 py-3 rounded-full
          text-sm font-mono tracking-wide font-medium text-white
          bg-gradient-to-b from-teal-300 to-teal-500
          border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          hover:brightness-105 transition-all"
      >
        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent" />
        <span className="relative">Offices</span>
      </button>
      <button
        onClick={() => { onNavigate(4); close(); }}
        className="relative overflow-hidden w-full px-6 py-3 rounded-full
          text-sm font-mono tracking-wide font-medium text-white
          bg-gradient-to-b from-purple-400 to-purple-600
          border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          hover:brightness-105 transition-all"
      >
        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent" />
        <span className="relative">Skill Builder Department</span>
      </button>
      <button
        onClick={() => { onNavigate(5); close(); }}
        className="relative overflow-hidden w-full px-6 py-3 rounded-full
          text-sm font-mono tracking-wide font-medium text-white
          bg-gradient-to-b from-blue-400 to-blue-600
          border border-white/50 shadow-[0_2px_8px_rgba(0,0,0,0.25)]
          hover:brightness-105 transition-all"
      >
        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/60 to-transparent" />
        <span className="relative">Skill Builder Associates</span>
      </button>
    </>
  );
}

const dropdownWrapper =
  "backdrop-blur-md bg-black/30 border border-white/10 rounded-xl overflow-hidden shadow-lg min-w-[200px] p-3 flex flex-col gap-2 z-50";

export default function Nav({ onNavigate, activeIndex }: NavProps) {
  const { clearCampus } = useCampus();
  const [membersOpen, setMembersOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isHome = activeIndex === 0;
  const isMembersActive = activeIndex >= 2 && activeIndex <= 5;

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setMembersOpen(false);
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const refs = [topRef, sideRef, bottomRef];
      const inside = refs.some(
        (r) => r.current && r.current.contains(e.target as Node)
      );
      if (!inside) setMembersOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const close = () => setMembersOpen(false);

  return (
    <>
      {/* Top pill — Home screen (all viewports) */}
      <nav
        className={`fixed top-4 md:top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 md:gap-2 rounded-full px-3 md:px-8 py-2 md:py-5 ${glassBg}
          transition-all duration-300
          ${isHome ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <NavButton
          label="Home"
          isActive={activeIndex === 0}
          onClick={() => onNavigate(0)}
          size="md"
        />
        <NavButton
          label="Events"
          isActive={activeIndex === 1}
          onClick={() => onNavigate(1)}
          size="md"
        />

        <div ref={topRef} className="relative">
          <NavButton
            label="Members"
            isActive={isMembersActive}
            onClick={() => setMembersOpen((v) => !v)}
            size="md"
          />
          {membersOpen && (
            <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 ${dropdownWrapper}`}>
              <MembersDropdownContent onNavigate={onNavigate} close={close} />
            </div>
          )}
        </div>

        <NavButton
          label="About"
          isActive={activeIndex === 6}
          onClick={() => onNavigate(6)}
          size="md"
        />
        <NavButton
          label="Contact Us"
          isActive={activeIndex === 7}
          onClick={() => onNavigate(7)}
          size="md"
        />

        <button
          onClick={clearCampus}
          className="ml-1 md:ml-3 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full
            text-sm md:text-base text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Switch campus"
        >
          ↺
        </button>
      </nav>

      {/* Sidebar — Desktop, non-Home */}
      <nav
        className={`fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-stretch gap-1 lg:gap-2 rounded-2xl p-2 lg:p-4 ${glassBg}
          transition-all duration-300
          ${isHome || !isDesktop ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
      >
        <NavButton
          label="Home"
          isActive={activeIndex === 0}
          onClick={() => onNavigate(0)}
          size="md"
          className="w-full"
        />
        <NavButton
          label="Events"
          isActive={activeIndex === 1}
          onClick={() => onNavigate(1)}
          size="md"
          className="w-full"
        />

        <div ref={sideRef} className="relative w-full">
          <NavButton
            label="Members"
            isActive={isMembersActive}
            onClick={() => setMembersOpen((v) => !v)}
            size="md"
            className="w-full"
          />
          {membersOpen && (
            <div className={`absolute right-full mr-3 top-0 ${dropdownWrapper}`}>
              <MembersDropdownContent onNavigate={onNavigate} close={close} />
            </div>
          )}
        </div>

        <NavButton
          label="About"
          isActive={activeIndex === 6}
          onClick={() => onNavigate(6)}
          size="md"
          className="w-full"
        />
        <NavButton
          label="Contact Us"
          isActive={activeIndex === 7}
          onClick={() => onNavigate(7)}
          size="md"
          className="w-full"
        />

        <button
          onClick={clearCampus}
          className="mt-1 w-full py-3 lg:py-3 flex items-center justify-center rounded-full
            text-base lg:text-base text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Switch campus"
        >
          ↺
        </button>
      </nav>

      {/* Bottom nav — Mobile, non-Home */}
      <nav
        className={`fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around gap-1 rounded-2xl px-2 py-2 ${glassBg}
          transition-all duration-300
          ${isHome || isDesktop ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
      >
        <NavButton
          label="Home"
          isActive={activeIndex === 0}
          onClick={() => onNavigate(0)}
          size="sm"
        />

        <NavButton
          label="Events"
          isActive={activeIndex === 1}
          onClick={() => onNavigate(1)}
          size="sm"
        />

        <div ref={bottomRef} className="relative">
          <NavButton
            label="Members"
            isActive={isMembersActive}
            onClick={() => setMembersOpen((v) => !v)}
            size="sm"
          />
          {membersOpen && (
            <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 ${dropdownWrapper}`}>
              <MembersDropdownContent onNavigate={onNavigate} close={close} />
            </div>
          )}
        </div>

        <NavButton
          label="About"
          isActive={activeIndex === 6}
          onClick={() => onNavigate(6)}
          size="sm"
        />

        <NavButton
          label="Contact"
          isActive={activeIndex === 7}
          onClick={() => onNavigate(7)}
          size="sm"
        />

        <button
          onClick={clearCampus}
          className="w-9 h-9 flex items-center justify-center rounded-full
            text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Switch campus"
        >
          ↺
        </button>
      </nav>
    </>
  );
}
