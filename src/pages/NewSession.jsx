import { useState } from "react";

// Vorschlagsdatenbank
const vorschlagsDatenbank = {
  javascript: [
    "Erstelle eine Funktion mit Array.map()",
    "Schreibe eine kleine Filter-Funktion",
    "Baue eine Mini-To-Do Liste",
  ],
  html: [
    "Baue ein Formular mit Input + Button",
    "Verwende verschiedene HTML-Tags",
    "Strukturiere eine kleine Webseite mit Semantik",
  ],
  css: [
    "Baue ein Grid-Layout",
    "Verwende verschiedene HTML-Tags",
    "Verwende Tailwind Utilities für Abstände",
  ],
};

function NewSession() {
  const [thema, setThema] = useState(""); // Eingabetext
  const [vorschlaege, setVorschlaege] = useState([]); // Automatische Vorschläge
  const [ausgewaehlteAufgabe, setAusgewaehlteAufgabe] = useState(""); // Was final gespeichert wird

  // Analyse der Eingabe & Vorschläge generieren
  const handleInputChange = (e) => {
    const value = e.target.value;
    setThema(value);

    const key = value.toLowerCase().split(" ")[0];
    if (value.length > 2 && vorschlagsDatenbank[key]) {
      setVorschlaege(vorschlagsDatenbank[key]);
    } else {
      setVorschlaege([]);
    }

    // Wenn Nutzer neu tippt → Auswahl zurücksetzen
    setAusgewaehlteAufgabe("");
  };

  // Formular absenden
  const handleSubmit = (e) => {
    e.preventDefault();

    const finaleAufgabe = ausgewaehlteAufgabe || thema;

    if (!thema.trim()) {
      alert("Bitte ein Thema eingeben!");
      return;
    }

    if (!finaleAufgabe.trim()) {
      alert("Bitte eine Aufgabe auswählen oder eintippen!");
      return;
    }

    // Session speichern
    const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.push({
      thema: thema.trim(),
      aufgabe: finaleAufgabe.trim(),
      dauer: 0, // Timer kommt später
    });

    localStorage.setItem("sessions", JSON.stringify(sessions));
    console.log("Gespeichert:", thema, finaleAufgabe);

    // Feedback
    alert(`${thema} wurde hinzugefügt✅`);

    // Zurücksetzen
    setThema("");
    setVorschlaege([]);
    setAusgewaehlteAufgabe("");
  };

  return (
    <div className="text-white max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Neue Session</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block mb-1">Aufgabe oder Thema eingeben</label>
          <input
            type="text"
            value={thema}
            onChange={handleInputChange}
            placeholder="Neue Thema..."
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Starten
        </button>
      </form>

      {ausgewaehlteAufgabe && (
        <p className="mt-4 text-sm text-gray-400">
          Ausgewählt:{" "}
          <span className="font-semibold">{ausgewaehlteAufgabe}</span>
        </p>
      )}

      {vorschlaege.length > 0 && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Vorschläge</h3>
          <ul className="space-y-2">
            {vorschlaege.map((v, index) => (
              <li
                key={index}
                onClick={() => setAusgewaehlteAufgabe(v)}
                className={`px-3 py-2 rounded cursor-pointer transition-colors ${
                  ausgewaehlteAufgabe === v
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NewSession;
