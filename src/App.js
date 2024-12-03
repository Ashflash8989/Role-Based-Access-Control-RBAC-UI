import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionsManagement";

const App = () => {
  const [activeSection, setActiveSection] = useState("users");

  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "roles":
        return <RoleManagement />;
      case "permissions":
        return <PermissionManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setActiveSection} />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{renderSection()}</main>
      </div>
    </div>
  );
};

export default App;
