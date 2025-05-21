import { useState, useEffect } from "react";

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  // Beim Laden des Dashboards localStorage lesen
  useEffect(() => {
    const gespeicherte = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(gespeicherte);
  }, []);
  // Auswertung
  // Anzahl
  const anzahl = sessions.length;

  // Typ-Auswertung
  const theorieAnzahl = sessions.filter((s) => s.typ === "theorie").length;
  const praxisAnzahl = sessions.filter((s) => s.typ === "praxis").length;

  // Gesamtzeit
  const gesamtMinuten = sessions.reduce((summe, s) => {
    return summe + Number(s.dauer);
  }, 0);

  // Session löschen
  function sessionLoeschen(id) {
    // Aus dem State entfernen
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);

    // localStorage aktualisieren
    localStorage.setItem("sessions", JSON.stringify(updated));
  }

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* ✅ Zusammenfassung */}
      <div className="mb-6 p-4 bg-gray-800 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Zusammenfassung</h2>
        <p>
          Gesamt-Sessions: <span className="font-bold">{anzahl}</span>
        </p>
        <p>
          Theorie: <span className="text-blue-400">{theorieAnzahl}</span>
        </p>
        <p>
          Praxis: <span className="text-green-400">{praxisAnzahl}</span>
        </p>
        <p>
          ⏱ Gesamtzeit: <span className="text-yellow-400">{gesamtMinuten}</span>{" "}
          Minuten
        </p>
      </div>

      {/* Session-Liste */}
      {sessions.length === 0 ? (
        <p className="text-gray-400">Noch keine Sessions gespeichert.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-800 p-4 rounded shadow-md border-l-6 border-blue-400"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{session.thema}</h2>
                  <p>Typ: {session.typ}</p>
                  <p>Dauer: {session.dauer} Minuten</p>
                </div>

                {/* Löschen Button */}
                <button
                  onClick={() => sessionLoeschen(session.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg ml-4 cursor-pointer transition-transform hover:scale-105"
                  title="löschen"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
