import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Brain,
  Calendar,
  MapPin,
  PiggyBank,
  Users,
} from "lucide-react";

type View = "dashboard" | "shifts" | "calendar" | "routes" | "clients" | "savings";

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Yhteenveto", icon: LayoutDashboard },
  { id: "shifts", label: "Työvuorot", icon: Brain },
  { id: "calendar", label: "Kalenteri", icon: Calendar },
  { id: "routes", label: "Reitit", icon: MapPin },
  { id: "clients", label: "Asiakkaat", icon: Users },
  { id: "savings", label: "Säästöt", icon: PiggyBank },
];

export default function Layout({
  currentView,
  onNavigate,
  children,
}: {
  currentView: View;
  onNavigate: (view: View) => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid #e2e8d5" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍋</span>
            <span className="text-xl font-bold">
              <span style={{ color: "#6ba200" }}>Sitruuna</span>
              <span style={{ color: "#1e293b" }}>AI</span>
            </span>
          </div>
          <span className="hidden sm:block text-xs px-2 py-1 rounded font-medium" style={{ color: "#6ba200", background: "#94d60a12", border: "1px solid #94d60a30" }}>
            DEMO
          </span>
        </div>
        {/* Navigation */}
        <nav className="max-w-[1400px] mx-auto px-4 pb-2 flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
                style={
                  active
                    ? { background: "#94d60a", color: "#fff" }
                    : { color: "#64748b" }
                }
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs" style={{ background: "#f8faf5", borderTop: "1px solid #e2e8d5", color: "#94a3b8" }}>
        <div>
          <span style={{ color: "#6ba200" }}>SitruunaAI</span> Demo &bull; Kidea IT Oy
        </div>
        <div className="mt-1" style={{ color: "#cbd5e1" }}>DEMO – ei tuotantokäytössä</div>
      </footer>
    </div>
  );
}
