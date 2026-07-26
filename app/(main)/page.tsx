"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import HomePanel from "@/components/HomePanel";
import EventsPanel from "@/components/EventsPanel";
import CoreOfficersPanel from "@/components/CoreOfficersPanel";
import OfficesPanel from "@/components/OfficesPanel";
import SBDPanel from "@/components/SBDPanel";
import AssociatesPanel from "@/components/AssociatesPanel";
import AboutPanel from "@/components/AboutPanel";
import ContactPanel from "@/components/ContactPanel";
import CampusGate from "@/components/CampusGate";
import { useCampus } from "@/context/CampusContext";

const GridTunnel = dynamic(() => import("@/components/GridTunnel"), { ssr: false });

const SCROLL_SPEED = 1.2;
const SNAP_DELAY = 150;
const ANIM_DURATION = 400;

export default function VerticalPage() {
  const [tunnelMode, setTunnelMode] = useState(false);
  const [offset, setOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const snapTimer = useRef<ReturnType<typeof setTimeout>>();
  const { campus } = useCampus();

  const getMaxScroll = useCallback(
    () => (panels.length - 1) * window.innerHeight,
    []
  );

  const updateOffset = useCallback((value: number) => {
    offsetRef.current = value;
    setOffset(value);
  }, []);

  const snapToNearest = useCallback(() => {
    const current = offsetRef.current;
    const nearest = Math.round(current / window.innerHeight) * window.innerHeight;
    const clamped = Math.max(0, Math.min(nearest, getMaxScroll()));
    setIsAnimating(true);
    updateOffset(clamped);
    setActiveIndex(Math.round(clamped / window.innerHeight));
    setTimeout(() => setIsAnimating(false), ANIM_DURATION);
  }, [getMaxScroll, updateOffset]);

  const touchStartY = useRef(0);
  const touchStartOffset = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (snapTimer.current) clearTimeout(snapTimer.current);
    setIsAnimating(false);
    touchStartY.current = e.touches[0].clientY;
    touchStartOffset.current = offsetRef.current;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaY = (touchStartY.current - e.touches[0].clientY) * SCROLL_SPEED;
    const max = getMaxScroll();
    updateOffset(Math.max(0, Math.min(touchStartOffset.current + deltaY, max)));
  }, [getMaxScroll, updateOffset]);

  const handleTouchEnd = useCallback(() => {
    snapTimer.current = setTimeout(snapToNearest, SNAP_DELAY);
  }, [snapToNearest]);

  const scrollToPanel = useCallback(
    (index: number) => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
      setIsAnimating(true);
      const target = index * window.innerHeight;
      updateOffset(target);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), ANIM_DURATION);
    },
    [updateOffset]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      if (!track.contains(e.target as Node)) return;
      e.preventDefault();

      if (snapTimer.current) clearTimeout(snapTimer.current);
      setIsAnimating(false);

      const max = getMaxScroll();
      const next = offsetRef.current + e.deltaY * SCROLL_SPEED;
      updateOffset(Math.max(0, Math.min(next, max)));

      snapTimer.current = setTimeout(snapToNearest, SNAP_DELAY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, [getMaxScroll, snapToNearest, updateOffset]);

  useEffect(() => {
    const handleResize = () => {
      const target = activeIndex * window.innerHeight;
      updateOffset(target);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, updateOffset]);

  const panels = [
    { id: "home", component: <HomePanel onNavigate={scrollToPanel} /> },
    { id: "events", component: <EventsPanel /> },
    { id: "core-officers", component: <CoreOfficersPanel /> },
    { id: "offices", component: <OfficesPanel /> },
    { id: "sbd", component: <SBDPanel /> },
    { id: "associates", component: <AssociatesPanel /> },
    { id: "about", component: <AboutPanel /> },
    { id: "contact", component: <ContactPanel /> },
  ];

  return (
    <>
      <GridTunnel />
      {campus === null && <CampusGate />}
      <div
        className={
          campus === null
            ? "invisible"
            : tunnelMode
              ? "opacity-0 pointer-events-none transition-opacity duration-300"
              : "transition-opacity duration-300"
        }
      >
        <Nav onNavigate={scrollToPanel} activeIndex={activeIndex} />
        <div className="w-screen h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translateY(-${offset}px)`,
              transition: isAnimating
                ? `transform ${ANIM_DURATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`
                : "transform 0.08s linear",
              touchAction: "none",
            }}
          >
            {panels.map((panel, i) => (
              <section
                key={panel.id}
                className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center"
              >
                <div className="relative z-10">{panel.component}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => setTunnelMode((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/60 border border-black/10 shadow-lg text-gray-700 text-lg font-mono hover:bg-white/80 transition-colors"
        title="Toggle tunnel view"
      >
        {tunnelMode ? "×" : "⊞"}
      </button>
    </>
  );
}
