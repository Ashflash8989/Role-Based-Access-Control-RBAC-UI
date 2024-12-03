import React, { useState } from "react";
import { useRBAC } from "../RBACContext";

const PermissionManagement = () => {
  const { users, permissions, setPermissions } = useRBAC();
  const [availablePermissions] = useState(["Read", "Write", "Delete"]); // Define available permissions

  const handlePermissionChange = (userId, selectedPermission) => {
    const userPermissions = permissions.find((p) => p.userId === userId)?.permissions || [];
    const updatedPermissions = userPermissions.includes(selectedPermission)
      ? userPermissions.filter((p) => p !== selectedPermission)
      : [...userPermissions, selectedPermission];

    const newPermissions = permissions.map((p) =>
      p.userId === userId ? { ...p, permissions: updatedPermissions } : p
    );

    if (!newPermissions.some((p) => p.userId === userId)) {
      newPermissions.push({ userId, permissions: updatedPermissions });
    }

    setPermissions(newPermissions);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Permission Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Permissions</th>
            {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
  {users.map((user) => {
    const userPermissions = permissions.find((p) => p.userId === user.id)?.permissions || [];
    return (
      <tr key={user.id}>
        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
        <td className="border border-gray-300 px-4 py-2">
          {availablePermissions.map((permission) => (
            <label key={permission} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={userPermissions.includes(permission)}
                onChange={() => handlePermissionChange(user.id, permission)}
              />
              {permission}
            </label>
          ))}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

export default PermissionManagement;
