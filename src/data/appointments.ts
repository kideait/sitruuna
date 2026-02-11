import type { Appointment } from "../types";

export const currentAppointments: Appointment[] = [
  // Aleksandra - toimisto
  { id: "a1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
  { id: "a2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
  { id: "a3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 10 },
  // Anne N
  { id: "a4", employeeId: 2, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
  { id: "a5", employeeId: 2, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 9, duration: 2, travelTimeMinutes: 12 },
  { id: "a6", employeeId: 2, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 11.5, duration: 3, travelTimeMinutes: 5 },
  // Annukka - teollisuus
  { id: "a7", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
  { id: "a8", employeeId: 3, clientName: "Uudisrakennus Ahlstromintie", area: "Varkaus pohjoinen", clientType: "Yksityinen", startHour: 11, duration: 4, travelTimeMinutes: 8 },
  // Arja - Leppävirta
  { id: "a9", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
  { id: "a10", employeeId: 4, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 10.5, duration: 1, travelTimeMinutes: 5 },
  // Eija - teollisuus + ylläpito
  { id: "a11", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "a12", employeeId: 5, clientName: "Huruslahden uudiskohde", area: "Varkaus keskusta", clientType: "Yksityinen", startHour: 11.5, duration: 3, travelTimeMinutes: 10 },
  // Irina - Joroinen
  { id: "a13", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
  { id: "a14", employeeId: 6, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 10, duration: 1.5, travelTimeMinutes: 5 },
  // Johanna
  { id: "a15", employeeId: 7, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "a16", employeeId: 7, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
  { id: "a17", employeeId: 7, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 8 },
  // Katariina - Leppävirta
  { id: "a18", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "a19", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
  // Marja J - teollisuus
  { id: "a20", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "a21", employeeId: 9, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
  // Marjatta - osa-aika
  { id: "a22", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  // Martina
  { id: "a23", employeeId: 11, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
  { id: "a24", employeeId: 11, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 8.5, duration: 2, travelTimeMinutes: 10 },
  { id: "a25", employeeId: 11, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 11, duration: 3.5, travelTimeMinutes: 10 },
  // Mervi
  { id: "a26", employeeId: 12, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
  { id: "a27", employeeId: 12, clientName: "Huruslahden uudiskohde", area: "Varkaus keskusta", clientType: "Yksityinen", startHour: 9, duration: 3, travelTimeMinutes: 8 },
  { id: "a28", employeeId: 12, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 12.5, duration: 2, travelTimeMinutes: 5 },
  // Minna - osa-aika Joroinen
  { id: "a29", employeeId: 13, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
  { id: "a30", employeeId: 13, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 10, duration: 1.5, travelTimeMinutes: 5 },
  // Päivi - teollisuus
  { id: "a31", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "a32", employeeId: 14, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
  // Taru
  { id: "a33", employeeId: 15, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
  { id: "a34", employeeId: 15, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 8.5, duration: 3, travelTimeMinutes: 10 },
  // Tetiana - teollisuus
  { id: "a35", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "a36", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
  // Tuula - Leppävirta
  { id: "a37", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "a38", employeeId: 17, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 1, travelTimeMinutes: 5 },
  { id: "a39", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 11, duration: 3, travelTimeMinutes: 5 },
];

// AI-optimoitu versio: vähemmän siirtymäaikaa, parempi reittijärjestys
export const optimizedAppointments: Appointment[] = [
  // Aleksandra - keskusta kaikki peräkkäin
  { id: "o1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
  { id: "o2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10, duration: 2, travelTimeMinutes: 5 },
  { id: "o3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 12, duration: 1.5, travelTimeMinutes: 5 },
  // Anne N - etelä ensin, sitten keskusta
  { id: "o4", employeeId: 2, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
  { id: "o5", employeeId: 2, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 9, duration: 2, travelTimeMinutes: 10 },
  { id: "o6", employeeId: 2, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 11, duration: 3, travelTimeMinutes: 3 },
  // Annukka - pohjoinen kaikki
  { id: "o7", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
  { id: "o8", employeeId: 3, clientName: "Uudisrakennus Ahlstromintie", area: "Varkaus pohjoinen", clientType: "Yksityinen", startHour: 10.5, duration: 4, travelTimeMinutes: 5 },
  // Arja - Leppävirta kaikki peräkkäin
  { id: "o9", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
  { id: "o10", employeeId: 4, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 10, duration: 1, travelTimeMinutes: 3 },
  // Eija - keskusta
  { id: "o11", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "o12", employeeId: 5, clientName: "Huruslahden uudiskohde", area: "Varkaus keskusta", clientType: "Yksityinen", startHour: 11, duration: 3, travelTimeMinutes: 5 },
  // Irina - Joroinen
  { id: "o13", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
  { id: "o14", employeeId: 6, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 9.5, duration: 1.5, travelTimeMinutes: 3 },
  // Johanna - keskusta
  { id: "o15", employeeId: 7, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "o16", employeeId: 7, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 9, duration: 3, travelTimeMinutes: 3 },
  { id: "o17", employeeId: 7, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 12, duration: 1.5, travelTimeMinutes: 3 },
  // Katariina - Leppävirta
  { id: "o18", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "o19", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9, duration: 3, travelTimeMinutes: 3 },
  // Marja J - etelä
  { id: "o20", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "o21", employeeId: 9, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11, duration: 1.5, travelTimeMinutes: 3 },
  // Marjatta - Kangaslampi
  { id: "o22", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  // Martina - pohjoinen ensin, sitten keskusta, sitten takaisin
  { id: "o23", employeeId: 11, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
  { id: "o24", employeeId: 11, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 8, duration: 3.5, travelTimeMinutes: 3 },
  { id: "o25", employeeId: 11, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 12, duration: 2, travelTimeMinutes: 10 },
  // Mervi - keskusta
  { id: "o26", employeeId: 12, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
  { id: "o27", employeeId: 12, clientName: "Huruslahden uudiskohde", area: "Varkaus keskusta", clientType: "Yksityinen", startHour: 8.5, duration: 3, travelTimeMinutes: 3 },
  { id: "o28", employeeId: 12, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 2, travelTimeMinutes: 3 },
  // Minna - Joroinen
  { id: "o29", employeeId: 13, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
  { id: "o30", employeeId: 13, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 9.5, duration: 1.5, travelTimeMinutes: 3 },
  // Päivi - etelä
  { id: "o31", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "o32", employeeId: 14, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11, duration: 1.5, travelTimeMinutes: 3 },
  // Taru - pohjoinen + keskusta
  { id: "o33", employeeId: 15, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
  { id: "o34", employeeId: 15, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 8, duration: 3, travelTimeMinutes: 8 },
  // Tetiana - keskusta
  { id: "o35", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
  { id: "o36", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11, duration: 1.5, travelTimeMinutes: 3 },
  // Tuula - Leppävirta kaikki
  { id: "o37", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
  { id: "o38", employeeId: 17, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 9, duration: 1, travelTimeMinutes: 3 },
  { id: "o39", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 10, duration: 3, travelTimeMinutes: 3 },
];
