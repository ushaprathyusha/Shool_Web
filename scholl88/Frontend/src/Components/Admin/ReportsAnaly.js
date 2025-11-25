import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import "./ReportsAnaly.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const ReportsAnalyticsPage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [feeData, setFeeData] = useState([]);

  useEffect(() => {
    // Replace URLs with your backend endpoints
    axios.get("http://localhost:8080/api/performance").then(res => setPerformanceData(res.data));
    axios.get("http://localhost:8080/api/attendance-summary").then(res => setAttendanceData(res.data));
    axios.get("http://localhost:8080/api/fee-collection").then(res => setFeeData(res.data));
  }, []);

  // Example chart datasets
  const performanceChart = {
    labels: performanceData.map(d => d.month),
    datasets: [
      {
        label: "Average Score",
        data: performanceData.map(d => d.avgScore),
        borderColor: "#5e4bff",
        backgroundColor: "rgba(94, 75, 255, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const attendanceChart = {
    labels: attendanceData.map(d => d.className),
    datasets: [
      {
        label: "Attendance %",
        data: attendanceData.map(d => d.attendancePercent),
        backgroundColor: "#3a2a77",
      },
    ],
  };

  const feeChart = {
    labels: feeData.map(d => d.month),
    datasets: [
      {
        label: "Collected Fees",
        data: feeData.map(d => d.amount),
        backgroundColor: "#5e4bff",
      },
    ],
  };

  return (
    <motion.div
      className="reports-page container-fluid"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.h2
        className="reports-title fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Reports & Analytics
      </motion.h2>
      <motion.p
        className="reports-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Monitor student performance, attendance, and fee collections with interactive charts.
      </motion.p>

      {/* Charts */}
      <div className="row g-4 mt-4">
        <motion.div className="col-md-6" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <div className="report-card shadow-sm p-3">
            <h5>Student Performance Trends</h5>
            <Line data={performanceChart} />
          </div>
        </motion.div>

        <motion.div className="col-md-6" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <div className="report-card shadow-sm p-3">
            <h5>Attendance Percentage per Class</h5>
            <Bar data={attendanceChart} />
          </div>
        </motion.div>

        <motion.div className="col-md-12" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <div className="report-card shadow-sm p-3">
            <h5>Fee Collection (Month-wise)</h5>
            <Bar data={feeChart} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReportsAnalyticsPage;
