import type { Employee, Job, EmployeeScore } from "../types";
import { neighborMap } from "../data/areas";

export function scoreAssignment(employee: Employee, job: Job): EmployeeScore {
  const reasons: string[] = [];

  // Osaaminen (max 30)
  let skill = 0;
  if (employee.skills.includes(job.requiredSkill)) {
    skill = 30;
    reasons.push(`Osaaminen: ${job.requiredSkill}`);
  } else {
    reasons.push(`Ei osaamista: ${job.requiredSkill}`);
  }

  // Asiakashistoria (max 25)
  let history = 0;
  if (job.previousWorkerIds.includes(employee.id)) {
    history = 25;
    reasons.push("Tuttu asiakas");
  }

  // Reittiläheisyys (max 25)
  let route = 0;
  if (employee.homeArea === job.area) {
    route = 25;
    reasons.push("Sama alue");
  } else if (neighborMap[employee.homeArea]?.includes(job.area)) {
    route = 12;
    reasons.push("Naapurialue");
  } else {
    reasons.push("Kaukana");
  }

  // Sopimustunnit (max 20)
  let capacity = 0;
  const usagePercent = employee.currentWeeklyHoursAssigned / employee.contractHoursPerWeek;
  if (usagePercent < 0.4) {
    capacity = 20;
    reasons.push("Paljon tilaa tunneissa");
  } else if (usagePercent < 0.7) {
    capacity = 10;
    reasons.push("Kohtalaisesti tilaa");
  } else if (usagePercent < 1.0) {
    capacity = 5;
    reasons.push("Vähän tilaa");
  } else {
    reasons.push("Tunnit täynnä");
  }

  const total = skill + history + route + capacity;

  return {
    employee,
    score: { skill, history, route, capacity, total },
    reasons,
  };
}

export function rankEmployeesForJob(employees: Employee[], job: Job): EmployeeScore[] {
  return employees
    .map((emp) => scoreAssignment(emp, job))
    .sort((a, b) => b.score.total - a.score.total);
}
