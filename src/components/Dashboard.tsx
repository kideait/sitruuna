import {
  Users,
  ClipboardList,
  Timer,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { employees } from "../data/employees";
import { currentAppointments } from "../data/appointments";
import { areas } from "../data/areas";
import type { AISuggestion, Area } from "../types";

const areaColors: Record<Area, string> = {
  "Varkaus keskusta": "#facc15",
  "Varkaus etelä": "#4ade80",
  "Varkaus pohjoinen": "#38bdf8",
  Leppävirta: "#f97316",
  Joroinen: "#a78bfa",
  Kangaslampi: "#f472b6",
};

const visitsByArea = areas.map((area) => ({
  name: area.replace("Varkaus ", "V. "),
  fullName: area,
  visits: currentAppointments.filter((a) => a.area === area).length,
}));

const totalVisits = currentAppointments.length;
const totalTravel = currentAppointments.reduce(
  (s, a) => s + a.travelTimeMinutes,
  0
);
const avgOptimization = 87;

const suggestions: AISuggestion[] = [
  {
    icon: "route",
    text: "Aleksandra ja Anne N ovat lähialueilla – yhdistä reitit, säästö 15 min",
    type: "info",
  },
  {
    icon: "clock",
    text: "Katariinan Leppävirta-käynti kannattaa siirtää aamuun – vähemmän siirtymää",
    type: "warning",
  },
  {
    icon: "team",
    text: "Joroisen alueella 3 käyntiä – keskitä Irinalle ja Minnalle",
    type: "info",
  },
  {
    icon: "check",
    text: "Stora Enson vuoro optimoitu: Marja J ja Päivi samassa vuorossa",
    type: "success",
  },
];

function SuggestionIcon({ type }: { type: AISuggestion["type"] }) {
  if (type === "warning")
    return <AlertTriangle size={16} className="text-yellow-400" />;
  if (type === "success")
    return <CheckCircle2 size={16} className="text-green-400" />;
  return <Lightbulb size={16} className="text-blue-400" />;
}

export default function Dashboard() {
  const kpis = [
    {
      label: "Työntekijöitä",
      value: employees.length,
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Käyntejä tänään",
      value: totalVisits,
      icon: ClipboardList,
      color: "text-green-400",
    },
    {
      label: "Siirtymäaika yht.",
      value: `${totalTravel} min`,
      icon: Timer,
      color: "text-yellow-400",
    },
    {
      label: "Optimointiaste",
      value: `${avgOptimization}%`,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Päivän yhteenveto</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-700/50 p-4"
              style={{ background: "#16213e" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className={kpi.color} />
                <span className="text-xs text-slate-400">{kpi.label}</span>
              </div>
              <div className={`text-2xl font-bold ${kpi.color}`}>
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div
          className="rounded-xl border border-slate-700/50 p-4"
          style={{ background: "#16213e" }}
        >
          <h2 className="text-lg font-semibold mb-4">Käynnit alueittain</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visitsByArea} layout="vertical">
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis
                dataKey="name"
                type="category"
                width={80}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a2e",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  color: "#f1f5f9",
                }}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.fullName ?? ""
                }
              />
              <Bar dataKey="visits" radius={[0, 6, 6, 0]}>
                {visitsByArea.map((entry) => (
                  <Cell
                    key={entry.fullName}
                    fill={areaColors[entry.fullName as Area] ?? "#64748b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI suggestions */}
        <div
          className="rounded-xl border border-slate-700/50 p-4"
          style={{ background: "#16213e" }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain size={20} className="text-yellow-400" />
            AI-suositukset
          </h2>
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  s.type === "warning"
                    ? "border-yellow-500/20 bg-yellow-500/5"
                    : s.type === "success"
                    ? "border-green-500/20 bg-green-500/5"
                    : "border-blue-500/20 bg-blue-500/5"
                }`}
              >
                <SuggestionIcon type={s.type} />
                <span className="text-sm text-slate-300">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Brain(props: { size: number; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}
