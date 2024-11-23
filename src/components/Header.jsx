import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-4 md:px-8 shadow-md text-gray-700 dark:text-gray-300 fixed top-0 left-0 right-0 lg:left-16 lg:right-16 z-20 border-b-[1px] border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-100">VRV Security</h1>
        <div className="flex items-center lg:space-x-6">
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300 bg-transparent p-2 rounded-full hover:bg-indigo-700 hover:text-gray-100 transition duration-200"
          >
            {darkMode ? (
              <BsFillSunFill className="text-xl text-yellow-300" />
            ) : (
              <BsFillMoonStarsFill className="text-xl" />
            )}
          </button>
          <button className="text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 dark:text-gray-100 hover:text-gray-100 transition duration-200 flex items-center space-x-2">
            <AiOutlineLogout className="text-base lg:text-lg" />
            <span className="text-sm lg:text-base" >Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
