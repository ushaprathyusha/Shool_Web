import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import "./Charts.css";

const Charts = () => {
  const studentTeacherData = [
    { name: "Students", value: 1200 },
    { name: "Teachers", value: 80 },
  ];

  const feeData = [
    { month: "Jan", fees: 150000 },
    { month: "Feb", fees: 180000 },
    { month: "Mar", fees: 220000 },
    { month: "Apr", fees: 170000 },
  ];

  const attendanceData = [
    { month: "Jan", attendance: 92 },
    { month: "Feb", attendance: 95 },
    { month: "Mar", attendance: 90 },
    { month: "Apr", attendance: 94 },
  ];

  const COLORS = ["#6A5BE2", "#A29BFE"];

  return (
    <div className="charts-container row mt-4 g-4">
      {/* Pie Chart */}
      <motion.div
        className="col-lg-4 col-md-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="chart-card p-3 shadow-lg rounded-4">
          <h5 className="fw-semibold mb-3 text-center">Student vs Teacher Ratio</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studentTeacherData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {studentTeacherData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        className="col-lg-4 col-md-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="chart-card p-3 shadow-lg rounded-4">
          <h5 className="fw-semibold mb-3 text-center">Fee Collection Trend</h5>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={feeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="fees" stroke="#6A5BE2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        className="col-lg-4 col-md-12"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="chart-card p-3 shadow-lg rounded-4">
          <h5 className="fw-semibold mb-3 text-center">Attendance Summary</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#A29BFE" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;
