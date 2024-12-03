import React, { useState } from "react";
import { useRBAC } from "../RBACContext";

const RoleManagement = () => {
  const { users, roles, setRoles } = useRBAC();
  const [availableRoles] = useState(["Admin", "Editor", "Viewer"]); // Define available roles

  const handleRoleChange = (userId, role) => {
    const updatedRoles = roles.map((r) =>
      r.userId === userId ? { ...r, role } : r
    );

    if (!updatedRoles.some((r) => r.userId === userId)) {
      updatedRoles.push({ userId, role });
    }

    setRoles(updatedRoles);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Role Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const userRole =
              roles.find((r) => r.userId === user.id)?.role || "";
            return (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={userRole}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
