import { Calendar, Users, Zap, Shield } from "lucide-react";

const stats = [
  { icon: Calendar, label: "Events Hosted", value: "200+" },
  { icon: Users, label: "Happy Teams", value: "50k+" },
  { icon: Zap, label: "Avg. Rating", value: "4.9★" },
  { icon: Shield, label: "Uptime", value: "99.9%" },
];

export function StatsSection() {
  return (
    <section className="bg-[#13161f] border-y border-white/10 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-sm text-neutral-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
