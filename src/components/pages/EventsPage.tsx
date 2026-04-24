import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export interface Registration {
  id: string;
  teamName: string;
  eventId: string;
  eventName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderCollege: string;
  teamMembers: { name: string; email: string }[];
  status: string;
  createdAt: string;
}

export function EventsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await api.get("/registrations");
        if (res.data && res.data.success) {
          setRegistrations(res.data.data);
        } else if (Array.isArray(res.data)) {
          setRegistrations(res.data);
        }
      } catch (error) {
        toast.error("Failed to fetch registrations");
        console.error(error);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      {/* Page header */}
      <div className="mb-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
          Registrations
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          All Registrations
        </h1>
        <p className="mt-3 text-neutral-400">
          Browse all registered teams and their members.
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-white/20 py-20 text-center">
          <p className="text-neutral-500">No registrations yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {registrations.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-lg">{r.teamName}</h3>
                  <p className="text-sm text-fuchsia-400 font-medium">{r.eventName}</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {r.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-neutral-500">Leader:</span>{" "}
                  <span className="text-neutral-200">{r.leaderName}</span>
                </p>
                <p>
                  <span className="text-neutral-500">College:</span>{" "}
                  <span className="text-neutral-200">{r.leaderCollege}</span>
                </p>
                <p>
                  <span className="text-neutral-500">Contact:</span>{" "}
                  <span className="text-neutral-200">{r.leaderPhone}</span>
                </p>
              </div>

              {r.teamMembers && r.teamMembers.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    Team Members ({r.teamMembers.length})
                  </p>
                  <ul className="space-y-2 text-sm">
                    {r.teamMembers.map((m, i) => (
                      <li key={i} className="flex flex-col">
                        <span className="text-neutral-200">• {m.name}</span>
                        <span className="text-neutral-500 ml-3 text-xs">{m.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-4 text-xs text-neutral-600 block">
                Registered: {new Date(r.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
