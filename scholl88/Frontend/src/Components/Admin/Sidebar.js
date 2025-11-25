import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCog,
  FaMoneyBill,
  FaChartLine,
  FaUserCheck,
  FaBookOpen,
} from "react-icons/fa";
import "./Sidebar.css";

const menuItems77 = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/students", label: "Students", icon: <FaUserGraduate /> },
  { path: "/teachers", label: "Staff", icon: <FaChalkboardTeacher /> },
  { path: "/attendance", label: "Attendance", icon: <FaUserCheck /> },
  { path: "/exam", label: "Exam & Result", icon: <FaBookOpen /> },
  { path: "/fees", label: "Fee & Payment", icon: <FaMoneyBill /> },
  { path: "/timetable", label: "Timetable", icon: <FaCalendarAlt /> },
  { path: "/reports", label: "Reports & Analytics", icon: <FaChartLine /> },
  { path: "/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar77 = ({ onToggle, isCollapsed }) => {
  const toggleSidebar77 = () => {
    onToggle(!isCollapsed);
  };

  return (
    <div className={`sidebar-container77 ${isCollapsed ? "collapsed77" : "open77"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header77">
        <div className="school-brand77">
          <div className="school-logo77">
            <div className="logo-icon77">🎓</div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="school-info77"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="school-name77">Akademi</h2>
                <p className="school-motto77">Excellence in Education</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="toggle-btn77" onClick={toggleSidebar77}>
          <FaBars size={18} />
        </button>
      </div>

      {/* Admin Portal Section */}
      <div className="admin-portal-section77">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="admin-portal-label77"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              Admin Portal
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu77">
        {menuItems77.map((item, index) => (
          <li key={index} className="nav-section77">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-item77 active77" : "nav-item77"
                }
              >
                <div className="icon77">{item.icon}</div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="link-text77"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.div>
          </li>
        ))}
      </ul>

      {/* Sidebar Footer */}
      <div className="sidebar-footer77">
        <button className="logout-btn77">
          <span className="logout-icon77">🚪</span>
          {!isCollapsed && "Log out"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar77;