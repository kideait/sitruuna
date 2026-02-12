import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ShiftPlanning from "./components/ShiftPlanning";
import CalendarView from "./components/Calendar";
import RoutesView from "./components/Routes";
import ClientsView from "./components/Clients";
import Savings from "./components/Savings";
import { clients as initialClients } from "./data/clients";
import type { Client } from "./types";

type View = "dashboard" | "shifts" | "calendar" | "routes" | "clients" | "savings";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [clientList, setClientList] = useState<Client[]>(initialClients);

  const handleAddClient = (client: Client) => {
    setClientList((prev) => [...prev, client]);
  };

  return (
    <Layout currentView={view} onNavigate={setView}>
      {view === "dashboard" && <Dashboard />}
      {view === "shifts" && <ShiftPlanning />}
      {view === "calendar" && <CalendarView clients={clientList} />}
      {view === "routes" && <RoutesView />}
      {view === "clients" && <ClientsView clients={clientList} onAddClient={handleAddClient} />}
      {view === "savings" && <Savings />}
    </Layout>
  );
}
