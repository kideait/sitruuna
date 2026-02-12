import type { Appointment } from "../types";

// Päiväindeksit: 0=Ma, 1=Ti, 2=Ke, 3=To, 4=Pe
// Johdatettu jobs.ts frequency-kentästä:
//   5x/vko = joka päivä
//   3x/vko = ma, ke, pe
//   2x/vko = ti, to
//   1x/vko = ke
//   kertaluont. = ma (tällä viikolla)

export const weeklyAppointments: Record<number, Appointment[]> = {
  // MAANANTAI (5x + 3x + kertaluontoiset)
  0: [
    // Aleksandra - toimisto
    { id: "w0-1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w0-2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
    { id: "w0-3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 10 },
    // Anne
    { id: "w0-4", employeeId: 2, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
    { id: "w0-5", employeeId: 2, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 9, duration: 2, travelTimeMinutes: 12 },
    // Annukka - teollisuus
    { id: "w0-6", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
    { id: "w0-7", employeeId: 3, clientName: "Uudisrakennus Ahlstromintie", area: "Varkaus pohjoinen", clientType: "Yksityinen", startHour: 11, duration: 4, travelTimeMinutes: 8 },
    // Arja - Leppävirta
    { id: "w0-8", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    // Eija - teollisuus
    { id: "w0-9", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w0-10", employeeId: 5, clientName: "Huruslahden uudiskohde", area: "Varkaus keskusta", clientType: "Yksityinen", startHour: 11.5, duration: 3, travelTimeMinutes: 10 },
    // Irina - Joroinen
    { id: "w0-11", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
    { id: "w0-12", employeeId: 6, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 10, duration: 1.5, travelTimeMinutes: 5 },
    // Katarina - Leppävirta
    { id: "w0-15", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w0-16", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
    // Marja - teollisuus
    { id: "w0-17", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w0-18", employeeId: 9, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Marjatta - osa-aika
    { id: "w0-19", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    // Päivi - teollisuus
    { id: "w0-27", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w0-28", employeeId: 14, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Taru
    { id: "w0-29", employeeId: 15, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
    // Tetiana - teollisuus
    { id: "w0-30", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w0-31", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Tuula - Leppävirta
    { id: "w0-32", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w0-33", employeeId: 17, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 1, travelTimeMinutes: 5 },
    { id: "w0-34", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 11, duration: 3, travelTimeMinutes: 5 },
  ],

  // TIISTAI (5x + 2x, ei 3x/vko eikä kertaluontoisia)
  1: [
    // Aleksandra
    { id: "w1-1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w1-2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
    { id: "w1-3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 10 },
    // Anne - 2x/vko työ
    { id: "w1-4", employeeId: 2, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
    // Annukka
    { id: "w1-5", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
    // Arja
    { id: "w1-6", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w1-7", employeeId: 4, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 10.5, duration: 1, travelTimeMinutes: 5 },
    // Eija
    { id: "w1-8", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Irina
    { id: "w1-9", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 8, duration: 2.5, travelTimeMinutes: 0 },
    // Katarina
    { id: "w1-12", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w1-13", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 5 },
    // Marja
    { id: "w1-14", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Marjatta
    { id: "w1-15", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    // Päivi
    { id: "w1-21", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Taru
    { id: "w1-22", employeeId: 15, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    // Tetiana
    { id: "w1-23", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w1-24", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Tuula
    { id: "w1-25", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w1-26", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
  ],

  // KESKIVIIKKO (5x + 3x + 1x/vko)
  2: [
    // Aleksandra
    { id: "w2-1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w2-2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
    { id: "w2-3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 10 },
    // Anne - 1x/vko ikkunat
    { id: "w2-4", employeeId: 2, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w2-5", employeeId: 2, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 5 },
    // Annukka
    { id: "w2-6", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
    // Arja
    { id: "w2-7", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    // Eija
    { id: "w2-8", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Irina - 3x/vko
    { id: "w2-9", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
    { id: "w2-10", employeeId: 6, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 10, duration: 1.5, travelTimeMinutes: 5 },
    // Katarina
    { id: "w2-13", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w2-14", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
    // Marja
    { id: "w2-15", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Marjatta
    { id: "w2-16", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    // Päivi
    { id: "w2-23", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Taru - 1x/vko
    { id: "w2-24", employeeId: 15, clientName: "Taloyhtiö Osmonkatu 8", area: "Varkaus pohjoinen", clientType: "Taloyhtiö", startHour: 7, duration: 1, travelTimeMinutes: 0 },
    { id: "w2-25", employeeId: 15, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 8.5, duration: 3, travelTimeMinutes: 10 },
    // Tetiana
    { id: "w2-26", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w2-27", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Tuula
    { id: "w2-28", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w2-29", employeeId: 17, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 1, travelTimeMinutes: 5 },
    { id: "w2-30", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 11, duration: 3, travelTimeMinutes: 5 },
  ],

  // TORSTAI (5x + 2x)
  3: [
    // Aleksandra
    { id: "w3-1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w3-2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
    { id: "w3-3", employeeId: 1, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 13, duration: 1.5, travelTimeMinutes: 10 },
    // Anne - 2x/vko
    { id: "w3-4", employeeId: 2, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 7, duration: 1.5, travelTimeMinutes: 0 },
    { id: "w3-5", employeeId: 2, clientName: "K-Supermarket Varkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 9, duration: 2, travelTimeMinutes: 12 },
    // Annukka
    { id: "w3-6", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
    // Arja
    { id: "w3-7", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w3-8", employeeId: 4, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 10.5, duration: 1, travelTimeMinutes: 5 },
    // Eija
    { id: "w3-9", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Irina
    { id: "w3-10", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
    // Katarina
    { id: "w3-14", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w3-15", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
    // Marja
    { id: "w3-16", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w3-17", employeeId: 9, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Marjatta
    { id: "w3-18", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    // Päivi
    { id: "w3-26", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w3-27", employeeId: 14, clientName: "Taloyhtiö Koskentie 12", area: "Varkaus etelä", clientType: "Taloyhtiö", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Taru
    { id: "w3-28", employeeId: 15, clientName: "Taloyhtiö Kauppakatu 5", area: "Varkaus keskusta", clientType: "Taloyhtiö", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    // Tetiana
    { id: "w3-29", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w3-30", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Tuula
    { id: "w3-31", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w3-32", employeeId: 17, clientName: "Leppävirran apteekki", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 1, travelTimeMinutes: 5 },
    { id: "w3-33", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 11, duration: 3, travelTimeMinutes: 5 },
  ],

  // PERJANTAI (5x + 3x, kevyempi päivä)
  4: [
    // Aleksandra
    { id: "w4-1", employeeId: 1, clientName: "Varkauden kaupungintalo", area: "Varkaus keskusta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    { id: "w4-2", employeeId: 1, clientName: "Navitas Businesspark", area: "Varkaus keskusta", clientType: "Yritys", startHour: 10.5, duration: 2, travelTimeMinutes: 8 },
    // Annukka
    { id: "w4-3", employeeId: 3, clientName: "Warkaus Works teollisuusalue", area: "Varkaus pohjoinen", clientType: "Teollisuus", startHour: 7, duration: 3.5, travelTimeMinutes: 0 },
    // Arja
    { id: "w4-4", employeeId: 4, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 3, travelTimeMinutes: 0 },
    // Eija
    { id: "w4-5", employeeId: 5, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Irina - 3x/vko
    { id: "w4-6", employeeId: 6, clientName: "Joroisten kunta / virastotalo", area: "Joroinen", clientType: "Yritys", startHour: 7, duration: 2.5, travelTimeMinutes: 0 },
    { id: "w4-7", employeeId: 6, clientName: "Joroisten S-Market", area: "Joroinen", clientType: "Yritys", startHour: 10, duration: 1.5, travelTimeMinutes: 5 },
    // Katarina
    { id: "w4-10", employeeId: 8, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w4-11", employeeId: 8, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
    // Marja
    { id: "w4-12", employeeId: 9, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Marjatta
    { id: "w4-13", employeeId: 10, clientName: "Kangaslammin koulu", area: "Kangaslampi", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    // Päivi
    { id: "w4-20", employeeId: 14, clientName: "Stora Enso tehdas", area: "Varkaus etelä", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    // Tetiana
    { id: "w4-21", employeeId: 16, clientName: "Ahlström-Munksjö tehdasalue", area: "Varkaus keskusta", clientType: "Teollisuus", startHour: 7, duration: 4, travelTimeMinutes: 0 },
    { id: "w4-22", employeeId: 16, clientName: "Kuntokeskus FitVarkaus", area: "Varkaus keskusta", clientType: "Yritys", startHour: 11.5, duration: 1.5, travelTimeMinutes: 5 },
    // Tuula
    { id: "w4-23", employeeId: 17, clientName: "S-Market Leppävirta", area: "Leppävirta", clientType: "Yritys", startHour: 7, duration: 2, travelTimeMinutes: 0 },
    { id: "w4-24", employeeId: 17, clientName: "Leppävirran terveyskeskus", area: "Leppävirta", clientType: "Yritys", startHour: 9.5, duration: 3, travelTimeMinutes: 5 },
  ],
};
