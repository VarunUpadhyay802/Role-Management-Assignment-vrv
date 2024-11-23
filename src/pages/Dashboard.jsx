import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
        data: [80, 90, 70, 110],
        fill: false,
        borderColor: "rgb(102, 187, 106)", // Adjusted to a green tone
        tension: 0.3,
      },
      {
        label: "Revenue",
        data: [65, 75, 85, 95],
        fill: false,
        borderColor: "rgb(255, 87, 34)", // Adjusted to orange
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "New Users",
        data: [45, 70, 95, 130],
        backgroundColor: "rgb(41, 121, 255)", // Blue for bars
        borderWidth: 1,
      },
      {
        label: "Inactive Users",
        data: [25, 45, 60, 85],
        backgroundColor: "rgb(255, 138, 101)", // Coral for bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Performance Overview",
        font: { size: 16 },
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
      className={`h-screen flex pt-16 overflow-auto justify-end w-full lg:w-5/6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`h-16 flex items-center px-4 sm:px-6 md:px-8 justify-between ${
            darkMode ? "bg-gray-800 shadow-lg" : "bg-gray-200 shadow-lg"
          }`}
        >
          <h1 className="text-xl font-bold tracking-wide">Admin Dashboard</h1>
        </header>

        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
              <Bar data={barData} options={{ responsive: true }} />
            </div>

            {/* Line Chart */}
            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Sales & Revenue</h3>
              <Line data={lineData} options={options} />
            </div>
          </div>

          {/* User Table */}
          <div
            className={`mt-8 rounded-lg shadow-md overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="w-full table-auto text-sm">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-left border-b">Name</th>
                  <th className="px-6 py-3 text-left border-b">Role</th>
                  <th className="px-6 py-3 text-left border-b">Status</th>
                  <th className="px-6 py-3 text-left border-b">Date Added</th>
                  <th className="px-6 py-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 font-medium text-gray-500"
                    >
                      No users available.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className={`transition duration-200 ${
                        darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-3">{user.name}</td>
                      <td className="px-6 py-3">{user.role}</td>
                      <td className="px-6 py-3 text-green-500 font-semibold">
                        {user.status}
                      </td>
                      <td className="px-6 py-3">{user.created}</td>
                      <td className="px-6 py-3">
                        <button className="text-indigo-500 hover:text-indigo-700 transition">
                          <FaEllipsisH />
                        </button>
                      </td>
                    </tr>
                  ))
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
