export type Skill = "ylläpito" | "teollisuus" | "loppusiivous" | "toimisto" | "ikkunat";

export type Area =
  | "Varkaus keskusta"
  | "Varkaus etelä"
  | "Varkaus pohjoinen"
  | "Leppävirta"
  | "Joroinen"
  | "Kangaslampi";

export type ClientType = "Yritys" | "Kuluttaja";

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  area: Area;
  contactPerson?: string;
  phone?: string;
  email?: string;
}

export interface Employee {
  id: number;
  name: string;
  shortName: string;
  color: string;
  contractHoursPerWeek: number;
  skills: Skill[];
  homeArea: Area;
  currentWeeklyHoursAssigned: number;
}

export interface Job {
  id: string;
  clientName: string;
  area: Area;
  clientType: "Yritys" | "Yksityinen" | "Teollisuus" | "Taloyhtiö";
  requiredSkill: Skill;
  hoursPerVisit: number;
  frequency: string;
  previousWorkerIds: number[];
  priority: "high" | "medium" | "low";
  assignedTo?: number;
}

export interface Appointment {
  id: string;
  employeeId: number;
  clientName: string;
  area: Area;
  clientType: string;
  startHour: number;
  duration: number;
  travelTimeMinutes: number;
  clientId?: string;
}

export interface ScoreBreakdown {
  skill: number;
  history: number;
  route: number;
  capacity: number;
  total: number;
}

export interface EmployeeScore {
  employee: Employee;
  score: ScoreBreakdown;
  reasons: string[];
}

export interface AISuggestion {
  icon: string;
  text: string;
  type: "info" | "warning" | "success";
}
