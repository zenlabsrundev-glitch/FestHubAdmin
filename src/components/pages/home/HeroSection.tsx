import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f1117] pt-32 pb-24 px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
          <Sparkles className="h-3.5 w-3.5" />
          Bringing teams together since 2024
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl leading-[1.1]">
          Bring your team{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            together
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed">
          Discover memorable events, plan effortlessly, and make every gathering
          count. One platform for every experience.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-lg shadow-blue-500/25 px-8"
          >
            <Link to="/events">
              Browse Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8"
          >
            <Link to="/admin">Admin Panel</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
