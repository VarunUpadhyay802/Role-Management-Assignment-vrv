import React, { useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { useDispatch } from "react-redux";
import { editRole } from "../slices/Roleslice";

function EditRoleModal({ role, closeModal }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const [updatedRole, setUpdatedRole] = useState(role.role);
  const [updatedPermissions, setUpdatedPermissions] = useState(role.permissions);

  const handleSave = () => {
    if (updatedRole && updatedPermissions) {
      dispatch(
        editRole({
          id: role.id,
          updatedRole: {
            role: updatedRole,
            permissions: updatedPermissions,
          },
        })
      );
      closeModal();
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[10000] transition-opacity duration-300 opacity-100 ${darkMode ? "bg-gray-900 bg-opacity-70" : "bg-gray-900 bg-opacity-50"
        }`}
    >
      <div
        className={`rounded-lg shadow-lg max-w-lg w-full p-8 ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Edit Role</h3>
          <button
            onClick={closeModal}
            className={`transition duration-200 ${darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
              }`}
          >
            <FaRegTimesCircle size={24} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Role"
          value={updatedRole}
          onChange={(e) => setUpdatedRole(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
        />
        <input
          type="text"
          placeholder="Permissions"
          value={updatedPermissions}
          onChange={(e) => setUpdatedPermissions(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className={`px-6 py-2 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg flex items-center transition duration-200 ${darkMode
                ? "bg-indigo-500 text-gray-100 hover:bg-indigo-400"
                : "bg-indigo-600 text-gray-100 hover:bg-indigo-700"
              }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRoleModal;
