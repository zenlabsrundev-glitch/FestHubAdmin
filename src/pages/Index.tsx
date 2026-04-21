import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FeaturedEvents } from "@/components/FeaturedEvents";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold tracking-tight">
            ✨ Eventful
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/events">Events</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Bring your team together
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Discover memorable events, plan effortlessly, and make every gathering count.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/events">Browse events</Link>
          </Button>
        </div>
      </section>

      <FeaturedEvents />
    </main>
  );
};

export default Index;
