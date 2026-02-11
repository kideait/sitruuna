import type { Employee, Job } from "../types";
import { rankEmployeesForJob } from "./scoring";

export function autoAssignAll(
  jobs: Job[],
  employees: Employee[]
): Job[] {
  const empCopy = employees.map((e) => ({ ...e }));
  const jobsCopy = jobs.map((j) => ({ ...j }));

  // Sort jobs by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...jobsCopy].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  for (const job of sorted) {
    const ranked = rankEmployeesForJob(empCopy, job);
    const best = ranked[0];
    if (best && best.score.total > 0) {
      job.assignedTo = best.employee.id;
      // Update hours for the assigned employee
      const emp = empCopy.find((e) => e.id === best.employee.id);
      if (emp) {
        emp.currentWeeklyHoursAssigned += job.hoursPerVisit;
      }
    }
  }

  // Map back assignments to original order
  return jobsCopy.map((jc) => {
    const assigned = sorted.find((s) => s.id === jc.id);
    return { ...jc, assignedTo: assigned?.assignedTo };
  });
}
