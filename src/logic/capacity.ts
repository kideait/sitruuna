import type { Employee, Appointment } from "../types";

export function calculateWeeklyHours(
  employee: Employee,
  appointments: Appointment[]
): number {
  return appointments
    .filter((a) => a.employeeId === employee.id)
    .reduce((sum, a) => sum + a.duration, 0);
}

export function getCapacityPercent(assigned: number, contract: number): number {
  if (contract === 0) return 100;
  return Math.min(100, Math.round((assigned / contract) * 100));
}

export function getCapacityColor(percent: number): string {
  if (percent < 40) return "#4ade80";
  if (percent < 70) return "#facc15";
  if (percent < 90) return "#f97316";
  return "#ef4444";
}
