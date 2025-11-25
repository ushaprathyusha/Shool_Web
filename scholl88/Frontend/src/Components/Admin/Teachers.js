import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./Teachers.css";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockStaffData = [
        {
          id: "STF001",
          name: "Aarohi Sharma",
          email: "aarohi.s@school.edu",
          phone: "9876543201",
          designation: "Head Teacher",
          department: "Science",
          empType: "Permanent",
          status: "Active",
          joiningDate: "8/15/2020",
          dob: "4/12/1985",
          image: "/api/placeholder/60/60",
          performance: "Excellent",
          attendance: 98
        },
        {
          id: "STF002",
          name: "Bhavik K. Patel",
          email: "bhavik.p@school.edu",
          phone: "9876543202",
          designation: "Senior Faculty",
          department: "Mathematics",
          empType: "Permanent",
          status: "Active",
          joiningDate: "7/1/2019",
          dob: "11/22/1978",
          image: "/api/placeholder/60/60",
          performance: "Excellent",
          attendance: 95
        },
        {
          id: "STF003",
          name: "Charles Xavier",
          email: "charles.x@school.edu",
          phone: "9876543203",
          designation: "Faculty",
          department: "Humanities",
          empType: "Contract",
          status: "Active",
          joiningDate: "1/10/2021",
          dob: "1/5/1990",
          image: "/api/placeholder/60/60",
          performance: "Good",
          attendance: 92
        },
        {
          id: "STF004",
          name: "Deepa M. Verma",
          email: "deepa.v@school.edu",
          phone: "9876543204",
          designation: "Coordinator",
          department: "English",
          empType: "Permanent",
          status: "Active",
          joiningDate: "5/20/2018",
          dob: "6/18/1982",
          image: "/api/placeholder/60/60",
          performance: "Excellent",
          attendance: 97
        },
        {
          id: "STF005",
          name: "Elhan Hunt",
          email: "elhan.h@school.edu",
          phone: "9876543205",
          designation: "Faculty",
          department: "Science",
          empType: "Permanent",
          status: "Active",
          joiningDate: "9/1/2022",
          dob: "9/1/1995",
          image: "/api/placeholder/60/60",
          performance: "Good",
          attendance: 90
        },
        {
          id: "STF006",
          name: "Fahad A. Khan",
          email: "fahad.k@school.edu",
          phone: "9876543206",
          designation: "Faculty",
          department: "Science",
          empType: "Permanent",
          status: "Active",
          joiningDate: "2/15/2023",
          dob: "2/25/1988",
          image: "/api/placeholder/60/60",
          performance: "Average",
          attendance: 85
        },
        {
          id: "STF007",
          name: "Gita Menon",
          email: "gita.m@school.edu",
          phone: "9876543207",
          designation: "IT Manager",
          department: "Administration",
          empType: "Permanent",
          status: "Active",
          joiningDate: "4/1/2020",
          dob: "12/12/1979",
          image: "/api/placeholder/60/60",
          performance: "Excellent",
          attendance: 96
        },
        {
          id: "STF008",
          name: "Harish V. Rao",
          email: "harish.r@school.edu",
          phone: "9876543208",
          designation: "Librarian",
          department: "Library",
          empType: "Permanent",
          status: "Active",
          joiningDate: "1/1/2024",
          dob: "2/28/1965",
          image: "/api/placeholder/60/60",
          performance: "Good",
          attendance: 88
        },
        {
          id: "STF009",
          name: "Isha Jain",
          email: "isha.j@school.edu",
          phone: "9876543209",
          designation: "Faculty",
          department: "Mathematics",
          empType: "Contract",
          status: "Active",
          joiningDate: "11/25/2021",
          dob: "10/1/1989",
          image: "/api/placeholder/60/60",
          performance: "Excellent",
          attendance: 94
        },
        {
          id: "STF010",
          name: "Inactive User",
          email: "inactive.u@school.edu",
          phone: "9876543210",
          designation: "Dummy",
          department: "Testing",
          empType: "Permanent",
          status: "Inactive",
          joiningDate: "12/31/2023",
          dob: "10/10/1980",
          image: "/api/placeholder/60/60",
          performance: "Average",
          attendance: 0
        }
      ];
      setStaff(mockStaffData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = 
      filter === "all" ? true : 
      filter === "active" ? s.status === "Active" :
      filter === "inactive" ? s.status === "Inactive" :
      s.performance.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="staff-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Staff Data...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="staff-management container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.div
        className="staff-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <div className="title-section">
            <motion.h1 
              className="staff-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              👥 Staff Management
            </motion.h1>
            <motion.p 
              className="staff-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Total Staff: <span className="staff-count">{staff.length}</span>
            </motion.p>
          </div>
          
          <motion.div 
            className="header-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              className="btn btn-primary export-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📊 Export to Excel
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        className="filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="filters-container">
          <div className="search-box">
            <motion.input
              type="text"
              className="form-control search-input"
              placeholder="Search by Name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button 
              className="btn btn-outline-secondary refresh-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh
            </motion.button>
          </div>
          
          <div className="filter-controls">
            <select
              className="form-select department-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
              <option value="excellent">Excellent Performance</option>
              <option value="good">Good Performance</option>
              <option value="average">Average Performance</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Staff Table */}
      <motion.div
        className="table-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="table-container"
          variants={itemVariants}
        >
          <div className="table-responsive staff-table-wrapper">
            <table className="table table-hover align-middle staff-table">
              <thead className="table-header">
                <tr>
                  <th>Staff ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Emp. Type</th>
                  <th>Status</th>
                  <th>Joining Date</th>
                  <th>DOB</th>
                  <th>Performance</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff, index) => (
                      <motion.tr
                        key={staff.id}
                        className="staff-row"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.01,
                          backgroundColor: "rgba(0, 123, 255, 0.03)"
                        }}
                      >
                        <td className="staff-id">
                          <span className="id-badge">{staff.id}</span>
                        </td>
                        <td>
                          <motion.div 
                            className="staff-avatar"
                            whileHover={{ scale: 1.1 }}
                          >
                            <img 
                              src={staff.image} 
                              alt={staff.name}
                              className="avatar-img"
                            />
                          </motion.div>
                        </td>
                        <td className="staff-name">
                          <strong>{staff.name}</strong>
                        </td>
                        <td className="staff-email">
                          <a href={`mailto:${staff.email}`}>{staff.email}</a>
                        </td>
                        <td className="staff-phone">{staff.phone}</td>
                        <td className="staff-designation">
                          <span className="designation-badge">{staff.designation}</span>
                        </td>
                        <td className="staff-department">
                          <span className="department-tag">{staff.department}</span>
                        </td>
                        <td className="staff-type">
                          <span className={`type-badge ${staff.empType.toLowerCase()}`}>
                            {staff.empType}
                          </span>
                        </td>
                        <td className="staff-status">
                          <motion.span 
                            className={`status-badge ${staff.status.toLowerCase()}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {staff.status}
                          </motion.span>
                        </td>
                        <td className="staff-joining-date">
                          <span className="date-text">{staff.joiningDate}</span>
                        </td>
                        <td className="staff-dob">
                          <span className="date-text">{staff.dob}</span>
                        </td>
                        <td className="staff-performance">
                          <motion.span 
                            className={`performance-badge ${staff.performance.toLowerCase()}`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {staff.performance}
                          </motion.span>
                        </td>
                        <td className="staff-attendance">
                          <div className="attendance-progress">
                            <motion.div 
                              className="progress-bar"
                              initial={{ width: 0 }}
                              animate={{ width: `${staff.attendance}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                            <span className="attendance-text">{staff.attendance}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td colSpan="13" className="no-data">
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          📭 No staff members found
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="pagination-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="pagination-container">
          <motion.button 
            className="btn btn-outline-primary pagination-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;&lt; Previous
          </motion.button>
          <div className="page-info">
            Showing {filteredStaff.length} of {staff.length} staff members
          </div>
          <motion.button 
            className="btn btn-outline-primary pagination-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next &gt;&gt;
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StaffManagement;