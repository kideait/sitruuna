import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Brain,
  Calendar,
  MapPin,
  PiggyBank,
} from "lucide-react";

type View = "dashboard" | "shifts" | "calendar" | "routes" | "savings";

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Yhteenveto", icon: LayoutDashboard },
  { id: "shifts", label: "Työvuorot", icon: Brain },
  { id: "calendar", label: "Kalenteri", icon: Calendar },
  { id: "routes", label: "Reitit", icon: MapPin },
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
    <div className="min-h-screen flex flex-col" style={{ background: "#0f1a0f" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ background: "rgba(22,32,22,0.92)", borderColor: "#2d4a2d" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍋</span>
            <span className="text-xl font-bold">
              <span style={{ color: "#94d60a" }}>Sitruuna</span>
              <span style={{ color: "#72c4d6" }}>AI</span>
            </span>
          </div>
          <span className="hidden sm:block text-xs px-2 py-1 rounded" style={{ color: "#72c4d6", background: "#72c4d615", border: "1px solid #72c4d630" }}>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  active
                    ? ""
                    : "hover:text-slate-200"
                }`}
                style={
                  active
                    ? { background: "#94d60a15", color: "#94d60a", border: "1px solid #94d60a30" }
                    : { color: "#94a898" }
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
      <footer className="py-4 text-center text-xs" style={{ background: "#162016", borderTop: "1px solid #2d4a2d", color: "#6b8a6b" }}>
        <div>
          <span style={{ color: "#72c4d6" }}>SitruunaAI</span> Demo &bull; Kidea IT Oy
        </div>
        <div className="mt-1" style={{ color: "#4a6a4a" }}>DEMO – ei tuotantokäytössä</div>
      </footer>
    </div>
  );
}
