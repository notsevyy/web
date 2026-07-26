"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type CampusContextType = {
  campus: string | null;
  selectCampus: (campus: string) => void;
  clearCampus: () => void;
};

const CampusContext = createContext<CampusContextType>({
  campus: null,
  selectCampus: () => {},
  clearCampus: () => {},
});

export function CampusProvider({ children }: { children: ReactNode }) {
  const [campus, setCampus] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("campus");
    if (stored) setCampus(stored);
    setHydrated(true);
  }, []);

  const selectCampus = (value: string) => {
    localStorage.setItem("campus", value);
    setCampus(value);
  };

  const clearCampus = () => {
    localStorage.removeItem("campus");
    setCampus(null);
  };

  if (!hydrated) return null;

  return (
    <CampusContext.Provider value={{ campus, selectCampus, clearCampus }}>
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  return useContext(CampusContext);
}
