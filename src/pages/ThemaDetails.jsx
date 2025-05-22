import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function ThemaDetail() {
  const { name } = useParams();
  const [aktiv, setAktiv] = useState("übersicht"); // Tab: übersicht, theorie, praxis
  const [zeit, setZeit] = useState(0); // Gesamtzeit
  const [theorieZeit, setTheorieZeit] = useState(0);
  const [praxisZeit, setPraxisZeit] = useState(0);
  // Timer startet beim Betreten
  useEffect(() => {
    const id = setInterval(() => {
      setZeit((prev) => prev + 1);
      if (aktiv === "theorie") {
        setTheorieZeit((prev) => prev + 1);
      } else if (aktiv === "praxis") {
        setPraxisZeit((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [aktiv]); // neu starten, wenn Tab sich ändert
  const formatTime = (sekunden) => {
    const stunden = Math.floor(sekunden / 3600);
    const minuten = Math.floor((sekunden % 3600) / 60);
    return stunden > 0
      ? `${stunden.toString().padStart(2, "0")}:${minuten
          .toString()
          .padStart(2, "0")} Std`
      : `${minuten.toString().padStart(2, "0")} Min`;
  };
  return (
    <div className=" text-white -mt-12 pr-4 pl-4">
      {/* Thema-Name */}
      <h1 className="text-2xl font-bold mb-4 capitalize">{name}</h1>
      {/* Tabs oben */}
      <div className="flex">
        {["übersicht", "theorie", "praxis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setAktiv(tab)}
            className={`py-1 px-8 rounded-t-md capitalize transition-all duration-300 ${
              aktiv === tab
                ? "bg-gray-800 text-white shadow-md"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Inhalt */}
      <div className="bg-gray-800 p-6 rounded-b-md shadow-md min-h-[550px]">
        {aktiv === "übersicht" && (
          <div>
            <div className="w-full h-90 bg-gray-700 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Diagramm hier (später)
            </div>
            <p className="text-lg mb-2 text-white">
              ⏱ Gesamt: {formatTime(zeit)}
            </p>
            <p className="text-blue-400 italic mt-18">
              „Bleib dran – Fortschritt kommt durch Wiederholung.“
            </p>
          </div>
        )}
        {aktiv === "theorie" && (
          <div>
            <p className="text-lg mb-2">
              Theoriezeit: {formatTime(theorieZeit)}
            </p>
            <p className="text-gray-300">
              Hier kannst du Theorie-Übungen machen...
            </p>
          </div>
        )}
        {aktiv === "praxis" && (
          <div>
            <p className="text-lg mb-2">Praxiszeit: {formatTime(praxisZeit)}</p>
            <p className="text-gray-300">Hier kommen praktische Aufgaben...</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ThemaDetail;
