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
        <span className="text-slate-400">{label}</span>
        <span className="font-semibold text-yellow-400">
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
        className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-yellow-400"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
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
      "Tammi",
      "Helmi",
      "Maalis",
      "Huhti",
      "Touko",
      "Kesä",
      "Heinä",
      "Elo",
      "Syys",
      "Loka",
      "Marras",
      "Joulu",
    ][i],
    savings: Math.round(eurosPerMonth * (0.85 + Math.random() * 0.3)),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Säästölaskuri</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div
          className="rounded-xl border border-slate-700/50 p-6 space-y-6"
          style={{ background: "#16213e" }}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calculator size={20} className="text-yellow-400" />
            Parametrit
          </h2>
          <Slider
            label="Työntekijöitä"
            value={workers}
            min={1}
            max={50}
            unit="hlö"
            onChange={setWorkers}
          />
          <Slider
            label="Säästö minuutteina / päivä / hlö"
            value={minPerDay}
            min={5}
            max={60}
            unit="min"
            onChange={setMinPerDay}
          />
          <Slider
            label="Tuntihinta"
            value={hourlyRate}
            min={20}
            max={80}
            unit="€"
            onChange={setHourlyRate}
          />
          <Slider
            label="Työpäiviä / vuosi"
            value={workDays}
            min={100}
            max={260}
            unit="pv"
            onChange={setWorkDays}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className="rounded-xl border border-slate-700/50 p-4 text-center"
              style={{ background: "#16213e" }}
            >
              <Clock size={24} className="mx-auto mb-2 text-blue-400" />
              <div className="text-xs text-slate-400 mb-1">
                Säästetyt tunnit / vuosi
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(savedHoursPerYear)}h
              </div>
            </div>
            <div
              className="rounded-xl border border-yellow-400/30 p-4 text-center"
              style={{ background: "#16213e" }}
            >
              <Euro size={24} className="mx-auto mb-2 text-yellow-400" />
              <div className="text-xs text-slate-400 mb-1">
                Euroa / vuosi
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(eurosPerYear).toLocaleString("fi-FI")} €
              </div>
            </div>
            <div
              className="rounded-xl border border-green-400/30 p-4 text-center"
              style={{ background: "#16213e" }}
            >
              <TrendingUp size={24} className="mx-auto mb-2 text-green-400" />
              <div className="text-xs text-slate-400 mb-1">
                Euroa / kuukausi
              </div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round(eurosPerMonth).toLocaleString("fi-FI")} €
              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            className="rounded-xl border border-slate-700/50 p-4"
            style={{ background: "#16213e" }}
          >
            <h3 className="text-sm font-semibold mb-3 text-slate-300">
              Arvioitu kuukausisäästö
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickFormatter={(v) => `${v}€`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    color: "#f1f5f9",
                  }}
                  formatter={(value) => [
                    `${Number(value).toLocaleString("fi-FI")} €`,
                    "Säästö",
                  ]}
                />
                <Bar dataKey="savings" fill="#facc15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Formula */}
          <div
            className="rounded-xl border border-slate-700/50 p-4 text-sm"
            style={{ background: "#16213e" }}
          >
            <h3 className="font-semibold text-slate-300 mb-2">
              Laskentakaava
            </h3>
            <div className="space-y-1 text-slate-400 font-mono text-xs">
              <div>
                Tunnit/vuosi = {workers} hlö × {minPerDay} min × {workDays} pv /{" "}
                60 = <span className="text-blue-400 font-semibold">{Math.round(savedHoursPerYear)}h</span>
              </div>
              <div>
                €/vuosi = {Math.round(savedHoursPerYear)}h × {hourlyRate}€ ={" "}
                <span className="text-yellow-400 font-semibold">
                  {Math.round(eurosPerYear).toLocaleString("fi-FI")} €
                </span>
              </div>
              <div>
                €/kuukausi = {Math.round(eurosPerYear).toLocaleString("fi-FI")} € / 12 ={" "}
                <span className="text-green-400 font-semibold">
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
