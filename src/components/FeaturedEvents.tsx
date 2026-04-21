import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventTile } from "@/components/EventTile";
import { Button } from "@/components/ui/button";

export function FeaturedEvents() {
  const { events } = useEvents();
  const featured = events
    .filter((e) => e.is_active && e.is_featured)
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured events</h2>
          <p className="mt-2 text-muted-foreground">Hand-picked experiences happening now.</p>
        </div>
        <Button asChild variant="ghost" className="hidden sm:inline-flex">
          <Link to="/events">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((e) => (
          <EventTile key={e.id} event={e} />
        ))}
      </div>
      <div className="mt-6 text-center sm:hidden">
        <Button asChild variant="outline">
          <Link to="/events">View all events</Link>
        </Button>
      </div>
    </section>
  );
}