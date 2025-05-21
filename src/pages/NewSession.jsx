import { useState } from "react";

function NewSession() {
  const [formData, setFormData] = useState({
    thema: "",
    typ: "theorie",
    dauer: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.thema || !formData.dauer) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }
    console.log("Sessions wurde gespeichert:", formData);

    // Alte Sessions aus localStorage holen
    const gespeicherteSessions =
      JSON.parse(localStorage.getItem("sessions")) || [];

    // Neue Session hinzufügen
    const neueSession = {
      id: Date.now(),
      ...formData,
    };

    const updatedSessions = [...gespeicherteSessions, neueSession];

    // Zurück in localStorage speichern
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));

    // Feedback
    console.log("Session gespeichert:", neueSession);
    alert(`${formData.thema} wurde gespeichert! ✅`);

    // Formular zurücksetzen
    setFormData({
      thema: "",
      typ: "theorie",
      dauer: "",
    });
  }

  return (
    <div className="text-white max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Neu Session</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Thema */}
        <div>
          <label className="block mb-1">Was hast du gelernt?</label>
          <input
            type="text"
            name="thema"
            value={formData.thema}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="Neue Thema..."
          />
        </div>

        {/* Typ */}
        <div>
          <label className="block mb-1">Typ</label>
          <select
            name="typ"
            value={formData.typ}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="theorie">Theorie</option>
            <option value="praxis">Praxis</option>
          </select>
        </div>

        {/* Dauer */}
        <div>
          <label className="block mb-1">Dauer (in Minuten)</label>
          <input
            type="number"
            name="dauer"
            value={formData.dauer}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="45"
          />
        </div>

        {/* Speichern Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Speichern
        </button>
      </form>
    </div>
  );
}

export default NewSession;
