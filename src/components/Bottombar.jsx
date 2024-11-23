import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const BottomSidebar = ({ className }) => {
  const { darkMode } = useDarkMode();

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-gray-300 border-gray-600" : "bg-gray-200 text-gray-700 border-gray-200"
      } w-full p-3 h-auto fixed bottom-0 left-0 z-10 shadow-2xl border-t-[1px] transition-colors duration-300 ${className}`}
    >
      <ul className="flex justify-around">
        <li>
          <Link
            to="/dashboard"
            className={`flex justify-center items-center py-2 px-4 rounded-full hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaTachometerAlt className="text-xl" />
          </Link>
        </li>
        <li>
          <Link
            to="/user-management"
            className={`flex justify-center items-center py-2 px-4 rounded-full hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaUsers className="text-xl" />
          </Link>
        </li>
        <li>
          <Link
            to="/role-management"
            className={`flex justify-center items-center py-2 px-4 rounded-full hover:bg-indigo-600 ${darkMode ? "hover:text-gray-200" : "hover:text-gray-100"} transition duration-200`}
          >
            <FaUserShield className="text-xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomSidebar;
