import { useState } from "react";
import { Calculator, TrendingUp, Clock, Euro } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, unit, onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span style={{ color: "#64748b" }}>{label}</span>
        <span className="font-semibold" style={{ color: "#6ba200" }}>
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ background: "#e2e8d5", accentColor: "#94d60a" }}
      />
      <div className="flex justify-between text-xs" style={{ color: "#94a3b8" }}>
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

export default function Savings() {
  const [workers, setWorkers] = useState(14);
  const [minPerDay, setMinPerDay] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [workDays, setWorkDays] = useState(220);

  const savedHoursPerYear = (workers * minPerDay * workDays) / 60;
  const eurosPerYear = savedHoursPerYear * hourlyRate;
  const eurosPerMonth = eurosPerYear / 12;

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    name: [
      "Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä",
      "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu",
    ][i],
    savings: Math.round(eurosPerMonth * (0.85 + Math.random() * 0.3)),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Säästölaskuri</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="rounded-xl p-6 space-y-6" style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calculator size={20} style={{ color: "#6ba200" }} />
            Parametrit
          </h2>
          <Slider label="Työntekijöitä" value={workers} min={1} max={50} unit="hlö" onChange={setWorkers} />
          <Slider label="Säästö minuutteina / päivä / hlö" value={minPerDay} min={5} max={60} unit="min" onChange={setMinPerDay} />
          <Slider label="Tuntihinta" value={hourlyRate} min={20} max={80} unit="€" onChange={setHourlyRate} />
          <Slider label="Työpäiviä / vuosi" value={workDays} min={100} max={260} unit="pv" onChange={setWorkDays} />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl p-4 text-center" style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}>
              <Clock size={24} className="mx-auto mb-2" style={{ color: "#72c4d6" }} />
              <div className="text-xs mb-1" style={{ color: "#64748b" }}>Säästetyt tunnit / vuosi</div>
              <div className="text-2xl font-bold" style={{ color: "#72c4d6" }}>{Math.round(savedHoursPerYear)}h</div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: "#ffffff", border: "1px solid #94d60a30" }}>
              <Euro size={24} className="mx-auto mb-2" style={{ color: "#6ba200" }} />
              <div className="text-xs mb-1" style={{ color: "#64748b" }}>Euroa / vuosi</div>
              <div className="text-2xl font-bold" style={{ color: "#6ba200" }}>
                {Math.round(eurosPerYear).toLocaleString("fi-FI")} €
              </div>
            </div>
            <div className="rounded-xl p-4 text-center" style={{ background: "#ffffff", border: "1px solid #87c80030" }}>
              <TrendingUp size={24} className="mx-auto mb-2" style={{ color: "#87c800" }} />
              <div className="text-xs mb-1" style={{ color: "#64748b" }}>Euroa / kuukausi</div>
              <div className="text-2xl font-bold" style={{ color: "#87c800" }}>
                {Math.round(eurosPerMonth).toLocaleString("fi-FI")} €
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#334155" }}>Arvioitu kuukausisäästö</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8d5" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} tickFormatter={(v) => `${v}€`} />
                <Tooltip
                  contentStyle={{ background: "#ffffff", border: "1px solid #e2e8d5", borderRadius: 8, color: "#1e293b" }}
                  formatter={(value) => [`${Number(value).toLocaleString("fi-FI")} €`, "Säästö"]}
                />
                <Bar dataKey="savings" fill="#94d60a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Formula */}
          <div className="rounded-xl p-4 text-sm" style={{ background: "#f8faf5", border: "1px solid #e2e8d5" }}>
            <h3 className="font-semibold mb-2" style={{ color: "#334155" }}>Laskentakaava</h3>
            <div className="space-y-1 font-mono text-xs" style={{ color: "#64748b" }}>
              <div>
                Tunnit/vuosi = {workers} hlö × {minPerDay} min × {workDays} pv / 60 ={" "}
                <span className="font-semibold" style={{ color: "#72c4d6" }}>{Math.round(savedHoursPerYear)}h</span>
              </div>
              <div>
                €/vuosi = {Math.round(savedHoursPerYear)}h × {hourlyRate}€ ={" "}
                <span className="font-semibold" style={{ color: "#6ba200" }}>
                  {Math.round(eurosPerYear).toLocaleString("fi-FI")} €
                </span>
              </div>
              <div>
                €/kuukausi = {Math.round(eurosPerYear).toLocaleString("fi-FI")} € / 12 ={" "}
                <span className="font-semibold" style={{ color: "#87c800" }}>
                  {Math.round(eurosPerMonth).toLocaleString("fi-FI")} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
