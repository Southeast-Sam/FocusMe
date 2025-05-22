import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Plus, History, Settings } from "lucide-react";
import Logo from "../assets/Logo.jpeg";
function Sidebar() {
  return (
    <div className="h-screen group overflow-hidden bg-gray-900 text-white flex flex-col duration-300 ease-in-out w-16 hover:w-64 p-4">
      <div className="flex items-center gap-2 mb-6">
        <img
          src={Logo}
          alt="FocusMe"
          className="w-8 h-8 object-contain shrink-0 rounded-lg"
        />
        <h1 className="text-2xl font-bold text-white whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-1">
          FocusMe
        </h1>
      </div>
      {/* Seiten-Links */}
      <nav className="flex-1 flex flex-col space-y-4 justify-center pb-48">
        {/* isActive kommt von react-router-dom, von NavLink */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-x-3 hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          <Home className="w-6 h-6 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Dashboard
          </span>
        </NavLink>
        <NavLink
          to="/neu"
          className={({ isActive }) =>
            `flex items-center gap-x-3 hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          <Plus className="w-6 h-6 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Neue Session
          </span>
        </NavLink>
        <NavLink
          to="/verlauf"
          className={({ isActive }) =>
            `flex items-center gap-x-3 hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          <History className="w-6 h-6 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Verlauf
          </span>
        </NavLink>
      </nav>
      {/* ⚙️ Einstellungen ganz unten */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <NavLink
          to="/einstellungen"
          className={({ isActive }) =>
            `flex items-center gap-x-3 hover:text-blue-400 transition-colors mt-4 ${
              isActive
                ? "text-white font-bold border-l-4 border-white pl-2"
                : "text-gray-300"
            }`
          }
        >
          <Settings className="w-6 h-6 flex-shrink-0" />
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:ml-2">
            Einstellungen
          </span>
        </NavLink>
      </div>
    </div>
  );
}
export default Sidebar;
