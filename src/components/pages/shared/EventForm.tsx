import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COLOR_THEMES, type ColorTheme } from "@/lib/colorThemes";
import type { AppEvent } from "@/hooks/useEvents";
import { cn } from "@/lib/utils";

export interface EventFormValues {
  name: string;
  emoji: string;
  description: string;
  team_size: string;
  color_theme: ColorTheme;
  is_active: boolean;
  is_featured: boolean;
}

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: AppEvent | null;
  onSubmit: (values: EventFormValues) => void;
}

const EMPTY: EventFormValues = {
  name: "",
  emoji: "🎉",
  description: "",
  team_size: "",
  color_theme: "blue",
  is_active: true,
  is_featured: false,
};

export function EventForm({ open, onOpenChange, initial, onSubmit }: EventFormProps) {
  const [values, setValues] = useState<EventFormValues>(EMPTY);

  useEffect(() => {
    if (open) {
      setValues(
        initial
          ? {
              name: initial.name,
              emoji: initial.emoji,
              description: initial.description,
              team_size: initial.team_size,
              color_theme: initial.color_theme,
              is_active: initial.is_active,
              is_featured: initial.is_featured,
            }
          : EMPTY,
      );
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim()) return;
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit event" : "Add event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <div className="space-y-2">
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={values.emoji}
                onChange={(e) => setValues((v) => ({ ...v, emoji: e.target.value }))}
                maxLength={4}
                className="text-center text-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_size">Team size</Label>
            <Input
              id="team_size"
              placeholder="e.g. 2–6 players"
              value={values.team_size}
              onChange={(e) => setValues((v) => ({ ...v, team_size: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Color theme</Label>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_THEMES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setValues((v) => ({ ...v, color_theme: t.value }))}
                  className={cn(
                    "h-12 rounded-lg bg-gradient-to-br text-xs font-medium text-white shadow-sm transition-all",
                    t.gradient,
                    values.color_theme === t.value
                      ? "scale-105 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "hover:scale-105",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border p-3">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={values.is_active}
                onCheckedChange={(c) => setValues((v) => ({ ...v, is_active: !!c }))}
              />
              Active (visible on public site)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={values.is_featured}
                onCheckedChange={(c) => setValues((v) => ({ ...v, is_featured: !!c }))}
              />
              Featured on homepage
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{initial ? "Save changes" : "Create event"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}