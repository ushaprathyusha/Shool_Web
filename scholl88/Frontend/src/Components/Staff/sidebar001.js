import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTachometerAlt, FaClipboardCheck, FaChartBar, FaChalkboardTeacher, FaCalendarAlt, FaSchool, FaSignOutAlt } from "react-icons/fa";
import "./sidebar001.css";

const Sidebar = ({ onToggle, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt />, path: "/staff/dashboard" },
    { id: "attendance", name: "Attendance", icon: <FaClipboardCheck />, path: "/staff/attendance" },
    { id: "exam-report", name: "Exam Reports", icon: <FaChartBar />, path: "/staff/exam-report" },
    { id: "class-subject", name: "Class & Subject", icon: <FaChalkboardTeacher />, path: "/staff/class-subject" },
    { id: "timetable", name: "Timetable", icon: <FaCalendarAlt />, path: "/staff/timetable" },
    { id: "school-info", name: "School Information", icon: <FaSchool />, path: "/staff/school-info" },
  ];

  // Update currentPage based on current route
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setCurrentPage(currentItem.id);
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setCurrentPage(item.id);
    navigate(item.path);
  };

  const toggleSidebar = () => {
    onToggle(!isCollapsed);
  };

  return (
    <div className={`sidebar-staff ${isCollapsed ? "collapsed-staff" : "open-staff"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header-staff">
        <div className="school-brand-staff">
          <div className="school-logo-staff">
            <div className="logo-icon-staff">👨‍🏫</div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="school-info-staff"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="school-name-staff">Little Rise</h2>
                <p className="school-motto-staff">Staff Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="toggle-btn-staff" onClick={toggleSidebar}>
          <FaBars size={18} />
        </button>
      </div>

      {/* Staff Portal Section */}
      <div className="portal-section-staff">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="portal-label-staff"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              Staff Portal
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar Menu */}
      <ul className="sidebar-menu-staff">
        {menuItems.map((item) => (
          <li key={item.id} className="nav-section-staff">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div
                className={`nav-item-staff ${
                  currentPage === item.id ? "active-staff" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <div className="icon-staff">{item.icon}</div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="link-text-staff"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </li>
        ))}
      </ul>

      {/* Sidebar Footer */}
      <div className="sidebar-footer-staff">
        <button className="logout-btn-staff">
          <span className="logout-icon-staff"><FaSignOutAlt /></span>
          {!isCollapsed && "Log out"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;