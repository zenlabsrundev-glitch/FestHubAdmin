import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-[#0f1117] px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-cyan-900/20 p-12 shadow-2xl shadow-blue-500/10">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to plan your next event?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-400">
            Browse our curated list of experiences or create your own from the admin panel.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-lg shadow-blue-500/25 px-8"
            >
              <Link to="/events">
                Explore Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
