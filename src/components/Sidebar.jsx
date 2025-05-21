import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-25 border-b-3 border-white pb-3">
        FocusMe
      </h1>

      {/* Seiten-Links */}
      <nav className="flex flex-col space-y-4">
        {/* isActive kommt von react-router-dom, von NavLink */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/neu"
          className={({ isActive }) =>
            `hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          Neue Session
        </NavLink>

        <NavLink
          to="/verlauf"
          className={({ isActive }) =>
            `hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          Verlauf
        </NavLink>
      </nav>

      {/* ⚙️ Einstellungen ganz unten */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <NavLink
          to="/einstellungen"
          className={({ isActive }) =>
            `hover:text-blue-400 transition-colors ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          ⚙️ Einstellungen
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
