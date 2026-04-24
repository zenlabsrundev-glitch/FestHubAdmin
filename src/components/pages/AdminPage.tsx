import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type AppEvent } from "@/hooks/useEvents";
import { EventForm, type EventFormValues } from "@/components/pages/shared/EventForm";
import { COLOR_THEMES } from "@/lib/colorThemes";
import { cn } from "@/lib/utils";

export function AdminPage() {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AppEvent | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AppEvent | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/registration");
      if (res.data && res.data.success) {
        setEvents(res.data.data);
      } else if (Array.isArray(res.data)) {
        setEvents(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch events");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const sorted = [...events].sort((a, b) => a.sort_order - b.sort_order);

  const handleSubmit = async (values: EventFormValues) => {
    try {
      if (editing) {
        const res = await api.put(`/registration/${editing.id}`, values);
        if (res.data && res.data.success) {
          toast.success(`Updated "${values.name}"`);
          setFormOpen(false);
          setEditing(null);
          fetchEvents();
        } else {
          toast.error(res.data?.message || "Failed to update event");
        }
      } else {
        const res = await api.post("/registration", values);
        if (res.data && res.data.success) {
          toast.success(`Created "${values.name}"`);
          setFormOpen(false);
          setEditing(null);
          fetchEvents();
        } else {
          toast.error(res.data?.message || "Failed to create event");
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to save event";
      toast.error(errorMessage);
      console.error("Save error:", error);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (e: AppEvent) => {
    setEditing(e);
    setFormOpen(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
              Dashboard
            </p>
            <Badge variant="secondary" className="text-xs">Admin</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manage Events
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Create, edit, and toggle events. Changes appear instantly on the public site.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-lg shadow-blue-500/25"
        >
          <Plus className="h-4 w-4" /> Add event
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="w-[60px] text-neutral-400">Emoji</TableHead>
              <TableHead className="text-neutral-400">Name</TableHead>
              <TableHead className="hidden md:table-cell text-neutral-400">Team size</TableHead>
              <TableHead className="hidden sm:table-cell text-neutral-400">Theme</TableHead>
              <TableHead className="hidden md:table-cell text-neutral-400">Featured</TableHead>
              <TableHead className="text-neutral-400">Active</TableHead>
              <TableHead className="w-[120px] text-right text-neutral-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-neutral-500">
                  No events yet. Click "Add event" to create your first one.
                </TableCell>
              </TableRow>
            )}
            {sorted.map((e) => {
              const theme = COLOR_THEMES.find((t) => t.value === e.color_theme);
              return (
                <TableRow
                  key={e.id}
                  className={cn(
                    "border-white/10 hover:bg-white/5 transition-colors",
                    !e.is_active && "opacity-50"
                  )}
                >
                  <TableCell className="text-2xl">{e.emoji}</TableCell>
                  <TableCell>
                    <div className="font-medium text-white">{e.name}</div>
                    <div className="line-clamp-1 text-xs text-neutral-400">
                      {e.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-neutral-400">
                    {e.team_size}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block h-5 w-5 rounded-full bg-gradient-to-br",
                          theme?.gradient
                        )}
                      />
                      <span className="text-xs capitalize text-neutral-400">
                        {e.color_theme}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {e.is_featured ? (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Featured</Badge>
                    ) : (
                      <span className="text-neutral-500 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={e.is_active}
                      onCheckedChange={async () => {
                        try {
                          await api.patch(`/registration/${e.id}/toggle`);
                          toast(`"${e.name}" is now ${!e.is_active ? "active" : "inactive"}`);
                          fetchEvents();
                        } catch (error) {
                          toast.error("Failed to toggle event active status");
                          console.error(error);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-neutral-400 hover:text-white hover:bg-white/10"
                        onClick={() => openEdit(e)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setConfirmDelete(e)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <EventForm
        open={formOpen}
        onOpenChange={(o) => {
          setFormOpen(o);
          if (!o) setEditing(null);
        }}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent className="bg-[#13161f] border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{confirmDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              This permanently removes the event. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500 text-white border-0"
              onClick={async () => {
                if (confirmDelete) {
                  try {
                    await api.delete(`/registration/${confirmDelete.id}`);
                    toast.success(`Deleted "${confirmDelete.name}"`);
                    fetchEvents();
                  } catch (error) {
                    toast.error("Failed to delete event");
                    console.error(error);
                  }
                  setConfirmDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
