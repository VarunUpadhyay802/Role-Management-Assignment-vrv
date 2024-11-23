import React, { useState } from "react";
import { FaUserPlus, FaRegTimesCircle } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { addUser } from "../slices/Userslice";
import { useDispatch } from "react-redux";

function Modal({ closeModal }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active"); 

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  const handleSave = () => {
    if (name && role && status) {
      const newUser = { id: Date.now(), name, role, status, created : formatDate(Date.now()) };
      dispatch(addUser(newUser));
      closeModal();
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[10000] transition-opacity duration-300 opacity-100 ${
        darkMode ? "bg-gray-900 bg-opacity-70" : "bg-gray-900 bg-opacity-50"
      }`}
    >
      <div
        className={`rounded-lg shadow-lg max-w-lg w-full p-8 transform transition-all duration-300 translate-y-8 scale-95 animate-modal-open ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3
            className={`text-2xl font-semibold flex items-center ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <FaUserPlus
              className={`mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
            />
            Add New User
          </h3>
          <button
            onClick={closeModal}
            className={`transition duration-200 ${
              darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FaRegTimesCircle size={24} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-indigo-400"
              : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-indigo-400"
              : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 focus:ring-indigo-400"
              : "bg-white text-gray-800 border-gray-300 focus:ring-indigo-500"
          }`}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className={`px-6 py-2 rounded-lg flex items-center transition duration-200 ${
              darkMode
                ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            <FaRegTimesCircle className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg flex items-center transition duration-200 ${
              darkMode
                ? "bg-indigo-500 text-gray-100 hover:bg-indigo-400"
                : "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
            }`}
          >
            <FaUserPlus className="mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
