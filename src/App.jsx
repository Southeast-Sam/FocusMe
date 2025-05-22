import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewSession from "./pages/NewSession";
import History from "./pages/History";
import Settings from "./pages/Settings";
import ThemaDetails from "./pages/ThemaDetails";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Mach App routingsfähig */}
      <Routes>
        {/* Root-Layout mit Sidebar + Seiten */}
        <Route path="/" element={<Layout />}>
          {/* index zeigt Dashboard an, wenn man / aufruft */}
          <Route index element={<Dashboard />} />{" "}
          {/* /neu zeigt die Seite NewSession */}
          <Route path="neu" element={<NewSession />} />{" "}
          {/* /verlauf zeigt die Seite History */}
          <Route path="verlauf" element={<History />} />{" "}
          {/* /einstellungen zeigt die Seite Einstellungen */}
          <Route path="einstellungen" element={<Settings />} />
          {/* thema/ ist der Start der URL, :name ist ein Platzhalter für ein beliebiges Thema */}
          <Route path="thema/:name" element={<ThemaDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
