import React, { createContext, useContext, useState } from "react";

// Create RBAC Context
const RBACContext = createContext();

// Custom hook for consuming the context
export const useRBAC = () => useContext(RBACContext);

// RBACProvider Component
const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    const defaultRole = "Viewer";
    setRoles((prevRoles) => [
      ...prevRoles,
      { userId: newUser.id, role: defaultRole },
    ]);

    const defaultPermissions = [];
    setPermissions((prevPermissions) => [
      ...prevPermissions,
      { userId: newUser.id, permissions: defaultPermissions },
    ]);
  };

  const deleteUser = (userId) => {
    // Remove the user
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    // Remove associated roles
    setRoles((prevRoles) => prevRoles.filter((role) => role.userId !== userId));

    // Remove associated permissions
    setPermissions((prevPermissions) =>
      prevPermissions.filter((perm) => perm.userId !== userId)
    );
  };

  return (
    <RBACContext.Provider
      value={{
        users,
        setUsers,
        roles,
        setRoles,
        permissions,
        setPermissions,
        addUser,
        deleteUser, // Add deleteUser to the context
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

// Export RBACProvider as default
export default RBACProvider;
