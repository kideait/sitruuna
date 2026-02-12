import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Bot, X, Clock, User, GripVertical, Plus, MapPin } from "lucide-react";
import { employees } from "../data/employees";
import { currentAppointments, optimizedAppointments } from "../data/appointments";
import { weeklyAppointments } from "../data/weeklyAppointments";
import { areas } from "../data/areas";
import type { Appointment, Area, Client } from "../types";

const HOUR_START = 7;
const HOUR_END = 16;
const HOUR_HEIGHT = 60;
const COL_WIDTH = 140;

const DAY_NAMES = ["Ma", "Ti", "Ke", "To", "Pe"];

let newIdCounter = 100;

function formatHour(h: number): string {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}:${mins.toString().padStart(2, "0")}`;
}

function snapToQuarter(h: number): number {
  return Math.round(h * 4) / 4;
}

function clampHour(h: number, duration: number): number {
  return Math.max(HOUR_START, Math.min(HOUR_END - duration, h));
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getMondayOfWeek(weekOffset: number): Date {
  const now = new Date();
  const dayOfWeek = now.getDay() || 7; // Sunday = 7
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1 + weekOffset * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function formatDate(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.`;
}

// --- Edit / Create Modal ---
function AppointmentModal({
  app,
  isNew,
  clients,
  onSave,
  onClose,
}: {
  app: Appointment;
  isNew: boolean;
  clients: Client[];
  onSave: (appointment: Appointment) => void;
  onClose: () => void;
}) {
  const [empId, setEmpId] = useState(app.employeeId);
  const [startH, setStartH] = useState(Math.floor(app.startHour));
  const [startM, setStartM] = useState(Math.round((app.startHour % 1) * 60));
  const [clientName, setClientName] = useState(app.clientName);
  const [area, setArea] = useState<Area>(app.area);
  const [duration, setDuration] = useState(app.duration);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [useCustomClient, setUseCustomClient] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(clientName.toLowerCase())
  );

  const handleClientSelect = (client: Client) => {
    setClientName(client.name);
    setArea(client.area);
    setUseCustomClient(false);
    setShowClientDropdown(false);
  };

  const handleCustomClient = () => {
    setUseCustomClient(true);
    setClientName("");
    setShowClientDropdown(false);
  };

  const handleClientInputFocus = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setShowClientDropdown(true);
  };

  const handleClientInputBlur = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowClientDropdown(false);
    }, 200);
  };

  const handleSave = () => {
    const newStart = clampHour(startH + startM / 60, duration);
    onSave({
      ...app,
      employeeId: empId,
      startHour: newStart,
      clientName,
      area,
      duration,
      travelTimeMinutes: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative rounded-xl p-5 w-full max-w-sm space-y-4 shadow-xl max-h-[90vh] overflow-y-auto"
        style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{isNew ? "Uusi varaus" : "Muokkaa vuoroa"}</h3>
          <button onClick={onClose} className="p-1 rounded" style={{ color: "#94a3b8", background: "transparent" }}>
            <X size={18} />
          </button>
        </div>

        {/* Client selection with search dropdown */}
        <div className="relative">
          <label className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#64748b" }}>
            <MapPin size={14} />
            Asiakas
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
              setShowClientDropdown(true);
              setUseCustomClient(false);
            }}
            onFocus={handleClientInputFocus}
            onBlur={handleClientInputBlur}
            placeholder="Hae asiakasta..."
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
          />
          {showClientDropdown && !useCustomClient && (
            <div
              className="absolute z-50 left-0 right-0 mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto"
              style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
            >
              {filteredClients.map((c) => (
                <button
                  key={c.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleClientSelect(c)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-[#f8faf5] flex items-center justify-between gap-2"
                  style={{ borderBottom: "1px solid #f0f4e8" }}
                >
                  <span className="truncate" style={{ color: "#1e293b" }}>{c.name}</span>
                  <span className="text-xs flex-shrink-0" style={{ color: "#94a3b8" }}>{c.area}</span>
                </button>
              ))}
              {filteredClients.length === 0 && (
                <div className="px-3 py-2 text-xs" style={{ color: "#94a3b8" }}>
                  Ei tuloksia
                </div>
              )}
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleCustomClient}
                className="w-full text-left px-3 py-2 text-sm font-medium"
                style={{ color: "#6ba200", borderTop: "1px solid #e2e8d5" }}
              >
                + Muu asiakas
              </button>
            </div>
          )}
        </div>

        {/* Area select */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#64748b" }}>
            <MapPin size={14} />
            Alue
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as Area)}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
          >
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Employee select */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#64748b" }}>
            <User size={14} />
            Työntekijä
          </label>
          <select
            value={empId}
            onChange={(e) => setEmpId(Number(e.target.value))}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
          >
            {employees.map((e) => (
              <option key={e.id} value={e.id}>{e.name} ({e.shortName})</option>
            ))}
          </select>
        </div>

        {/* Time select */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#64748b" }}>
            <Clock size={14} />
            Alkamisaika
          </label>
          <div className="flex items-center gap-2">
            <select
              value={startH}
              onChange={(e) => setStartH(Number(e.target.value))}
              className="flex-1 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
              style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
            >
              {Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
                .filter((h) => h + duration <= HOUR_END)
                .map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
            </select>
            <span style={{ color: "#64748b" }}>:</span>
            <select
              value={startM}
              onChange={(e) => setStartM(Number(e.target.value))}
              className="flex-1 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
              style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
            >
              {[0, 15, 30, 45].map((m) => (
                <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-1.5" style={{ color: "#64748b" }}>
            <Clock size={14} />
            Kesto (tuntia)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={{ background: "#f8faf5", border: "1px solid #e2e8d5", color: "#1e293b" }}
          >
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((d) => (
              <option key={d} value={d}>{d}h</option>
            ))}
          </select>
          <div className="text-xs mt-1" style={{ color: "#94a3b8" }}>
            {formatHour(startH + startM / 60)} – {formatHour(startH + startM / 60 + duration)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ border: "1px solid #e2e8d5", color: "#64748b" }}
          >
            Peruuta
          </button>
          <button
            onClick={handleSave}
            disabled={!clientName.trim()}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "#94d60a", color: "#fff" }}
          >
            {isNew ? "Lisää" : "Tallenna"}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Weekly overview bar ---
function WeeklyOverview({
  weekOffset,
  setWeekOffset,
  selectedDayIndex,
  onSelectDay,
}: {
  weekOffset: number;
  setWeekOffset: (offset: number) => void;
  selectedDayIndex: number;
  onSelectDay: (dayIndex: number) => void;
}) {
  const monday = getMondayOfWeek(weekOffset);
  const weekNum = getWeekNumber(monday);
  const year = monday.getFullYear();

  const totalCapacityPerDay = employees.length * 9; // 9h per employee

  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}>
      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="p-1.5 rounded-lg transition-all hover:bg-[#f0f4e8]"
          style={{ color: "#64748b" }}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>
          Viikko {weekNum} / {year}
        </span>
        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="p-1.5 rounded-lg transition-all hover:bg-[#f0f4e8]"
          style={{ color: "#64748b" }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day cards */}
      <div className="grid grid-cols-5 gap-2">
        {DAY_NAMES.map((dayName, idx) => {
          const dayDate = new Date(monday);
          dayDate.setDate(monday.getDate() + idx);
          const dayApps = weeklyAppointments[idx] ?? [];
          const totalHours = dayApps.reduce((s, a) => s + a.duration, 0);
          const capacityPct = Math.round((totalHours / totalCapacityPerDay) * 100);
          const isSelected = selectedDayIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelectDay(idx)}
              className="rounded-lg p-2.5 text-left transition-all hover:shadow-sm"
              style={{
                background: isSelected ? "#f8faf5" : "#ffffff",
                border: isSelected ? "2px solid #94d60a" : "1px solid #e2e8d5",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold" style={{ color: isSelected ? "#6ba200" : "#1e293b" }}>
                  {dayName}
                </span>
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  {formatDate(dayDate)}
                </span>
              </div>
              {/* Capacity bar */}
              <div className="w-full h-2 rounded-full overflow-hidden mb-1" style={{ background: "#e2e8d5" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(capacityPct, 100)}%`,
                    background: capacityPct > 90 ? "#ef4444" : capacityPct > 70 ? "#f59e0b" : "#94d60a",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  {dayApps.length} varausta
                </span>
                <span className="text-xs font-medium" style={{ color: capacityPct > 90 ? "#ef4444" : capacityPct > 70 ? "#f59e0b" : "#6ba200" }}>
                  {capacityPct}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarView({ clients }: { clients: Client[] }) {
  const [optimized, setOptimized] = useState(false);
  const [editedCurrent, setEditedCurrent] = useState<Appointment[]>(currentAppointments);
  const [editedOptimized, setEditedOptimized] = useState<Appointment[]>(optimizedAppointments);
  const [editingApp, setEditingApp] = useState<Appointment | null>(null);
  const [isNewApp, setIsNewApp] = useState(false);
  const [dragInfo, setDragInfo] = useState<{
    appId: string;
    offsetY: number;
    startEmpId: number;
  } | null>(null);
  const [dragGhost, setDragGhost] = useState<{
    empId: number;
    startHour: number;
    duration: number;
    clientName: string;
  } | null>(null);
  const didDragRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Weekly state
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const today = new Date().getDay();
    // Convert: Sunday=0 -> 4(friday), Mon=1 -> 0, Tue=2 -> 1, etc.
    return today === 0 || today === 6 ? 0 : today - 1;
  });

  const appointments = optimized ? editedOptimized : editedCurrent;
  const setAppointments = optimized ? setEditedOptimized : setEditedCurrent;

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });

  const hours = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i);

  function getAppsForEmployee(empId: number): Appointment[] {
    return appointments.filter((a) => a.employeeId === empId);
  }

  const getEmployeeAtX = useCallback((clientX: number): number | null => {
    if (!gridRef.current) return null;
    const gridRect = gridRef.current.getBoundingClientRect();
    const sl = gridRef.current.scrollLeft;
    const relX = clientX - gridRect.left + sl - 60;
    const colIdx = Math.floor(relX / COL_WIDTH);
    if (colIdx >= 0 && colIdx < employees.length) return employees[colIdx].id;
    return null;
  }, []);

  const getHourAtY = useCallback((clientY: number): number => {
    if (!gridRef.current) return HOUR_START;
    const gridRect = gridRef.current.getBoundingClientRect();
    const relY = clientY - gridRect.top - 50; // header row ~50px
    return HOUR_START + relY / HOUR_HEIGHT;
  }, []);

  // --- Drag handlers ---
  const handlePointerDown = (e: React.PointerEvent, app: Appointment) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    didDragRef.current = false;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };

    const hourAtPointer = getHourAtY(e.clientY);
    setDragInfo({ appId: app.id, offsetY: hourAtPointer - app.startHour, startEmpId: app.employeeId });
    setDragGhost({ empId: app.employeeId, startHour: app.startHour, duration: app.duration, clientName: app.clientName });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragInfo || !dragGhost) return;
    e.preventDefault();
    if (pointerStartRef.current) {
      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDragRef.current = true;
    }
    if (!didDragRef.current) return;

    const hourAtPointer = getHourAtY(e.clientY);
    const newStart = snapToQuarter(clampHour(hourAtPointer - dragInfo.offsetY, dragGhost.duration));
    const empId = getEmployeeAtX(e.clientX) ?? dragGhost.empId;
    setDragGhost((prev) => (prev ? { ...prev, startHour: newStart, empId } : null));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragInfo || !dragGhost) { setDragInfo(null); setDragGhost(null); return; }
    e.preventDefault();
    if (didDragRef.current) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === dragInfo.appId
            ? { ...a, startHour: dragGhost.startHour, employeeId: dragGhost.empId, travelTimeMinutes: 0 }
            : a
        )
      );
    }
    setDragInfo(null);
    setDragGhost(null);
    pointerStartRef.current = null;
  };

  // --- Create new appointment by clicking empty slot ---
  const handleSlotClick = (empId: number, hour: number) => {
    if (dragInfo || didDragRef.current) return;
    const emp = employees.find((e) => e.id === empId);
    const snapped = snapToQuarter(hour);
    const newApp: Appointment = {
      id: `new-${++newIdCounter}`,
      employeeId: empId,
      clientName: "",
      area: emp?.homeArea ?? "Varkaus keskusta",
      clientType: "Yritys",
      startHour: clampHour(snapped, 1),
      duration: 1,
      travelTimeMinutes: 0,
    };
    setIsNewApp(true);
    setEditingApp(newApp);
  };

  // --- Modal save ---
  const handleModalSave = (updated: Appointment) => {
    if (isNewApp) {
      setAppointments((prev) => [...prev, updated]);
    } else {
      setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    }
  };

  // --- Day selection handler ---
  const handleSelectDay = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    const dayApps = weeklyAppointments[dayIndex] ?? [];
    setEditedCurrent(dayApps);
    setEditedOptimized(dayApps);
    setOptimized(false);
  };

  const totalCurrentTravel = editedCurrent.reduce((s, a) => s + a.travelTimeMinutes, 0);
  const totalOptimizedTravel = editedOptimized.reduce((s, a) => s + a.travelTimeMinutes, 0);
  const savedMinutes = totalCurrentTravel - totalOptimizedTravel;

  const hasEdits =
    JSON.stringify(editedCurrent) !== JSON.stringify(currentAppointments) ||
    JSON.stringify(editedOptimized) !== JSON.stringify(optimizedAppointments);

  const handleReset = () => {
    setEditedCurrent(currentAppointments);
    setEditedOptimized(optimizedAppointments);
  };

  // Day label for header
  const monday = getMondayOfWeek(weekOffset);
  const selectedDate = new Date(monday);
  selectedDate.setDate(monday.getDate() + selectedDayIndex);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Kalenterinäkymä</h1>
          <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
            Raahaa vuoroja siirtääksesi &bull; Klikkaa tyhjää kohtaa luodaksesi uuden varauksen
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {hasEdits && (
            <button
              onClick={handleReset}
              className="text-xs px-2 py-1 rounded transition-all"
              style={{ color: "#64748b", border: "1px solid #e2e8d5" }}
            >
              Palauta alkuperäinen
            </button>
          )}
          {optimized && (
            <span className="text-xs px-2 py-1 rounded" style={{ color: "#6ba200", background: "#94d60a10" }}>
              Säästö: {savedMinutes} min siirtymäaikaa
            </span>
          )}
          <div className="flex rounded-lg overflow-hidden text-sm" style={{ border: "1px solid #e2e8d5" }}>
            <button
              onClick={() => setOptimized(false)}
              className="px-3 py-1.5 transition-all"
              style={!optimized ? { background: "#e2e8d5", color: "#1e293b" } : { color: "#64748b" }}
            >
              Nykyinen
            </button>
            <button
              onClick={() => setOptimized(true)}
              className="px-3 py-1.5 flex items-center gap-1 transition-all"
              style={optimized ? { background: "#94d60a15", color: "#6ba200" } : { color: "#64748b" }}
            >
              <Bot size={14} />
              AI-optimoitu
            </button>
          </div>
        </div>
      </div>

      {/* Weekly overview */}
      <WeeklyOverview
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        selectedDayIndex={selectedDayIndex}
        onSelectDay={handleSelectDay}
      />

      {/* Day header */}
      <div className="text-sm font-medium" style={{ color: "#64748b" }}>
        {DAY_NAMES[selectedDayIndex]} {formatDate(selectedDate)} &mdash; {appointments.length} varausta
      </div>

      {/* Calendar grid */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}>
        {/* Scroll controls */}
        <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: "1px solid #e2e8d5" }}>
          <button onClick={scrollLeft} className="p-1 rounded" style={{ color: "#64748b" }}>
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs" style={{ color: "#94a3b8" }}>
            {employees.length} työntekijää – vieritä nähdäksesi kaikki
          </span>
          <button onClick={scrollRight} className="p-1 rounded" style={{ color: "#64748b" }}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          className="flex overflow-x-auto select-none"
          ref={(el) => {
            (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            (gridRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Time column */}
          <div className="flex-shrink-0" style={{ width: 60, borderRight: "1px solid #e2e8d5" }}>
            <div className="h-[50px] flex items-center justify-center text-xs" style={{ borderBottom: "1px solid #e2e8d5", color: "#94a3b8" }}>
              Aika
            </div>
            {hours.map((h) => (
              <div
                key={h}
                className="flex items-start justify-center pt-1 text-xs"
                style={{ height: HOUR_HEIGHT, borderBottom: "1px solid #f0f4e8", color: "#94a3b8" }}
              >
                {h}:00
              </div>
            ))}
          </div>

          {/* Employee columns */}
          {employees.map((emp) => {
            const empApps = getAppsForEmployee(emp.id);
            const isDropTarget = dragGhost?.empId === emp.id;

            return (
              <div
                key={emp.id}
                className="flex-shrink-0 transition-colors"
                style={{
                  width: COL_WIDTH,
                  borderRight: "1px solid #f0f4e8",
                  background: isDropTarget && dragInfo ? "#94d60a08" : undefined,
                }}
              >
                {/* Header - full employee name */}
                <div
                  className="h-[50px] flex flex-col items-center justify-center gap-0.5 px-1"
                  style={{ borderBottom: "1px solid #e2e8d5" }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: emp.color }} />
                    <span className="text-xs font-semibold truncate" style={{ color: emp.color }}>{emp.name}</span>
                  </div>
                  <span className="text-xs truncate" style={{ color: "#94a3b8", fontSize: 9 }}>
                    {emp.homeArea}
                  </span>
                </div>

                {/* Time slots */}
                <div
                  className="relative"
                  style={{ height: hours.length * HOUR_HEIGHT }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const relY = e.clientY - rect.top;
                    const hour = HOUR_START + relY / HOUR_HEIGHT;
                    handleSlotClick(emp.id, hour);
                  }}
                >
                  {/* Grid lines */}
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="absolute w-full"
                      style={{ top: (h - HOUR_START) * HOUR_HEIGHT, height: HOUR_HEIGHT, borderBottom: "1px solid #f0f4e8" }}
                    />
                  ))}

                  {/* Drop ghost preview */}
                  {dragInfo && dragGhost && dragGhost.empId === emp.id && (
                    <div
                      className="absolute left-1 right-1 rounded-md border-2 border-dashed pointer-events-none z-20"
                      style={{
                        top: (dragGhost.startHour - HOUR_START) * HOUR_HEIGHT,
                        height: dragGhost.duration * HOUR_HEIGHT - 2,
                        borderColor: "#94d60a80",
                        background: "#94d60a15",
                      }}
                    >
                      <div className="px-1.5 py-1 text-xs font-medium truncate" style={{ color: "#6ba200", fontSize: 10 }}>
                        {dragGhost.clientName}
                      </div>
                      <div className="px-1.5 text-xs" style={{ color: "#94d60a80", fontSize: 9 }}>
                        {formatHour(dragGhost.startHour)} – {formatHour(dragGhost.startHour + dragGhost.duration)}
                      </div>
                    </div>
                  )}

                  {/* "+" hover hint on empty area */}
                  {!dragInfo && (
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center z-0">
                      <div className="rounded-full p-1" style={{ background: "#94d60a20" }}>
                        <Plus size={14} style={{ color: "#94d60a60" }} />
                      </div>
                    </div>
                  )}

                  {/* Appointments */}
                  {empApps.map((app) => {
                    const isDragging = dragInfo?.appId === app.id;
                    const top = (app.startHour - HOUR_START) * HOUR_HEIGHT;
                    const height = app.duration * HOUR_HEIGHT;
                    const empData = employees.find((e) => e.id === app.employeeId) ?? emp;

                    return (
                      <div key={app.id} className={isDragging ? "opacity-30" : ""}>
                        {!isDragging && app.travelTimeMinutes > 0 && (
                          <div
                            className="absolute left-1 right-1 flex items-center justify-center pointer-events-none"
                            style={{ top: top - 14, height: 14, fontSize: 9, color: "#94a3b8" }}
                          >
                            🚗 {app.travelTimeMinutes}m
                          </div>
                        )}
                        <div
                          className={`absolute left-1 right-1 rounded-md px-1.5 py-1 overflow-hidden border cursor-grab active:cursor-grabbing z-10 group transition-shadow ${
                            isDragging ? "" : "hover:shadow-md hover:shadow-black/10 hover:z-30"
                          }`}
                          style={{
                            top,
                            height: Math.max(height - 2, 20),
                            backgroundColor: empData.color + "20",
                            borderColor: empData.color + "40",
                            touchAction: "none",
                          }}
                          onPointerDown={(e) => handlePointerDown(e, app)}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!didDragRef.current) {
                              setIsNewApp(false);
                              setEditingApp(app);
                            }
                          }}
                        >
                          <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-60 transition-opacity">
                            <GripVertical size={10} style={{ color: "#475569" }} />
                          </div>
                          <div className="text-xs font-medium truncate" style={{ color: empData.color, fontSize: 10 }}>
                            {app.clientName}
                          </div>
                          <div className="text-xs" style={{ fontSize: 9, color: "#64748b" }}>
                            {formatHour(app.startHour)}–{formatHour(app.startHour + app.duration)}
                          </div>
                          {height > 40 && (
                            <div className="text-xs" style={{ fontSize: 9, color: "#94a3b8" }}>
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

      {/* Modal */}
      {editingApp && (
        <AppointmentModal
          app={editingApp}
          isNew={isNewApp}
          clients={clients}
          onSave={handleModalSave}
          onClose={() => { setEditingApp(null); setIsNewApp(false); }}
        />
      )}
    </div>
  );
}
