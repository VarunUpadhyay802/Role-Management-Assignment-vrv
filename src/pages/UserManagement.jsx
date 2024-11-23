import React, { useState } from "react";
import { FaUserEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import Modal from "../components/UserModal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUserStatus } from '../slices/Userslice';
import { Line, Doughnut } from "react-chartjs-2";
import { useDarkMode } from "../context/DarkModeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement 
);

function UserManagement() {
  const users = useSelector((state) => state.users.users); 
  const dispatch = useDispatch(); 
  const [modalOpen, setModalOpen] = useState(false);
  const { darkMode } = useDarkMode();

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateUserStatus({ id, status }));
  };

  const roles = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Active Users",
        data: [20, 30, 40, 35, 50],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Inactive Users",
        data: [10, 15, 20, 25, 20],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(roles),
    datasets: [
      {
        data: Object.values(roles),
        backgroundColor: ["rgb(37, 99, 235)", "rgb(255, 99, 132)"],
      },
    ],
  };

  // Add a placeholder logo and message if no users are present
  const placeholderDoughnutData = {
    labels: ["No Users"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["rgb(200, 200, 200)"], // Light grey color for empty
      },
    ],
  };

  return (
    <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"} h-screen flex pt-16 overflow-auto justify-end w-full md:w-5/6`}>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`h-16 flex items-center px-6 justify-between shadow-md ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
            }`}
        >
          <h1 className="text-lg lg:text-xl font-semibold">Manage Users</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 text-gray-100 px-6 py-2 flex rounded-lg text-sm shadow-md hover:bg-indigo-700 transition"
            >
              <FaUserPlus className="inline mr-2 text-lg" />
              <span className="hidden lg:block">Add</span>
            </button>
          </div>
        </header>

        <main className="px-3 md:px-6 py-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4">User Activity Trend</h3>
              <Line data={lineData} options={{ responsive: true }} />
            </div>
            <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4">User Roles Distribution</h3>
              <div className="w-full flex justify-center">
              <div style={{ width: "70%", height: "70%" }}>
                <Doughnut data={users.length === 0 ? placeholderDoughnutData : doughnutData} options={{ responsive: true }} />
              </div>
              </div>
            </div>
          </div>

          <div className={`shadow-sm rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <table className="w-full table-auto text-xs sm:text-sm md:text-sm">
              <thead className={`${darkMode ? "bg-gray-800 text-gray-200" : "bg-indigo-100 text-gray-700"}`}>
                <tr>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-sm sm:font-sm border-b-4">Name</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-sm sm:font-sm border-b-4">Role</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-sm sm:font-sm border-b-4">Status</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-sm sm:font-sm border-b-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-sm sm:text-base font-semibold text-gray-500">
                      No Users Available
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className={`transition duration-200 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                      <td className="px-2 sm:px-6 py-4">{user.name}</td>
                      <td className="px-2 sm:px-6 py-4">{user.role}</td>
                      <td className="px-2 sm:px-6 py-4">
                        <button
                          onClick={() => handleStatusChange(user.id, user.status === "Active" ? "Inactive" : "Active")}
                          className={`text-sm px-3 py-1 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"} text-white`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800 transition">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
        </main>
      </div>
    </div>
  );
}

export default UserManagement;
