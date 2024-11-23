import React, { createContext, useState, useContext } from 'react';

const RBACContext = createContext();

export const useRBAC = () => useContext(RBACContext);

const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const addUser = (user) => setUsers([...users, user]);
  const editUser = (updatedUser) =>
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const addRole = (role) => setRoles([...roles, role]);
  const editRole = (updatedRole) =>
    setRoles(roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
  const deleteRole = (id) => setRoles(roles.filter((r) => r.id !== id));

  return (
    <RBACContext.Provider
      value={{ users, roles, addUser, editUser, deleteUser, addRole, editRole, deleteRole }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export default RBACProvider;
