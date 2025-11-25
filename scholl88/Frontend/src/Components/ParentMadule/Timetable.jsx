import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import "./Timetable.css";

const TimeTablePage = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8080/timetable";

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) setTimetables(res.data);
      else setError("Unexpected response format.");
    } catch (err) {
      console.error("Error fetching timetables:", err);
      setError("Failed to fetch timetables. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, []);

  return (
    <div className="timetable-container88">
      {/* Header */}
      <motion.div
        className="timetable-header88"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="timetable-title88">
          <FaChalkboardTeacher className="me-2" />
          Class Timetable
        </h1>
        <p className="timetable-subtitle88">
          Stay organized and view your complete daily class schedule
        </p>
      </motion.div>

      {/* Loader & Error States */}
      {loading ? (
        <div className="loading-section88">
          <Spinner animation="border" variant="primary" />
          <p>Loading timetable...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : timetables.length === 0 ? (
        <motion.div
          className="alert alert-warning text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No timetable data available.
        </motion.div>
      ) : (
        <motion.div
          className="timetable-content88"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <div className="timetable-card88">
            <motion.div
              className="table-header-glow88"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />

            <div className="timetable-table-container88">
              <table className="timetable-table88">
                <thead>
                  <tr>
                    <th>Config</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Staff</th>
                    <th>Day</th>
                    <th>Period</th>
                    <th>Room</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {timetables.map((item, index) => (
                    <motion.tr
                      key={index}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "rgba(106, 91, 226, 0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <td>{item.ConfigId}</td>
                      <td>{item.ClassId}</td>
                      <td>{item.SectionId}</td>
                      <td>{item.SubjectId}</td>
                      <td>{item.StaffId}</td>
                      <td>{item.DayOfWeek}</td>
                      <td>{item.PeriodNumber}</td>
                      <td>{item.RoomNo}</td>
                      <td>{item.Notes || "-"}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TimeTablePage;
