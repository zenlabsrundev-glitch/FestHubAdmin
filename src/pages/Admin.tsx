import { useState } from "react";
import { Link } from "react-router-dom";
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
import { useEvents, type AppEvent } from "@/hooks/useEvents";
import { EventForm, type EventFormValues } from "@/components/EventForm";
import { COLOR_THEMES } from "@/lib/colorThemes";
import { cn } from "@/lib/utils";

const Admin = () => {
  const { events, createEvent, updateEvent, deleteEvent, toggleActive } = useEvents();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AppEvent | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AppEvent | null>(null);

  const sorted = [...events].sort((a, b) => a.sort_order - b.sort_order);

  const handleSubmit = (values: EventFormValues) => {
    if (editing) {
      updateEvent(editing.id, values);
      toast.success(`Updated "${values.name}"`);
    } else {
      createEvent(values);
      toast.success(`Created "${values.name}"`);
    }
    setFormOpen(false);
    setEditing(null);
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
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold">
              ← Home
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/events">View public</Link>
          </Button>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create, edit, and toggle events. Changes appear instantly on the public site.
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Add event
          </Button>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Emoji</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Team size</TableHead>
                <TableHead className="hidden sm:table-cell">Theme</TableHead>
                <TableHead className="hidden md:table-cell">Featured</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                    No events yet. Click "Add event" to create your first one.
                  </TableCell>
                </TableRow>
              )}
              {sorted.map((e) => {
                const theme = COLOR_THEMES.find((t) => t.value === e.color_theme);
                return (
                  <TableRow key={e.id} className={cn(!e.is_active && "opacity-60")}>
                    <TableCell className="text-2xl">{e.emoji}</TableCell>
                    <TableCell>
                      <div className="font-medium">{e.name}</div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">
                        {e.description}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {e.team_size}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-block h-5 w-5 rounded-full bg-gradient-to-br",
                            theme?.gradient,
                          )}
                        />
                        <span className="text-xs capitalize text-muted-foreground">
                          {e.color_theme}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {e.is_featured ? <Badge>Featured</Badge> : <span className="text-muted-foreground text-xs">—</span>}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={e.is_active}
                        onCheckedChange={() => {
                          toggleActive(e.id);
                          toast(`"${e.name}" is now ${e.is_active ? "inactive" : "active"}`);
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(e)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setConfirmDelete(e)}
                          className="text-destructive hover:text-destructive"
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
      </section>

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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{confirmDelete?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the event. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (confirmDelete) {
                  deleteEvent(confirmDelete.id);
                  toast.success(`Deleted "${confirmDelete.name}"`);
                  setConfirmDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Admin;