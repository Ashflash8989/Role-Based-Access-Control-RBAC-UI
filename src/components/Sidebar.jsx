import React from "react";

const Sidebar = ({ onSelect }) => (
  <div className="w-64 bg-gray-800 text-white h-screen p-4">
    <ul className="space-y-4">
      <li onClick={() => onSelect("users")} className="cursor-pointer">
        User Management
      </li>
      <li onClick={() => onSelect("roles")} className="cursor-pointer">
        Role Management
      </li>
      <li onClick={() => onSelect("permissions")} className="cursor-pointer">
        Permission Management
      </li>
    </ul>
  </div>
);

export default Sidebar;
