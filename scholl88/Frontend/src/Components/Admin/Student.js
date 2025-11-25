import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaChevronLeft, 
  FaChevronRight, 
  FaEye,
  FaDownload,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendar,
  FaBook,
  FaDollarSign,
  FaChartLine
} from "react-icons/fa";
import * as XLSX from "xlsx";
import "./Student.css";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    className: "",
    section: "",
    subjects: "",
    feeStatus: "pending",
    performance: "",
    email: "",
    phone: "",
    address: "",
    admissionDate: "",
    parentName: "",
    parentContact: "",
    photo: ""
  });

  // ✅ Load students from backend with hardcoded data
  useEffect(() => {
    const hardcodedStudents = [
      {
        id: 68,
        name: "sample samplename",
        className: "grade 9",
        section: "A",
        subjects: "Math, Science",
        feeStatus: "paid",
        performance: "85",
        email: "sample@student.com",
        phone: "9876543210",
        address: "123 Main Street",
        admissionDate: "2024-01-15",
        parentName: "Parent Name",
        parentContact: "4654878700",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      {
        id: 67,
        name: "fat fat",
        className: "Grade 7",
        section: "B",
        subjects: "English, History",
        feeStatus: "pending",
        performance: "72",
        email: "fat@student.com",
        phone: "947887655677",
        address: "456 Oak Avenue",
        admissionDate: "2024-02-10",
        parentName: "Parent Fat",
        parentContact: "485468400",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      {
        id: 66,
        name: "mmp vams kritihna",
        className: "grade 9",
        section: "C",
        subjects: "Physics, Chemistry",
        feeStatus: "paid",
        performance: "92",
        email: "vams@student.com",
        phone: "+1 (555) 345-6789",
        address: "789 Pine Road",
        admissionDate: "2024-01-20",
        parentName: "Parent Vams",
        parentContact: "496464680",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      }
    ];

    axios
      .get("http://localhost:8080/api/students")
      .then((res) => {
        const backendStudents = res.data.map(student => ({
          ...student,
          photo: student.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        }));
        setStudents([...hardcodedStudents, ...backendStudents]);
      })
      .catch(() => {
        console.log("⚙ Using mock data with hardcoded entries");
        setStudents(hardcodedStudents);
      });
  }, []);

  // ✅ Filter logic
  const filteredStudents = students.filter((stu) => {
    const matchSearch =
      stu.name.toLowerCase().includes(search.toLowerCase()) ||
      stu.className.toLowerCase().includes(search.toLowerCase()) ||
      stu.id.toString().includes(search);
    const matchFilter = filter === "all" ? true : stu.className.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });

  // ✅ Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // ✅ Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ✅ Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ✅ Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ✅ Handle Add / Edit
  const handleSave = () => {
    if (editMode) {
      setStudents((prev) =>
        prev.map((stu) =>
          stu.id === selectedStudent.id ? selectedStudent : stu
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,
        { 
          ...selectedStudent, 
          id: Date.now(),
          photo: selectedStudent.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
      ]);
    }
    setShowModal(false);
    setSelectedStudent({
      id: "",
      name: "",
      className: "",
      section: "",
      subjects: "",
      feeStatus: "pending",
      performance: "",
      email: "",
      phone: "",
      address: "",
      admissionDate: "",
      parentName: "",
      parentContact: "",
      photo: ""
    });
    setCurrentPage(1);
  };

  // ✅ Handle Edit
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditMode(true);
    setShowModal(true);
  };

  // ✅ Handle View
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (currentStudents.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ✅ Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents.map(student => ({
      "Student ID": student.id,
      "Name": student.name,
      "Class": student.className,
      "Section": student.section,
      "Subjects": student.subjects,
      "Performance (%)": student.performance,
      "Fee Status": student.feeStatus,
      "Email": student.email,
      "Phone": student.phone,
      "Address": student.address,
      "Admission Date": student.admissionDate,
      "Parent Name": student.parentName,
      "Parent Contact": student.parentContact
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, `Students_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // ✅ Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <motion.div
      className="student-management-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🔹 Header */}
      <div className="student-header-section">
        <div className="student-header-main">
          <div className="student-header-title">
            <h1 className="student-school-title">Little Rise School</h1>
            <h2 className="student-page-title">Student Management</h2>
          </div>
          <div className="student-search-section">
            <input
              type="text"
              className="student-search-input"
              placeholder="Search by Name or ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="student-filter-select"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Filter by Class</option>
              <option value="grade 9">Grade 9</option>
              <option value="grade 7">Grade 7</option>
              <option value="grade 1">Grade 1</option>
              <option value="grade 5">Grade 5</option>
            </select>
          </div>
        </div>
        <div className="student-welcome-section">
          <span className="student-welcome-text">Welcome, Admin</span>
          <span className="student-user-name">Jul Clause</span>
          <div className="student-action-buttons">
            <motion.button
              className="student-export-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportToExcel}
            >
              <FaDownload className="student-btn-icon" />
              Save to Excel
            </motion.button>
            {/* <motion.button
              className="student-add-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEditMode(false);
                setShowModal(true);
              }}
            >
              <FaPlus className="student-btn-icon" />
              Add Student
            </motion.button> */}
          </div>
        </div>
      </div>

      {/* 🧾 Student Table */}
      <div className="student-table-container">
        <div className="student-table-wrapper">
          <table className="student-data-table">
            <thead className="student-table-header">
              <tr>
                <th className="student-col-sno">#</th>
                <th className="student-col-id">Student ID</th>
                <th className="student-col-name">Name</th>
                <th className="student-col-class">Class</th>
                <th className="student-col-parent">Parent Contact</th>
                <th className="student-col-action">Action</th>
                <th className="student-col-view">View Details</th>
              </tr>
            </thead>
            <tbody className="student-table-body">
              <AnimatePresence>
                {currentStudents.length > 0 ? (
                  currentStudents.map((stu, index) => (
                    <motion.tr
                      key={stu.id}
                      className="student-table-row"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="student-col-sno">{(currentPage - 1) * studentsPerPage + index + 1}</td>
                      <td className="student-col-id">{stu.id}</td>
                      <td className="student-col-name">
                        <div className="student-name-wrapper">
                          <div className="student-avatar-small">
                            <img 
                              src={stu.photo} 
                              alt={stu.name}
                              className="student-avatar-img"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face";
                              }}
                            />
                          </div>
                          <div className="student-name-text">{stu.name}</div>
                        </div>
                      </td>
                      <td className="student-col-class">{stu.className}</td>
                      <td className="student-col-parent">{stu.parentContact}</td>
                      <td className="student-col-action">
                        <div className="student-action-icons">
                          <motion.button
                            className="student-edit-icon"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(stu)}
                            title="Edit"
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            className="student-delete-icon"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(stu.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      </td>
                      <td className="student-col-view">
                        <motion.button
                          className="student-view-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleView(stu)}
                        >
                          <FaEye className="student-view-icon" />
                          View
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr className="student-empty-row">
                    <td colSpan="7" className="student-empty-cell">
                      <div className="student-empty-content">
                        <FaUser className="student-empty-icon" />
                        <div className="student-empty-text">No students found</div>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination & Info */}
        <div className="student-table-footer">
          <div className="student-count-text">
            Displaying {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}()
          </div>
          
          {filteredStudents.length > studentsPerPage && (
            <div className="student-pagination">
              <div className="student-pagination-info">
                Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length} entries
              </div>
              <nav className="student-pagination-nav">
                <ul className="student-pagination-list">
                  <li className={`student-page-item ${currentPage === 1 ? 'student-page-disabled' : ''}`}>
                    <button className="student-page-link" onClick={prevPage}>
                      <FaChevronLeft size={10} />
                    </button>
                  </li>

                  {getPageNumbers().map(number => (
                    <li key={number} className={`student-page-item ${currentPage === number ? 'student-page-active' : ''}`}>
                      <button 
                        className="student-page-link" 
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}

                  <li className={`student-page-item ${currentPage === totalPages ? 'student-page-disabled' : ''}`}>
                    <button className="student-page-link" onClick={nextPage}>
                      <FaChevronRight size={10} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* 🪄 Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="student-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="student-modal-content"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="student-modal-header">
                <h5 className="student-modal-title">
                  {editMode ? "Edit Student" : "Add New Student"}
                </h5>
                <button 
                  type="button" 
                  className="student-modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="student-modal-body">
                <div className="student-form-grid">
                  <div className="student-form-group">
                    <label className="student-form-label">Full Name</label>
                    <input
                      type="text"
                      className="student-form-input"
                      placeholder="Enter full name"
                      value={selectedStudent.name}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Class</label>
                    <input
                      type="text"
                      className="student-form-input"
                      placeholder="e.g., Grade 9"
                      value={selectedStudent.className}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          className: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Section</label>
                    <input
                      type="text"
                      className="student-form-input"
                      placeholder="e.g., A"
                      value={selectedStudent.section}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          section: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Email</label>
                    <input
                      type="email"
                      className="student-form-input"
                      placeholder="student@email.com"
                      value={selectedStudent.email}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Phone</label>
                    <input
                      type="tel"
                      className="student-form-input"
                      placeholder="+1 (555) 123-4567"
                      value={selectedStudent.phone}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Parent Contact</label>
                    <input
                      type="tel"
                      className="student-form-input"
                      placeholder="Parent's phone number"
                      value={selectedStudent.parentContact}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          parentContact: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group student-form-full">
                    <label className="student-form-label">Address</label>
                    <input
                      type="text"
                      className="student-form-input"
                      placeholder="Full address"
                      value={selectedStudent.address}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Photo URL</label>
                    <input
                      type="text"
                      className="student-form-input"
                      placeholder="https://example.com/photo.jpg"
                      value={selectedStudent.photo}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          photo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Performance (%)</label>
                    <input
                      type="number"
                      className="student-form-input"
                      placeholder="85"
                      min="0"
                      max="100"
                      value={selectedStudent.performance}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          performance: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="student-form-group">
                    <label className="student-form-label">Fee Status</label>
                    <select
                      className="student-form-select"
                      value={selectedStudent.feeStatus}
                      onChange={(e) =>
                        setSelectedStudent({
                          ...selectedStudent,
                          feeStatus: e.target.value,
                        })
                      }
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="student-modal-footer">
                <button
                  className="student-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="student-btn-save"
                  onClick={handleSave}
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👁️ View Student Details Modal */}
      <AnimatePresence>
        {showViewModal && (
          <motion.div
            className="student-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              className="student-view-modal-content"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="student-modal-header">
                <h5 className="student-modal-title">Student Details</h5>
                <button 
                  type="button" 
                  className="student-modal-close"
                  onClick={() => setShowViewModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="student-view-body">
                <div className="student-profile-card">
                  <div className="student-profile-header">
                    <div className="student-profile-avatar">
                      <img 
                        src={selectedStudent.photo} 
                        alt={selectedStudent.name}
                        className="student-avatar-large"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&crop=face";
                        }}
                      />
                    </div>
                    <div className="student-profile-info">
                      <h4 className="student-profile-name">{selectedStudent.name}</h4>
                      <p className="student-profile-id">Student ID: {selectedStudent.id}</p>
                      <div className="student-profile-stats">
                        <span className={`student-performance-tag ${
                          selectedStudent.performance >= 85 ? "student-perf-excellent" :
                          selectedStudent.performance >= 70 ? "student-perf-good" :
                          selectedStudent.performance >= 60 ? "student-perf-average" : "student-perf-poor"
                        }`}>
                          <FaChartLine className="student-stat-icon" />
                          {selectedStudent.performance}%
                        </span>
                        <span className={`student-fee-tag ${
                          selectedStudent.feeStatus === "paid" ? "student-fee-paid" : "student-fee-pending"
                        }`}>
                          <FaDollarSign className="student-stat-icon" />
                          {selectedStudent.feeStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="student-details-grid">
                    <div className="student-detail-item">
                      <FaBook className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Class & Section</label>
                        <span>{selectedStudent.className} - {selectedStudent.section}</span>
                      </div>
                    </div>
                    <div className="student-detail-item">
                      <FaEnvelope className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Email</label>
                        <span>{selectedStudent.email}</span>
                      </div>
                    </div>
                    <div className="student-detail-item">
                      <FaPhone className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Phone</label>
                        <span>{selectedStudent.phone}</span>
                      </div>
                    </div>
                    <div className="student-detail-item">
                      <FaUser className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Parent Name</label>
                        <span>{selectedStudent.parentName}</span>
                      </div>
                    </div>
                    <div className="student-detail-item">
                      <FaPhone className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Parent Contact</label>
                        <span>{selectedStudent.parentContact}</span>
                      </div>
                    </div>
                    <div className="student-detail-item student-detail-full">
                      <FaMapMarkerAlt className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Address</label>
                        <span>{selectedStudent.address}</span>
                      </div>
                    </div>
                    <div className="student-detail-item">
                      <FaCalendar className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Admission Date</label>
                        <span>{selectedStudent.admissionDate}</span>
                      </div>
                    </div>
                    <div className="student-detail-item student-detail-full">
                      <FaBook className="student-detail-icon" />
                      <div className="student-detail-content">
                        <label>Subjects</label>
                        <span>{selectedStudent.subjects}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="student-modal-footer">
                <button
                  className="student-btn-edit"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedStudent);
                  }}
                >
                  <FaEdit className="student-btn-icon" />
                  Edit Student
                </button>
                <button
                  className="student-btn-close"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentsPage;