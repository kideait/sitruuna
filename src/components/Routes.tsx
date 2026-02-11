import { useState } from "react";
import { MapPin, Clock, Car } from "lucide-react";
import { employees } from "../data/employees";
import { optimizedAppointments } from "../data/appointments";
import type { Appointment } from "../types";

export default function RoutesView() {
  const [selectedEmpId, setSelectedEmpId] = useState<number>(employees[0].id);
  const selectedEmp = employees.find((e) => e.id === selectedEmpId)!;

  const empApps: Appointment[] = optimizedAppointments
    .filter((a) => a.employeeId === selectedEmpId)
    .sort((a, b) => a.startHour - b.startHour);

  const totalTravel = empApps.reduce((s, a) => s + a.travelTimeMinutes, 0);
  const totalWork = empApps.reduce((s, a) => s + a.duration, 0);

  function formatHour(h: number): string {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reittinäkymä</h1>

      {/* Employee buttons */}
      <div className="flex flex-wrap gap-2">
        {employees.map((emp) => {
          const isActive = emp.id === selectedEmpId;
          return (
            <button
              key={emp.id}
              onClick={() => setSelectedEmpId(emp.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all border ${
                isActive
                  ? "border-current"
                  : "border-slate-700/50 text-slate-400 hover:text-slate-200"
              }`}
              style={
                isActive
                  ? {
                      color: emp.color,
                      backgroundColor: emp.color + "15",
                      borderColor: emp.color + "50",
                    }
                  : { background: "#16213e" }
              }
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: emp.color }}
              />
              {emp.shortName}
            </button>
          );
        })}
      </div>

      {/* Route info */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div
          className="rounded-xl border border-slate-700/50 p-4"
          style={{ background: "#16213e" }}
        >
          <div className="text-xs text-slate-400 mb-1">Työntekijä</div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedEmp.color }}
            />
            <span className="font-semibold">{selectedEmp.name}</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Kotialue: {selectedEmp.homeArea}
          </div>
        </div>
        <div
          className="rounded-xl border border-slate-700/50 p-4"
          style={{ background: "#16213e" }}
        >
          <div className="text-xs text-slate-400 mb-1">Käynnit tänään</div>
          <div className="text-2xl font-bold text-blue-400">{empApps.length}</div>
          <div className="text-xs text-slate-400 mt-1">
            Työtunteja: {totalWork}h
          </div>
        </div>
        <div
          className="rounded-xl border border-slate-700/50 p-4"
          style={{ background: "#16213e" }}
        >
          <div className="text-xs text-slate-400 mb-1">Siirtymäaika yhteensä</div>
          <div className="text-2xl font-bold text-yellow-400">{totalTravel} min</div>
          <div className="text-xs text-slate-400 mt-1">
            AI-optimoitu reitti
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div
        className="rounded-xl border border-slate-700/50 p-4"
        style={{ background: "#16213e" }}
      >
        <h2 className="text-lg font-semibold mb-4">Päivän aikajana</h2>
        <div className="space-y-0">
          {empApps.map((app, idx) => (
            <div key={app.id}>
              {/* Travel indicator between stops */}
              {idx > 0 && app.travelTimeMinutes > 0 && (
                <div className="flex items-center gap-3 py-2 pl-6">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-slate-600" />
                    <Car size={14} className="text-slate-400 my-1" />
                    <div className="w-0.5 h-3 bg-slate-600" />
                  </div>
                  <span className="text-xs text-slate-400">
                    Siirtymä: {app.travelTimeMinutes} min
                    {app.area !== empApps[idx - 1].area && (
                      <span className="text-slate-500">
                        {" "}
                        ({empApps[idx - 1].area} → {app.area})
                      </span>
                    )}
                  </span>
                </div>
              )}

              {/* Appointment card */}
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all">
                <div className="flex flex-col items-center">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                    style={{
                      borderColor: selectedEmp.color,
                      backgroundColor: selectedEmp.color + "30",
                    }}
                  />
                  {idx < empApps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 min-h-4"
                      style={{ backgroundColor: selectedEmp.color + "30" }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{app.clientName}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {formatHour(app.startHour)} –{" "}
                      {formatHour(app.startHour + app.duration)} (
                      {app.duration}h)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {app.area}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {app.clientType}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {empApps.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Ei käyntejä tänään
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
