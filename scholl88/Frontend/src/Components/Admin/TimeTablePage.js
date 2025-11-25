import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./TimeTablePage.css";

const API = "http://localhost:8080/api/timetable"; // Your backend endpoint

const TimeTablePage = () => {
  const [timetables, setTimetables] = useState([]);
  const [filterClass, setFilterClass] = useState("All");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const res = await axios.get(API);
      setTimetables(res.data);
      const uniqueClasses = ["All", ...new Set(res.data.map((t) => t.className))];
      setClasses(uniqueClasses);
    } catch (err) {
      console.error("Error fetching timetables:", err);
    }
  };

  const filtered = timetables.filter(
    (t) => filterClass === "All" || t.className === filterClass
  );

  return (
    <motion.div
      className="timetable-page container-fluid"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.h2
        className="tt-title fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🗓️ Timetable Management
      </motion.h2>
      <motion.p
        className="tt-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Create & assign class timetables and view teacher schedules efficiently.
      </motion.p>

      {/* Filters */}
      <div className="row mb-4 g-3 align-items-end filter-row">
        <div className="col-md-3">
          <label className="filter-label">Class</label>
          <select
            className="form-select filter-select"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Table */}
      <motion.div
        className="table-responsive shadow-sm rounded-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <table className="table table-hover timetable-table align-middle text-center">
          <thead className="tt-table-head text-white">
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((tt, index) => (
                <motion.tr
                  key={tt.id}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{index + 1}</td>
                  <td>{tt.className}</td>
                  <td>{tt.day}</td>
                  <td>{tt.time}</td>
                  <td>{tt.subject}</td>
                  <td>{tt.teacherName}</td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted py-3">
                  No timetable data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Summary Cards: Teacher Schedule */}
      <motion.div className="row g-4 mt-5">
        {[...new Set(filtered.map((t) => t.teacherName))].map((teacher, idx) => (
          <motion.div
            className="col-md-4"
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(58,42,119,0.25)" }}
          >
            <div className="tt-card shadow-sm">
              <h5>{teacher}</h5>
              {filtered
                .filter((t) => t.teacherName === teacher)
                .map((t, i) => (
                  <p key={i}>
                    {t.day} | {t.time} | {t.subject} ({t.className})
                  </p>
                ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TimeTablePage;
