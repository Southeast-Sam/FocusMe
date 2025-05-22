import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [themen, setThemen] = useState([]);
  const [offenesDropdown, setOffenesDropdown] = useState(null);

  // Thema mit auto gesammelter Zeit (später aus realen Sessions)
  useEffect(() => {
    const gespeicherte = JSON.parse(localStorage.getItem("sessions")) || [];

    // Gruppieren nach Thema
    const gruppiert = gespeicherte.reduce((acc, session) => {
      const name = session.thema;
      if (!acc[name]) acc[name] = 0;
      acc[name] += Number(session.dauer);
      return acc;
    }, {});

    const themaArray = Object.entries(gruppiert).map(([name, dauer]) => ({
      name,
      dauer,
    }));

    setThemen(themaArray);
  }, []);

  // toggle Dropdown
  function toggleDropdown(themaName) {
    setOffenesDropdown((prev) => (prev === themaName ? null : themaName));
  }

  // Thema löschen
  function themaloeschen(name) {
    const alleSessions = JSON.parse(localStorage.getItem("sessions")) || [];
    const gefiltert = alleSessions.filter((s) => s.thema !== name);
    localStorage.setItem("sessions", JSON.stringify(gefiltert));
    setThemen((prev) => prev.filter((t) => t.name !== name));
  }

  return (
    <div className="text-white p-6">
      {/* 🔵🟢 Farblegende für das Diagramm */}
      <div className="mb-6 flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          <span className="text-black">Theorie</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
          <span className="text-black">Praxis</span>
        </div>
      </div>

      {/* Wenn keine Themen existieren */}
      {themen.length === 0 ? (
        <p className="text-gray-400">Keine Themen vorhanden.</p>
      ) : (
        <div className="space-y-4">
          {/* Alle Themen durchgehen */}
          {themen.map((thema) => (
            <div
              key={thema.name}
              className="relative bg-gray-800 p-4 rounded shadow-md"
            >
              {/* Dropdown oben rechts im Kasten */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleDropdown(thema.name)}
                  className="bg-none text-white text-2xl mt-[-8px] w-7 cursor-pointer hover:scale-105 active:scale-95"
                >
                  ⌄
                </button>

                {offenesDropdown === thema.name && (
                  <div className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow p-2 z-10">
                    <button
                      onClick={() => themaloeschen(thema.name)}
                      className="text-white hover:text-red-200"
                    >
                      Löschen
                    </button>
                  </div>
                )}
              </div>

              {/* Inhalt in 2 Spalten (Infos links, Kreis rechts) */}
              <div className="flex justify-between items-center">
                {/* Thema + Dauer */}
                <div>
                  <Link to={`/thema/${thema.name.toLowerCase()}`}>
                    <h2 className="text-xl font-semibold cursor-pointer hover:underline">
                      {thema.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-300">
                    ⏱ Gesamtzeit: {thema.dauer} Minuten
                  </p>
                </div>

                {/* Kreisdiagramm-Box */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-xs text-black font-bold mr-6">
                  Kreis
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
