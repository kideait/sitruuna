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
    <div className="min-h-screen flex flex-col" style={{ background: "#0f0f1e" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-md" style={{ background: "rgba(26,26,46,0.9)" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍋</span>
            <span className="text-xl font-bold">
              <span className="text-yellow-400">Sitruuna</span>
              <span className="text-slate-300">AI</span>
            </span>
          </div>
          <span className="hidden sm:block text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
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
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
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
      <footer className="border-t border-slate-700/50 py-4 text-center text-xs text-slate-500" style={{ background: "#1a1a2e" }}>
        <div>
          <span className="text-yellow-400/60">SitruunaAI</span> Demo &bull; Kidea IT Oy
        </div>
        <div className="mt-1 text-slate-600">DEMO – ei tuotantokäytössä</div>
      </footer>
    </div>
  );
}
