import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ExamResultPage.css";
import axios from "axios";

const ExamResultPage = () => {
  const [results, setResults] = useState([]);

  // Fetch results data
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/results")
      .then((res) => setResults(res.data))
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  // Performance summary calculations
  const topPerformers = results.filter((r) => r.percentage >= 85);
  const averagePerformers = results.filter(
    (r) => r.percentage >= 60 && r.percentage < 85
  );
  const lowPerformers = results.filter((r) => r.percentage < 60);

  return (
    <motion.div
      className="exam-page container-fluid"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.h2
        className="exam-title fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🧮 Exam & Result Management
      </motion.h2>

      <motion.p
        className="exam-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Analyze student performance, track teacher efficiency, and monitor academic trends with live results.
      </motion.p>

      {/* Summary Cards */}
      <div className="row g-4 mt-3 mb-5">
        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="summary-card bg-success-gradient">
            <h5>🏆 Top Performers</h5>
            <p>
              {topPerformers.length > 0
                ? `${topPerformers.length} students scored above 85%`
                : "No top performers yet."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="summary-card bg-warning-gradient">
            <h5>📈 Average Performers</h5>
            <p>
              {averagePerformers.length > 0
                ? `${averagePerformers.length} students between 60% - 85%`
                : "No data available."}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="col-md-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="summary-card bg-danger-gradient">
            <h5>📉 Low Performers</h5>
            <p>
              {lowPerformers.length > 0
                ? `${lowPerformers.length} students below 60%`
                : "No low performers 🎉"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Results Table */}
      <motion.div
        className="table-responsive shadow-lg rounded-4 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <table className="table align-middle text-center">
          <thead className="table-header">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Marks</th>
              <th>Percentage</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(94,75,255,0.07)",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.studentName}</td>
                  <td>{item.className}</td>
                  <td>{item.subject}</td>
                  <td>{item.teacher}</td>
                  <td>{item.marks}</td>
                  <td>{item.percentage}%</td>
                  <td>
                    <span
                      className={`badge ${
                        item.percentage >= 85
                          ? "bg-success"
                          : item.percentage >= 60
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {item.percentage >= 85
                        ? "Excellent"
                        : item.percentage >= 60
                        ? "Average"
                        : "Needs Improvement"}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted py-4">
                  No results available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ExamResultPage;
