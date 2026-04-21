import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { EventTile } from "@/components/EventTile";
import { Button } from "@/components/ui/button";

const Events = () => {
  const { events } = useEvents();
  const visible = events
    .filter((e) => e.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold">
            ← Home
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">All events</h1>
        <p className="mt-3 text-muted-foreground">
          Browse every active event. Pick one and get involved.
        </p>

        {visible.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed py-20 text-center">
            <p className="text-muted-foreground">No active events yet.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((e) => (
              <EventTile key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Events;