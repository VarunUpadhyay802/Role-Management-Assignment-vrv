import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useDarkMode } from "./context/DarkModeContext";
import BottomSidebar from "./components/Bottombar";

const App = () => {
  const { darkMode } = useDarkMode();

  return (
    <Router>
      <div
        className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"}`}
      >
        <Sidebar className="hidden lg:block" /> 
        <div className="flex-1 flex flex-col ml-0 lg:ml-1/6">
          <Header />
          <div
            className={`flex pt-6 pb-14 px-1 sm:px-4 lg:px-28 ${darkMode && "bg-gray-800"} w-full justify-center lg:justify-end`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/role-management" element={<RoleManagement />} />
            </Routes>
          </div>
        </div>
        <BottomSidebar className="block lg:hidden"/>
      </div>
    </Router>
  );
};

export default App;
