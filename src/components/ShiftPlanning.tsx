import { useState } from "react";
import { Bot, MapPin, Clock, User } from "lucide-react";
import { employees as baseEmployees } from "../data/employees";
import { jobs as baseJobs } from "../data/jobs";
import { currentAppointments } from "../data/appointments";
import { rankEmployeesForJob } from "../logic/scoring";
import { autoAssignAll } from "../logic/optimizer";
import { calculateWeeklyHours } from "../logic/capacity";
import type { Job, Employee } from "../types";
import SkillBadge from "./ui/SkillBadge";
import PriorityBadge from "./ui/PriorityBadge";
import CapacityBar from "./ui/CapacityBar";
import ScoreDisplay from "./ui/ScoreDisplay";

export default function ShiftPlanning() {
  const [jobs, setJobs] = useState<Job[]>(baseJobs.map((j) => ({ ...j })));
  const [selectedJobId, setSelectedJobId] = useState<string | null>(baseJobs[0]?.id ?? null);
  const [isAssigning, setIsAssigning] = useState(false);

  const emps: Employee[] = baseEmployees.map((e) => ({
    ...e,
    currentWeeklyHoursAssigned: calculateWeeklyHours(e, currentAppointments),
  }));

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;
  const rankings = selectedJob ? rankEmployeesForJob(emps, selectedJob) : [];

  function handleAutoAssign() {
    setIsAssigning(true);
    setTimeout(() => {
      const assigned = autoAssignAll(
        jobs,
        emps
      );
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">AI-työvuorosuunnittelu</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">
            Jaettu: {assignedCount}/{jobs.length}
          </span>
          <button
            onClick={handleAutoAssign}
            disabled={isAssigning}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold text-sm hover:bg-yellow-300 disabled:opacity-50 transition-all"
          >
            <Bot size={16} className={isAssigning ? "animate-spin" : ""} />
            {isAssigning ? "AI laskee..." : "AI: Jaa kaikki"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Job list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Jaettavat työt
          </h2>
          <div className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
            {jobs.map((job) => {
              const assigned = job.assignedTo
                ? baseEmployees.find((e) => e.id === job.assignedTo)
                : null;
              const isSelected = selectedJobId === job.id;
              return (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-yellow-400/50 bg-yellow-400/5"
                      : "border-slate-700/50 hover:border-slate-600"
                  }`}
                  style={{ background: isSelected ? undefined : "#16213e" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-medium text-sm">{job.clientName}</span>
                    <PriorityBadge priority={job.priority} />
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-2">
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
                      <span className="text-xs text-slate-500">Ei tekijää</span>
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
                className="rounded-xl border border-slate-700/50 p-4"
                style={{ background: "#16213e" }}
              >
                <h2 className="font-semibold text-lg mb-1">
                  {selectedJob.clientName}
                </h2>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-2">
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
                  <div className="mt-2 text-xs text-slate-400">
                    Aiemmat tekijät:{" "}
                    {selectedJob.previousWorkerIds
                      .map(
                        (id) =>
                          baseEmployees.find((e) => e.id === id)?.name ?? `#${id}`
                      )
                      .join(", ")}
                  </div>
                )}
              </div>

              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Ehdokkaat pistejärjestyksessä
              </h2>

              <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-1">
                {rankings.map((r, idx) => (
                  <button
                    key={r.employee.id}
                    onClick={() => handleManualAssign(r.employee.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedJob.assignedTo === r.employee.id
                        ? "border-green-400/50 bg-green-400/5"
                        : idx === 0
                        ? "border-yellow-400/30 bg-yellow-400/5"
                        : "border-slate-700/50 hover:border-slate-600"
                    }`}
                    style={{
                      background:
                        selectedJob.assignedTo === r.employee.id
                          ? undefined
                          : idx === 0
                          ? undefined
                          : "#16213e",
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
                            <span className="text-xs bg-yellow-400/20 text-yellow-300 px-1.5 py-0.5 rounded">
                              Paras
                            </span>
                          )}
                          {selectedJob.assignedTo === r.employee.id && (
                            <span className="text-xs bg-green-400/20 text-green-300 px-1.5 py-0.5 rounded">
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
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-2">
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
                className="rounded-lg border border-slate-700/50 p-3 text-xs text-slate-400"
                style={{ background: "#16213e" }}
              >
                <div className="font-semibold mb-1 text-slate-300">
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
            <div className="flex items-center justify-center h-64 text-slate-500">
              Valitse työ vasemmalta
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
