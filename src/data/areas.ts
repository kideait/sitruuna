import type { Area } from "../types";

export const areas: Area[] = [
  "Varkaus keskusta",
  "Varkaus etelä",
  "Varkaus pohjoinen",
  "Leppävirta",
  "Joroinen",
  "Kangaslampi",
];

export const neighborMap: Record<Area, Area[]> = {
  "Varkaus keskusta": ["Varkaus etelä", "Varkaus pohjoinen"],
  "Varkaus etelä": ["Varkaus keskusta", "Leppävirta"],
  "Varkaus pohjoinen": ["Varkaus keskusta", "Kangaslampi"],
  "Leppävirta": ["Varkaus etelä", "Kangaslampi"],
  "Joroinen": ["Varkaus pohjoinen", "Kangaslampi"],
  "Kangaslampi": ["Varkaus pohjoinen", "Joroinen", "Leppävirta"],
};

export const travelTimes: Record<string, number> = {
  "Varkaus keskusta|Varkaus keskusta": 5,
  "Varkaus keskusta|Varkaus etelä": 12,
  "Varkaus keskusta|Varkaus pohjoinen": 10,
  "Varkaus keskusta|Leppävirta": 25,
  "Varkaus keskusta|Joroinen": 30,
  "Varkaus keskusta|Kangaslampi": 20,
  "Varkaus etelä|Varkaus etelä": 5,
  "Varkaus etelä|Varkaus keskusta": 12,
  "Varkaus etelä|Varkaus pohjoinen": 18,
  "Varkaus etelä|Leppävirta": 15,
  "Varkaus etelä|Joroinen": 35,
  "Varkaus etelä|Kangaslampi": 25,
  "Varkaus pohjoinen|Varkaus pohjoinen": 5,
  "Varkaus pohjoinen|Varkaus keskusta": 10,
  "Varkaus pohjoinen|Varkaus etelä": 18,
  "Varkaus pohjoinen|Leppävirta": 28,
  "Varkaus pohjoinen|Joroinen": 20,
  "Varkaus pohjoinen|Kangaslampi": 15,
  "Leppävirta|Leppävirta": 5,
  "Leppävirta|Varkaus keskusta": 25,
  "Leppävirta|Varkaus etelä": 15,
  "Leppävirta|Varkaus pohjoinen": 28,
  "Leppävirta|Joroinen": 35,
  "Leppävirta|Kangaslampi": 18,
  "Joroinen|Joroinen": 5,
  "Joroinen|Varkaus keskusta": 30,
  "Joroinen|Varkaus etelä": 35,
  "Joroinen|Varkaus pohjoinen": 20,
  "Joroinen|Leppävirta": 35,
  "Joroinen|Kangaslampi": 15,
  "Kangaslampi|Kangaslampi": 5,
  "Kangaslampi|Varkaus keskusta": 20,
  "Kangaslampi|Varkaus etelä": 25,
  "Kangaslampi|Varkaus pohjoinen": 15,
  "Kangaslampi|Leppävirta": 18,
  "Kangaslampi|Joroinen": 15,
};

export function getTravelTime(from: Area, to: Area): number {
  return travelTimes[`${from}|${to}`] ?? 30;
}
