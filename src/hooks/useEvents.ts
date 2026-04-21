import { useEffect, useState, useCallback } from "react";
import type { ColorTheme } from "@/lib/colorThemes";

export interface AppEvent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  team_size: string;
  color_theme: ColorTheme;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
}

const STORAGE_KEY = "app.events.v1";
const EVENT_NAME = "app.events.changed";

const SEED: AppEvent[] = [
  {
    id: "evt-1",
    name: "Trivia Night",
    emoji: "🎯",
    description: "Test your knowledge across pop culture, history, and science.",
    team_size: "2–6 players",
    color_theme: "purple",
    is_active: true,
    is_featured: true,
    sort_order: 1,
  },
  {
    id: "evt-2",
    name: "Art Jam",
    emoji: "🎨",
    description: "Collaborative painting and creative challenges, no skills required.",
    team_size: "4–8 players",
    color_theme: "pink",
    is_active: true,
    is_featured: true,
    sort_order: 2,
  },
  {
    id: "evt-3",
    name: "Field Day",
    emoji: "🏃",
    description: "Outdoor games, relay races, and team challenges in the sun.",
    team_size: "8–20 players",
    color_theme: "green",
    is_active: true,
    is_featured: true,
    sort_order: 3,
  },
  {
    id: "evt-4",
    name: "Pizza & Code",
    emoji: "🍕",
    description: "Casual hack night with great food and even better company.",
    team_size: "3–10 players",
    color_theme: "orange",
    is_active: true,
    is_featured: false,
    sort_order: 4,
  },
  {
    id: "evt-5",
    name: "Board Game Marathon",
    emoji: "🎲",
    description: "From classics to modern hits — bring your strategy.",
    team_size: "2–8 players",
    color_theme: "blue",
    is_active: true,
    is_featured: false,
    sort_order: 5,
  },
];

function read(): AppEvent[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as AppEvent[];
  } catch {
    return SEED;
  }
}

function write(events: AppEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function useEvents() {
  const [events, setEvents] = useState<AppEvent[]>(() => read());

  useEffect(() => {
    const sync = () => setEvents(read());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const createEvent = useCallback((data: Omit<AppEvent, "id" | "sort_order">) => {
    const current = read();
    const next: AppEvent = {
      ...data,
      id: `evt-${Date.now()}`,
      sort_order: current.length + 1,
    };
    write([...current, next]);
  }, []);

  const updateEvent = useCallback((id: string, patch: Partial<AppEvent>) => {
    const current = read();
    write(current.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    const current = read();
    write(current.filter((e) => e.id !== id));
  }, []);

  const toggleActive = useCallback((id: string) => {
    const current = read();
    write(current.map((e) => (e.id === id ? { ...e, is_active: !e.is_active } : e)));
  }, []);

  return { events, createEvent, updateEvent, deleteEvent, toggleActive };
}