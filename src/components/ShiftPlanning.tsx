import { useState } from "react";
import { Bot, MapPin, Clock, User, Settings, X, ChevronDown, ChevronUp } from "lucide-react";
import { jobs as baseJobs } from "../data/jobs";
import { currentAppointments } from "../data/appointments";
import { areas } from "../data/areas";
import { rankEmployeesForJob } from "../logic/scoring";
import { autoAssignAll } from "../logic/optimizer";
import { calculateWeeklyHours } from "../logic/capacity";
import type { Job, Employee, Skill, Area } from "../types";
import SkillBadge from "./ui/SkillBadge";
import PriorityBadge from "./ui/PriorityBadge";
import CapacityBar from "./ui/CapacityBar";
import ScoreDisplay from "./ui/ScoreDisplay";

const ALL_SKILLS: { value: Skill; label: string }[] = [
  { value: "ylläpito", label: "Ylläpito" },
  { value: "teollisuus", label: "Teollisuus" },
  { value: "loppusiivous", label: "Loppusiivous" },
  { value: "toimisto", label: "Toimisto" },
  { value: "ikkunat", label: "Ikkunat" },
];

const HOUR_OPTIONS = [10, 15, 20, 25, 30, 32.5, 35, 37.5, 40];

type Tab = "jobs" | "employees";

// --- Employee Edit Modal ---
function EmployeeEditModal({
  employee,
  onSave,
  onClose,
}: {
  employee: Employee;
  onSave: (updated: Employee) => void;
  onClose: () => void;
}) {
  const [hours, setHours] = useState(employee.contractHoursPerWeek);
  const [skills, setSkills] = useState<Skill[]>([...employee.skills]);
  const [homeArea, setHomeArea] = useState<Area>(employee.homeArea);

  const toggleSkill = (skill: Skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = () => {
    onSave({ ...employee, contractHoursPerWeek: hours, skills, homeArea });
    onClose();
  };

  const inputStyle = {
    background: "#f8faf5",
    border: "1px solid #e2e8d5",
    color: "#1e293b",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative rounded-xl p-5 w-full max-w-md space-y-5 shadow-xl"
        style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: employee.color }} />
            <h3 className="font-semibold text-lg">{employee.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded" style={{ color: "#94a3b8" }}>
            <X size={18} />
          </button>
        </div>

        {/* Contract hours */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-2" style={{ color: "#64748b" }}>
            <Clock size={14} />
            Sopimustunnit / viikko
          </label>
          <select
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          >
            {HOUR_OPTIONS.map((h) => (
              <option key={h} value={h}>{h} h/vko</option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-2" style={{ color: "#64748b" }}>
            <Settings size={14} />
            Osaaminen
          </label>
          <p className="text-xs mb-2" style={{ color: "#94a3b8" }}>
            Valitse kaikki osaamisalueet jotka vaikuttavat työvuorojen optimointiin.
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((s) => {
              const active = skills.includes(s.value);
              return (
                <button
                  key={s.value}
                  onClick={() => toggleSkill(s.value)}
                  className="px-3 py-1.5 rounded-lg text-sm border transition-all"
                  style={
                    active
                      ? { background: "#94d60a15", color: "#6ba200", borderColor: "#94d60a60" }
                      : { background: "#ffffff", color: "#94a3b8", borderColor: "#e2e8d5" }
                  }
                >
                  {active ? "✓ " : ""}{s.label}
                </button>
              );
            })}
          </div>
          {skills.length === 0 && (
            <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
              Valitse vähintään yksi osaaminen.
            </p>
          )}
        </div>

        {/* Home area */}
        <div>
          <label className="flex items-center gap-1.5 text-sm mb-2" style={{ color: "#64748b" }}>
            <MapPin size={14} />
            Kotialue
          </label>
          <select
            value={homeArea}
            onChange={(e) => setHomeArea(e.target.value as Area)}
            className="w-full rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#94d60a50]"
            style={inputStyle}
          >
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
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
            disabled={skills.length === 0}
            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: "#94d60a", color: "#fff" }}
          >
            Tallenna
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Employee card in the list ---
function EmployeeCard({
  employee,
  weeklyHours,
  onEdit,
  expanded,
  onToggle,
}: {
  employee: Employee;
  weeklyHours: number;
  onEdit: () => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl border transition-all"
      style={{ background: "#ffffff", borderColor: "#e2e8d5" }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-3 flex items-center gap-3"
      >
        <div className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ backgroundColor: employee.color }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{employee.name}</span>
            <span className="text-xs" style={{ color: "#94a3b8" }}>({employee.shortName})</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: "#64748b" }}>
            <span>{employee.contractHoursPerWeek} h/vko</span>
            <span>&bull;</span>
            <span>{employee.homeArea}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1">
            {employee.skills.slice(0, 3).map((s) => (
              <SkillBadge key={s} skill={s} />
            ))}
            {employee.skills.length > 3 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ color: "#94a3b8", background: "#f0f4e8" }}>
                +{employee.skills.length - 3}
              </span>
            )}
          </div>
          {expanded ? <ChevronUp size={14} style={{ color: "#94a3b8" }} /> : <ChevronDown size={14} style={{ color: "#94a3b8" }} />}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3" style={{ borderTop: "1px solid #f0f4e8" }}>
          <div className="pt-3 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>Sopimustunnit</div>
              <div className="text-sm font-medium">{employee.contractHoursPerWeek} h/vko</div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "#94a3b8" }}>Nykyinen kuormitus</div>
              <CapacityBar assigned={weeklyHours} contract={employee.contractHoursPerWeek} />
            </div>
          </div>
          <div>
            <div className="text-xs mb-1.5" style={{ color: "#94a3b8" }}>Kotialue</div>
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={12} style={{ color: "#64748b" }} />
              {employee.homeArea}
            </div>
          </div>
          <div>
            <div className="text-xs mb-1.5" style={{ color: "#94a3b8" }}>Osaaminen</div>
            <div className="flex flex-wrap gap-1">
              {employee.skills.map((s) => (
                <SkillBadge key={s} skill={s} />
              ))}
            </div>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{ color: "#6ba200", border: "1px solid #94d60a40", background: "#94d60a08" }}
          >
            <Settings size={12} />
            Muokkaa tietoja
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShiftPlanning({
  employees: propEmployees,
  onUpdateEmployee,
}: {
  employees: Employee[];
  onUpdateEmployee: (updated: Employee) => void;
}) {
  const [jobs, setJobs] = useState<Job[]>(baseJobs.map((j) => ({ ...j })));
  const [selectedJobId, setSelectedJobId] = useState<string | null>(baseJobs[0]?.id ?? null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [tab, setTab] = useState<Tab>("jobs");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [expandedEmpId, setExpandedEmpId] = useState<number | null>(null);

  const emps: Employee[] = propEmployees.map((e) => ({
    ...e,
    currentWeeklyHoursAssigned: calculateWeeklyHours(e, currentAppointments),
  }));

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;
  const rankings = selectedJob ? rankEmployeesForJob(emps, selectedJob) : [];

  function handleAutoAssign() {
    setIsAssigning(true);
    setTimeout(() => {
      const assigned = autoAssignAll(jobs, emps);
      setJobs(assigned);
      setIsAssigning(false);
    }, 1800);
  }

  function handleManualAssign(empId: number) {
    if (!selectedJobId) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === selectedJobId ? { ...j, assignedTo: empId } : j
      )
    );
  }

  const assignedCount = jobs.filter((j) => j.assignedTo).length;

  // Employee stats
  const totalContractHours = emps.reduce((s, e) => s + e.contractHoursPerWeek, 0);
  const totalAssignedHours = emps.reduce((s, e) => s + e.currentWeeklyHoursAssigned, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">AI-työvuorosuunnittelu</h1>
        <div className="flex items-center gap-3">
          {tab === "jobs" && (
            <>
              <span className="text-sm" style={{ color: "#64748b" }}>
                Jaettu: {assignedCount}/{jobs.length}
              </span>
              <button
                onClick={handleAutoAssign}
                disabled={isAssigning}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 transition-all"
                style={{ background: "#94d60a", color: "#fff" }}
              >
                <Bot size={16} className={isAssigning ? "animate-spin" : ""} />
                {isAssigning ? "AI laskee..." : "AI: Jaa kaikki"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-lg overflow-hidden text-sm" style={{ border: "1px solid #e2e8d5" }}>
        <button
          onClick={() => setTab("jobs")}
          className="px-4 py-2 flex items-center gap-2 transition-all"
          style={tab === "jobs" ? { background: "#e2e8d5", color: "#1e293b" } : { color: "#64748b" }}
        >
          <Clock size={14} />
          Työt ja optimointi
        </button>
        <button
          onClick={() => setTab("employees")}
          className="px-4 py-2 flex items-center gap-2 transition-all"
          style={tab === "employees" ? { background: "#e2e8d5", color: "#1e293b" } : { color: "#64748b" }}
        >
          <User size={14} />
          Työntekijät ({emps.length})
        </button>
      </div>

      {tab === "employees" ? (
        /* ===== EMPLOYEE SETTINGS TAB ===== */
        <div className="space-y-4">
          {/* Summary bar */}
          <div
            className="rounded-xl p-4 flex flex-wrap gap-6"
            style={{ background: "#ffffff", border: "1px solid #e2e8d5" }}
          >
            <div>
              <div className="text-xs" style={{ color: "#94a3b8" }}>Työntekijöitä</div>
              <div className="text-lg font-semibold">{emps.length}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "#94a3b8" }}>Viikkotunnit yhteensä</div>
              <div className="text-lg font-semibold">{totalContractHours} h</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "#94a3b8" }}>Varattu tällä viikolla</div>
              <div className="text-lg font-semibold">{totalAssignedHours} h</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "#94a3b8" }}>Käyttöaste</div>
              <div className="text-lg font-semibold" style={{ color: totalAssignedHours / totalContractHours > 0.85 ? "#f59e0b" : "#6ba200" }}>
                {Math.round((totalAssignedHours / totalContractHours) * 100)}%
              </div>
            </div>
          </div>

          <p className="text-xs" style={{ color: "#94a3b8" }}>
            Klikkaa työntekijää nähdäksesi tiedot. Muokkaa sopimustunteja ja osaamista vaikuttaaksesi optimointiin.
          </p>

          {/* Employee list */}
          <div className="space-y-2">
            {emps.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                weeklyHours={emp.currentWeeklyHoursAssigned}
                onEdit={() => setEditingEmployee(emp)}
                expanded={expandedEmpId === emp.id}
                onToggle={() => setExpandedEmpId(expandedEmpId === emp.id ? null : emp.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ===== JOBS TAB (original) ===== */
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Job list */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
              Jaettavat työt
            </h2>
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
              {jobs.map((job) => {
                const assigned = job.assignedTo
                  ? propEmployees.find((e) => e.id === job.assignedTo)
                  : null;
                const isSelected = selectedJobId === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "border-[#94d60a50] bg-[#94d60a08]"
                        : "border-[#e2e8d5] hover:border-slate-300"
                    }`}
                    style={{ background: isSelected ? undefined : "#ffffff" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-sm">{job.clientName}</span>
                      <PriorityBadge priority={job.priority} />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs mb-2" style={{ color: "#64748b" }}>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {job.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {job.hoursPerVisit}h • {job.frequency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <SkillBadge skill={job.requiredSkill} />
                      {assigned ? (
                        <span
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: assigned.color + "20",
                            color: assigned.color,
                            border: `1px solid ${assigned.color}40`,
                          }}
                        >
                          <User size={10} />
                          {assigned.name}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "#94a3b8" }}>Ei tekijää</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Scoring panel */}
          <div className="lg:col-span-3 space-y-3">
            {selectedJob ? (
              <>
                <div
                  className="rounded-xl border p-4"
                  style={{ background: "#ffffff", borderColor: "#e2e8d5" }}
                >
                  <h2 className="font-semibold text-lg mb-1">
                    {selectedJob.clientName}
                  </h2>
                  <div className="flex flex-wrap gap-3 text-sm mb-2" style={{ color: "#64748b" }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {selectedJob.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {selectedJob.hoursPerVisit}h / käynti
                    </span>
                    <span>{selectedJob.frequency}</span>
                    <span>{selectedJob.clientType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <SkillBadge skill={selectedJob.requiredSkill} />
                    <PriorityBadge priority={selectedJob.priority} />
                  </div>
                  {selectedJob.previousWorkerIds.length > 0 && (
                    <div className="mt-2 text-xs" style={{ color: "#64748b" }}>
                      Aiemmat tekijät:{" "}
                      {selectedJob.previousWorkerIds
                        .map(
                          (id) =>
                            propEmployees.find((e) => e.id === id)?.name ?? `#${id}`
                        )
                        .join(", ")}
                    </div>
                  )}
                </div>

                <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
                  Ehdokkaat pistejärjestyksessä
                </h2>

                <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-1">
                  {rankings.map((r, idx) => (
                    <button
                      key={r.employee.id}
                      onClick={() => handleManualAssign(r.employee.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedJob.assignedTo === r.employee.id
                          ? "border-green-500/50 bg-green-50"
                          : idx === 0
                          ? "border-[#94d60a30] bg-[#94d60a08]"
                          : "border-[#e2e8d5] hover:border-slate-300"
                      }`}
                      style={{
                        background:
                          selectedJob.assignedTo === r.employee.id
                            ? undefined
                            : idx === 0
                            ? undefined
                            : "#ffffff",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <ScoreDisplay score={r.score} compact />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: r.employee.color }}
                            />
                            <span className="font-medium text-sm">
                              {r.employee.name}
                            </span>
                            {idx === 0 && (
                              <span className="text-xs bg-[#94d60a15] text-[#6ba200] px-1.5 py-0.5 rounded">
                                Paras
                              </span>
                            )}
                            {selectedJob.assignedTo === r.employee.id && (
                              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                Valittu
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {r.employee.skills.map((s) => (
                              <SkillBadge
                                key={s}
                                skill={s}
                                highlight={s === selectedJob.requiredSkill}
                              />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs mb-2" style={{ color: "#64748b" }}>
                            {r.reasons.map((reason, ri) => (
                              <span key={ri}>{reason}</span>
                            ))}
                          </div>
                          <CapacityBar
                            assigned={r.employee.currentWeeklyHoursAssigned}
                            contract={r.employee.contractHoursPerWeek}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div
                  className="rounded-lg border p-3 text-xs"
                  style={{ background: "#f8faf5", borderColor: "#e2e8d5", color: "#64748b" }}
                >
                  <div className="font-semibold mb-1" style={{ color: "#334155" }}>
                    Pisteytyksen selitykset
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <span>🎯 Osaaminen (max 30p)</span>
                    <span>🔄 Asiakashistoria (max 25p)</span>
                    <span>📍 Reittiläheisyys (max 25p)</span>
                    <span>⏰ Sopimustunnit (max 20p)</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64" style={{ color: "#94a3b8" }}>
                Valitse työ vasemmalta
              </div>
            )}
          </div>
        </div>
      )}

      {/* Employee edit modal */}
      {editingEmployee && (
        <EmployeeEditModal
          employee={editingEmployee}
          onSave={(updated) => {
            onUpdateEmployee(updated);
            setEditingEmployee(null);
          }}
          onClose={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
}
