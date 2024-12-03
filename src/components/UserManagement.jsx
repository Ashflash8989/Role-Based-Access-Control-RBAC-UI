import React, { useState } from "react";
import { useRBAC } from "../RBACContext";

const UserManagement = () => {
  const { users, roles, permissions, addUser, deleteUser } = useRBAC();
  const [newUser, setNewUser] = useState("");

  const handleAddUser = () => {
    if (newUser.trim()) {
      const userId = Date.now(); // Unique ID for the user
      addUser({ id: userId, name: newUser.trim() });
      setNewUser("");
    }
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId); // Call delete function to remove the user
  };

  const getUserRole = (userId) => {
    const userRole = roles.find((role) => role.userId === userId);
    return userRole ? userRole.role : "No role assigned";
  };

  const getUserPermissions = (userId) => {
    const userPermissions = permissions.find(
      (perm) => perm.userId === userId
    );
    return userPermissions && userPermissions.permissions.length > 0
      ? userPermissions.permissions.join(", ")
      : "No permissions assigned";
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Add New User */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Enter user name"
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>

      {/* Display Users */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Permissions</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {getUserRole(user.id)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {getUserPermissions(user.id)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
