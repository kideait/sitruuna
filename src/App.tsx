import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ShiftPlanning from "./components/ShiftPlanning";
import CalendarView from "./components/Calendar";
import RoutesView from "./components/Routes";
import Savings from "./components/Savings";

type View = "dashboard" | "shifts" | "calendar" | "routes" | "savings";

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <Layout currentView={view} onNavigate={setView}>
      {view === "dashboard" && <Dashboard />}
      {view === "shifts" && <ShiftPlanning />}
      {view === "calendar" && <CalendarView />}
      {view === "routes" && <RoutesView />}
      {view === "savings" && <Savings />}
    </Layout>
  );
}
