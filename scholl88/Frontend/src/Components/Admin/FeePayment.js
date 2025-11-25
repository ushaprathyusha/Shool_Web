import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./FeePayment.css";

const API = "http://localhost:8080/api/fees"; // Spring Boot API

const FeePaymentPage = () => {
  const [students, setStudents] = useState([]);
  const [filterClass, setFilterClass] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPayId, setSelectedPayId] = useState(null);
  const [payAmount, setPayAmount] = useState("");

  // Fetch data from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(API)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching:", err));
  };

  const handlePayClick = (id) => {
    setSelectedPayId(id);
    setPayAmount("");
  };

  const handleSubmitPayment = async (id) => {
    const amt = parseFloat(payAmount);
    if (isNaN(amt) || amt <= 0) return alert("Enter valid amount!");

    try {
      await axios.put(`${API}/${id}/pay`, null, { params: { amount: amt } });
      fetchStudents();
      setSelectedPayId(null);
      setPayAmount("");
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  const classes = ["All", ...new Set(students.map((s) => s.className))];
  const filtered = students.filter(
    (s) =>
      (filterClass === "All" || s.className === filterClass) &&
      (filterStatus === "All" || s.status === filterStatus)
  );

  const pending = students.filter((s) => s.status === "Pending");
  const totalPaid = students.reduce((sum, s) => sum + (s.paidFee || 0), 0);
  const totalPendingAmt = students.reduce(
    (sum, s) => sum + ((s.totalFee || 0) - (s.paidFee || 0)),
    0
  );

  return (
    <motion.div
      className="fee-page container-fluid"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="fee-title">💳 Fee & Payment Management</h2>
      <p className="fee-subtitle">
        Manage student payments, track dues, and generate invoices efficiently.
      </p>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
          <div className="summary-card completed">
            <h5>Total Collected</h5>
            <p>₹{totalPaid.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
          <div className="summary-card pending">
            <h5>Total Pending</h5>
            <p>₹{totalPendingAmt.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div className="col-md-4" whileHover={{ scale: 1.05 }}>
          <div className="summary-card total">
            <h5>Total Students</h5>
            <p>{students.length}</p>
          </div>
        </motion.div>
      </div>

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
        <div className="col-md-3">
          <label className="filter-label">Status</label>
          <select
            className="form-select filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        className="table-responsive"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <table className="table table-hover align-middle fee-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Class</th>
              <th>Teacher</th>
              <th>Total Fee</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => {
              const pendingAmt = (s.totalFee || 0) - (s.paidFee || 0);
              return (
                <React.Fragment key={s.id}>
                  <motion.tr
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{i + 1}</td>
                    <td>{s.studentName}</td>
                    <td>{s.className}</td>
                    <td>{s.teacherName}</td>
                    <td>₹{s.totalFee.toLocaleString()}</td>
                    <td>₹{s.paidFee.toLocaleString()}</td>
                    <td>₹{pendingAmt.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status === "Completed" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>
                      {s.status === "Pending" ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePayClick(s.id)}
                        >
                          Record Payment
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          disabled
                        >
                          Paid
                        </button>
                      )}
                    </td>
                  </motion.tr>

                  {/* Inline Payment Row */}
                  {selectedPayId === s.id && (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan="9">
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>Enter Payment for {s.studentName}</strong>
                          <div className="d-flex gap-2">
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "150px" }}
                              value={payAmount}
                              placeholder="Amount"
                              onChange={(e) => setPayAmount(e.target.value)}
                            />
                            <button
                              className="btn btn-success"
                              onClick={() => handleSubmitPayment(s.id)}
                            >
                              Submit
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setSelectedPayId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Pending Cards */}
      <motion.div
        className="pending-section mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="fw-bold mb-3">🚨 Students With Pending Fees</h4>
        <div className="row g-3">
          {pending.length === 0 ? (
            <p className="text-muted">No pending payments 🎉</p>
          ) : (
            pending.map((s) => (
              <motion.div
                className="col-md-4"
                key={s.id}
                whileHover={{ scale: 1.05 }}
              >
                <div className="pending-card">
                  <div className="d-flex justify-content-between">
                    <h5>{s.studentName}</h5>
                    <span className="badge bg-danger">Pending</span>
                  </div>
                  <p>Class: {s.className}</p>
                  <p>Teacher: {s.teacherName}</p>
                  <p>
                    Pending Amount:{" "}
                    <b className="text-danger">
                      ₹{(s.totalFee - s.paidFee).toLocaleString()}
                    </b>
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeePaymentPage;
