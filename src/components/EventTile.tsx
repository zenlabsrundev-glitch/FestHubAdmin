import { Users } from "lucide-react";
import { getThemeGradient } from "@/lib/colorThemes";
import type { AppEvent } from "@/hooks/useEvents";
import { cn } from "@/lib/utils";

interface EventTileProps {
  event: AppEvent;
}

export function EventTile({ event }: EventTileProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
        getThemeGradient(event.color_theme),
      )}
    >
      <div className="absolute -right-6 -top-6 text-8xl opacity-20 transition-transform duration-500 group-hover:scale-110">
        {event.emoji}
      </div>
      <div className="relative z-10 flex h-full min-h-[220px] flex-col">
        <div className="text-5xl">{event.emoji}</div>
        <h3 className="mt-4 text-2xl font-bold leading-tight">{event.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/90">{event.description}</p>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" />
            {event.team_size}
          </span>
        </div>
      </div>
    </div>
  );
}