import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white">
      <h5>Dashboard</h5>
      <div className="navbar-icons d-flex align-items-center gap-3">
        <i className="bi bi-search"></i>
        <i className="bi bi-bell"></i>
        <img src="https://i.pravatar.cc/40" alt="profile" className="rounded-circle" />
      </div>
    </div>
  );
};

export default Navbar;
