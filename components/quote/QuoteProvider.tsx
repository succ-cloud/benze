"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getVehicle } from "@/data/vehicles";

type QuoteContextValue = {
  slugs: string[];
  ready: boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);
const STORAGE_KEY = "benze-quote";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((item): item is string => typeof item === "string" && Boolean(getVehicle(item))));
        }
      }
    } catch {
      /* ignore a broken local save */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [ready, slugs]);

  const add = useCallback((slug: string) => {
    if (!getVehicle(slug)) return;
    setSlugs((current) => (current.includes(slug) ? current : [...current, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((current) => current.filter((item) => item !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);
  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const value = useMemo(
    () => ({ slugs, ready, add, remove, clear, has }),
    [slugs, ready, add, remove, clear, has],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
}
