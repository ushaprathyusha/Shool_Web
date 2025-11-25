import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Attendance.css";

const AttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/attendance")
      .then((res) => setAttendanceData(res.data))
      .catch((err) => console.log("❌ Error fetching attendance", err));
  }, []);

  // Filter & Search logic
  const filteredData = attendanceData.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.className.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : item.status.toLowerCase() === filter.toLowerCase();

    const matchesDate =
      (!startDate || new Date(item.date) >= new Date(startDate)) &&
      (!endDate || new Date(item.date) <= new Date(endDate));

    return matchesSearch && matchesFilter && matchesDate;
  });

  return (
    <motion.div
      className="attendance-page container-fluid mt-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* ---------------- HEADER ---------------- */}
      <h3 className="fw-bold mb-4 text-dark">📊 Attendance Management</h3>

      {/* ---------------- FILTERS SECTION ---------------- */}
      <motion.div
        className="filters-section d-flex flex-wrap gap-3 align-items-center mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="d-flex flex-column">
          <label className="filter-label">Start Date</label>
          <input
            type="date"
            className="form-control filter-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="filter-label">End Date</label>
          <input
            type="date"
            className="form-control filter-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column flex-grow-1">
          <label className="filter-label">Search</label>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by student, class, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="filter-label">Status</label>
          <select
            className="form-select filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>

        <button className="btn btn-primary export-btn mt-4">
          Export Report
        </button>
      </motion.div>

      {/* ---------------- ATTENDANCE TABLE ---------------- */}
      <motion.div
        className="table-responsive shadow-sm rounded-4 bg-white mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="table table-hover align-middle text-center mb-0">
          <thead className="table-attendance text-white">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.studentName}</td>
                  <td>{item.className}</td>
                  <td>{item.subject}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Present"
                          ? "bg-success"
                          : item.status === "Absent"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted py-3">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* ---------------- SUMMARY CARDS ---------------- */}
      <div className="row g-4">
        {[
          { title: "Weekly Attendance", present: "85%", absent: "10%" },
          { title: "Monthly Attendance", present: "88%", absent: "8%" },
          { title: "Late Comings", present: "5%", absent: null },
        ].map((card, idx) => (
          <motion.div
            className="col-md-4"
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
            }}
          >
            <div className="summary-card h-100">
              <h6>{card.title}</h6>
              <p>
                Total Present: <strong>{card.present}</strong>
              </p>
              {card.absent && (
                <p>
                  Total Absent: <strong>{card.absent}</strong>
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AttendancePage;
