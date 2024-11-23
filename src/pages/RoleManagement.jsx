import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { useSelector, useDispatch } from "react-redux";
import RoleModal from "../components/RoleModal";
import EditRoleModal from "../components/EditRoleModal";

function RoleManagement() {
  const { darkMode } = useDarkMode();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setEditModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      dispatch({ type: "roles/deleteRole", payload: roleId });
    }
  };

  return (
    <div
      className={`h-screen flex pt-16 overflow-auto justify-end w-full lg:w-5/6 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`h-16 flex items-center px-6 justify-between shadow-md ${
            darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
          }`}
        >
          <h1 className="text-lg sm:text-xl md:text-xl font-semibold">
            Role Management
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAddModalOpen(true)}
              className={`py-2 px-6 rounded-lg shadow-md transition flex items-center justify-center ${
                darkMode
                  ? "bg-indigo-600 text-gray-100 hover:bg-indigo-500"
                  : "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
              }`}
            >
              <FaPlus className="inline" />
              <span className="hidden lg:block">Add</span>
            </button>
          </div>
        </header>
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <div
            className={`shadow-sm rounded-lg overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="w-full table-auto text-sm sm:text-base md:text-base">
              <thead
                className={`${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-indigo-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="px-3 sm:px-6 py-4 text-left font-medium">Role</th>
                  <th className="px-3 sm:px-6 py-4 text-left font-medium">
                    Permissions
                  </th>
                  <th className="px-3 sm:px-6 py-4 text-left font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.length==0 ? (
                  <tr>
                  <td colSpan="4" className="text-center py-6 text-sm sm:text-base font-semibold text-gray-500">
                    No Roles Available
                  </td>
                </tr>
                ) : (
                  roles.map((role) => (
                    <tr
                      key={role.id}
                      className={`transition duration-200 ${
                        darkMode
                          ? "hover:bg-gray-700 border-b border-gray-600"
                          : "hover:bg-gray-50 border-b-4 border-gray-50"
                      }`}
                    >
                      <td className="px-3 sm:px-6 py-4">{role.role}</td>
                      <td className="px-3 sm:px-6 py-4">{role.permissions}</td>
                      <td className="px-3 sm:px-6 py-4 flex space-x-4">
                        <button
                          onClick={() => handleEditRole(role)}
                          className={`transition duration-200 ${
                            darkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-600 hover:text-indigo-800"
                          }`}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className={`transition duration-200 ${
                            darkMode
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-600 hover:text-red-800"
                          }`}
                        >
                          <FaTrashAlt />
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
      {addModalOpen && <RoleModal closeModal={() => setAddModalOpen(false)} />}
      {editModalOpen && (
        <EditRoleModal
          role={selectedRole}
          closeModal={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}

export default RoleManagement;
