import React from "react";
import { useRBAC } from "../RBACContext";

const Dashboard = () => {
  const { users } = useRBAC();  // Access the updated user data from context

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.permissions.length > 0 ? user.permissions.join(", ") : "No permissions"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;