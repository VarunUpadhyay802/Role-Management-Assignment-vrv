import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import { FaEllipsisH } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { useSelector } from "react-redux";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const { users } = useSelector((state) => state.users);
  const { darkMode } = useDarkMode();

  const lineData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Revenue",
        data: [45, 60, 75, 95],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "New Users",
        data: [30, 50, 75, 100],
        backgroundColor: "rgb(53, 162, 235)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Inactive Users",
        data: [20, 40, 55, 65],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales and Revenue",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} units`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`h-screen flex pt-16 overflow-auto justify-end w-full lg:w-5/6 ${darkMode ? "bg-gray-800 text-gray-200" : " text-gray-900"
        }`}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`h-16 flex items-center px-4 sm:px-6 md:px-8 justify-between ${darkMode ? "bg-gray-900 shadow-sm text-gray-200" : "bg-gray-50 shadow-sm text-gray-600"
            }`}
        >
          <h1 className="text-lg sm:text-xl md:text-xl font-semibold">Dashboard</h1>
        </header>

        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div
              className={`p-4 sm:p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-600"
                }`}
            >
              <h3 className="text-lg sm:text-lg font-semibold mb-3 sm:mb-4">User Growth</h3>
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div
              className={`p-4 sm:p-6 rounded-lg shadow-sm ${darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-600"
                }`}
            >
              <h3 className="text-lg sm:text-lg font-semibold mb-3 sm:mb-4">Active Users</h3>
              <Line data={lineData} options={options} />
            </div>
          </div>
          <div
            className={`shadow-sm rounded-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"
              }`}
          >
            <table className="w-full table-auto text-xs sm:text-sm md:text-sm">
              <thead
                className={`${darkMode ? "bg-gray-800 text-gray-200" : "bg-indigo-100 text-gray-700"
                  }`}
              >
                <tr>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left border-b-4">Username</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left border-b-4">Role</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left border-b-4">Status</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left border-b-4">Created</th>
                  <th className="px-2 sm:px-6 py-2 sm:py-4 text-left border-b-4">Actions</th>
                </tr>
              </thead>
              <tbody >
                {users.length == 0 ? (
                  <td colSpan="4" className="text-center py-6 text-sm sm:text-base font-semibold text-gray-500">
                    No Users Available
                  </td>
                ) : (
                  users.map((user => (
                    <tr className={`transition duration-200 ${darkMode
                      ? "hover:bg-gray-700 border-b border-gray-600"
                      : "hover:bg-gray-50 border-b-4 border-gray-50"
                      }`}>
                      <td className="px-2 sm:px-6 py-2 sm:py-4">{user.name}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4">{user.role}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 text-green-500 font-semibold">{user.status}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4">{user.created}</td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4">
                        <button className="text-indigo-600 hover:text-indigo-800 transition duration-200">
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  )))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
