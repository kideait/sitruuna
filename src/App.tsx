import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ShiftPlanning from "./components/ShiftPlanning";
import CalendarView from "./components/Calendar";
import RoutesView from "./components/Routes";
import ClientsView from "./components/Clients";
import Savings from "./components/Savings";
import { clients as initialClients } from "./data/clients";
import { employees as initialEmployees } from "./data/employees";
import type { Client, Employee } from "./types";

type View = "dashboard" | "shifts" | "calendar" | "routes" | "clients" | "savings";

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [clientList, setClientList] = useState<Client[]>(initialClients);
  const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployees);

  const handleAddClient = (client: Client) => {
    setClientList((prev) => [...prev, client]);
  };

  const handleUpdateEmployee = (updated: Employee) => {
    setEmployeeList((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  return (
    <Layout currentView={view} onNavigate={setView}>
      {view === "dashboard" && <Dashboard />}
      {view === "shifts" && (
        <ShiftPlanning
          employees={employeeList}
          onUpdateEmployee={handleUpdateEmployee}
        />
      )}
      {view === "calendar" && <CalendarView clients={clientList} />}
      {view === "routes" && <RoutesView />}
      {view === "clients" && <ClientsView clients={clientList} onAddClient={handleAddClient} />}
      {view === "savings" && <Savings />}
    </Layout>
  );
}
