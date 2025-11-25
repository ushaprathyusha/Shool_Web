import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaHome, FaUser, FaChartBar, FaMoneyBill, FaClipboardList, FaFileAlt, FaCalendarAlt, FaSchool, FaSignOutAlt } from 'react-icons/fa';
import './MainLayout.css';

// Helper Component for Sidebar Links
const SidebarLink = ({ to, icon, children, isCollapsed }) => {
    return (
        <NavLink to={to} className={({ isActive }) => 
            `nav-item-parent ${isActive ? 'active-parent' : ''}`
        }>
            <div className="icon-parent">{icon}</div>
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.span
                        className="link-text-parent"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.span>
                )}
            </AnimatePresence>
        </NavLink>
    );
};

const MainLayout = () => {
    const location = useLocation();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Menu items for parent portal
    const menuItems = [
        { path: "/", label: "Dashboard", icon: <FaHome /> },
        { path: "/student", label: "Student Profile", icon: <FaUser /> },
        { path: "/exams-and-results", label: "Exams & Results", icon: <FaChartBar /> },
        { path: "/fee-management", label: "Fee Management", icon: <FaMoneyBill /> },
        { path: "/attendance-report", label: "Attendance Report", icon: <FaClipboardList /> },
        { path: "/exam-reports", label: "Exam Reports", icon: <FaFileAlt /> },
        { path: "/timetable", label: "Timetable", icon: <FaCalendarAlt /> },
        { path: "/school-information", label: "School Information", icon: <FaSchool /> },
    ];

    // Determine the title based on the current page's URL
    const getPageTitle = () => {
        const path = location.pathname.replace('/', '').replace(/-/g, ' ');
        if (path === '') return 'Parent Dashboard';
        return path.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="layout-parent">
            {/* Sidebar */}
            <div className={`sidebar-parent ${isSidebarCollapsed ? 'collapsed-parent' : 'open-parent'}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header-parent">
                    <div className="school-brand-parent">
                        <div className="school-logo-parent">
                            <div className="logo-icon-parent">👨‍👩‍👧‍👦</div>
                        </div>
                        <AnimatePresence>
                            {!isSidebarCollapsed && (
                                <motion.div 
                                    className="school-info-parent"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="school-name-parent">Little Rise</h2>
                                    <p className="school-motto-parent">Parent Portal</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button className="toggle-btn-parent" onClick={toggleSidebar}>
                        <FaBars size={18} />
                    </button>
                </div>

                {/* Parent Portal Section */}
                <div className="portal-section-parent">
                    <AnimatePresence>
                        {!isSidebarCollapsed && (
                            <motion.div
                                className="portal-label-parent"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                Parent Portal
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Menu */}
                <ul className="sidebar-menu-parent">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-section-parent">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <SidebarLink 
                                    to={item.path} 
                                    icon={item.icon}
                                    isCollapsed={isSidebarCollapsed}
                                >
                                    {item.label}
                                </SidebarLink>
                            </motion.div>
                        </li>
                    ))}
                </ul>

                {/* Sidebar Footer */}
                <div className="sidebar-footer-parent">
                    <button className="logout-btn-parent">
                        <span className="logout-icon-parent"><FaSignOutAlt /></span>
                        {!isSidebarCollapsed && "Log out"}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className={`main-content-parent ${isSidebarCollapsed ? 'expanded-parent' : ''}`}>
                {/* Header */}
                <header className="header-parent">
                    <h1 className="header-title-parent">{getPageTitle()}</h1>
                    <div className="header-actions-parent">
                        <span className="notification-bell-parent">🔔</span>
                        <button className="help-btn-parent">HELP</button>
                        <div className="user-profile-icon-parent">
                            <span>👤</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="page-content-parent">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;