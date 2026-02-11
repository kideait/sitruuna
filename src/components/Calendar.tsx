import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Bot } from "lucide-react";
import { employees } from "../data/employees";
import { currentAppointments, optimizedAppointments } from "../data/appointments";
import type { Appointment } from "../types";

const HOUR_START = 7;
const HOUR_END = 16;
const HOUR_HEIGHT = 60; // px per hour
const COL_WIDTH = 140; // px per employee column

function formatHour(h: number): string {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}:${mins.toString().padStart(2, "0")}`;
}

export default function CalendarView() {
  const [optimized, setOptimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const appointments = optimized ? optimizedAppointments : currentAppointments;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });
  };

  const hours = Array.from(
    { length: HOUR_END - HOUR_START },
    (_, i) => HOUR_START + i
  );

  function getAppsForEmployee(empId: number): Appointment[] {
    return appointments.filter((a) => a.employeeId === empId);
  }

  const totalCurrentTravel = currentAppointments.reduce(
    (s, a) => s + a.travelTimeMinutes,
    0
  );
  const totalOptimizedTravel = optimizedAppointments.reduce(
    (s, a) => s + a.travelTimeMinutes,
    0
  );
  const savedMinutes = totalCurrentTravel - totalOptimizedTravel;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Kalenterinäkymä</h1>
        <div className="flex items-center gap-3">
          {optimized && (
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
              Säästö: {savedMinutes} min siirtymäaikaa
            </span>
          )}
          <div className="flex rounded-lg border border-slate-700/50 overflow-hidden text-sm">
            <button
              onClick={() => setOptimized(false)}
              className={`px-3 py-1.5 transition-all ${
                !optimized
                  ? "bg-slate-700 text-white"
                  : "bg-transparent text-slate-400 hover:text-white"
              }`}
            >
              Nykyinen
            </button>
            <button
              onClick={() => setOptimized(true)}
              className={`px-3 py-1.5 flex items-center gap-1 transition-all ${
                optimized
                  ? "bg-yellow-400/20 text-yellow-400"
                  : "bg-transparent text-slate-400 hover:text-white"
              }`}
            >
              <Bot size={14} />
              AI-optimoitu
            </button>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div
        className="rounded-xl border border-slate-700/50 overflow-hidden"
        style={{ background: "#16213e" }}
      >
        {/* Scroll controls */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50">
          <button
            onClick={scrollLeft}
            className="p-1 rounded hover:bg-slate-700 text-slate-400"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-slate-400">
            {employees.length} työntekijää – vieritä nähdäksesi kaikki
          </span>
          <button
            onClick={scrollRight}
            className="p-1 rounded hover:bg-slate-700 text-slate-400"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex overflow-x-auto" ref={scrollRef}>
          {/* Time column */}
          <div
            className="flex-shrink-0 border-r border-slate-700/50"
            style={{ width: 60 }}
          >
            <div
              className="h-10 border-b border-slate-700/50 flex items-center justify-center text-xs text-slate-500"
            >
              Aika
            </div>
            {hours.map((h) => (
              <div
                key={h}
                className="border-b border-slate-700/30 flex items-start justify-center pt-1 text-xs text-slate-500"
                style={{ height: HOUR_HEIGHT }}
              >
                {h}:00
              </div>
            ))}
          </div>

          {/* Employee columns */}
          {employees.map((emp) => {
            const empApps = getAppsForEmployee(emp.id);
            return (
              <div
                key={emp.id}
                className="flex-shrink-0 border-r border-slate-700/30"
                style={{ width: COL_WIDTH }}
              >
                {/* Header */}
                <div className="h-10 border-b border-slate-700/50 flex items-center justify-center gap-1 px-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: emp.color }}
                  />
                  <span className="text-xs font-medium truncate">
                    {emp.shortName}
                  </span>
                </div>

                {/* Time slots */}
                <div className="relative" style={{ height: hours.length * HOUR_HEIGHT }}>
                  {/* Grid lines */}
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="absolute w-full border-b border-slate-700/20"
                      style={{ top: (h - HOUR_START) * HOUR_HEIGHT, height: HOUR_HEIGHT }}
                    />
                  ))}

                  {/* Appointments */}
                  {empApps.map((app) => {
                    const top = (app.startHour - HOUR_START) * HOUR_HEIGHT;
                    const height = app.duration * HOUR_HEIGHT;
                    return (
                      <div key={app.id}>
                        {/* Travel time indicator */}
                        {app.travelTimeMinutes > 0 && (
                          <div
                            className="absolute left-1 right-1 flex items-center justify-center text-slate-400"
                            style={{
                              top: top - 14,
                              height: 14,
                              fontSize: 9,
                            }}
                          >
                            🚗 {app.travelTimeMinutes}m
                          </div>
                        )}
                        <div
                          className="absolute left-1 right-1 rounded-md px-1.5 py-1 overflow-hidden border"
                          style={{
                            top,
                            height: Math.max(height - 2, 20),
                            backgroundColor: emp.color + "20",
                            borderColor: emp.color + "40",
                          }}
                        >
                          <div
                            className="text-xs font-medium truncate"
                            style={{ color: emp.color, fontSize: 10 }}
                          >
                            {app.clientName}
                          </div>
                          <div className="text-xs text-slate-400" style={{ fontSize: 9 }}>
                            {formatHour(app.startHour)}–
                            {formatHour(app.startHour + app.duration)}
                          </div>
                          {height > 40 && (
                            <div className="text-xs text-slate-500" style={{ fontSize: 9 }}>
                              {app.area}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
