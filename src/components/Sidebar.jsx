import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const Sidebar = ({ className }) => {
  const { darkMode } = useDarkMode();

  return (
    <nav
      className={`${darkMode ? "bg-gray-800 text-gray-300 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-200"} w-1/6 p-5 h-screen fixed top-5 lg:left-16 left-0 z-10 shadow-xl pt-[7%] border-r-[1px] transition-colors duration-300 ${className}`}
    >
      <ul className="space-y-6">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center py-3 px-4 rounded-lg hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaTachometerAlt className="mr-3 text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/user-management"
            className={`flex items-center py-3 px-4 rounded-lg hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaUsers className="mr-3 text-lg" />
            All Users
          </Link>
        </li>
        <li>
          <Link
            to="/role-management"
            className={`flex items-center py-3 px-4 rounded-lg hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaUserShield className="mr-3 text-lg" />
            Manage Roles
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
