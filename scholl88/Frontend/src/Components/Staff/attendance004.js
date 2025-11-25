import React, { useState } from 'react';
import './attendance004.css';

const AttendancePage = ({ onPageChange }) => {
  const [filters, setFilters] = useState({
    date: '2025-11-09',
    class: '10th',
    section: 'A'
  });

  const [attendanceData, setAttendanceData] = useState([
    { id: 1, date: '11/09/2025', class: '10th', studentName: 'Mel Parker', status: 'Absent' },
    { id: 2, date: '11/09/2025', class: '10th', studentName: 'Lucas Johnson', status: 'Present' },
    { id: 3, date: '11/09/2025', class: '10th', studentName: 'Rama', status: 'Present' },
    { id: 4, date: '11/09/2025', class: '10th', studentName: 'Johnson', status: 'Present' },
    { id: 5, date: '11/09/2025', class: '10th', studentName: 'Alden', status: 'Late' },
    { id: 6, date: '11/09/2025', class: '10th', studentName: 'Sophia', status: 'Present' }
  ]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus }
          : student
      )
    );
  };

  const handleSaveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const handleSearch = () => {
    alert(`Searching for Date: ${filters.date}, Class: ${filters.class}, Section: ${filters.section}`);
  };

  return (
    <div className="attendance-page-00409">
      <div className="page-container-00409">
        <div className="page-header-00409">
          <h1 className="page-title-00409">Attendance</h1>
          <div className="tab-buttons-00409">
            <button 
              className="tab-btn-00409 active-00409"
            >
              Attendance Entry
            </button>
            <button 
              className="tab-btn-00409"
              onClick={() => onPageChange('attendance-report')}
            >
              Attendance Report
            </button>
          </div>
        </div>

        <div className="content-card-00409">
          <div className="filters-section-00409">
            <div className="filters-grid-00409">
              <div className="filter-group-00409">
                <label>Select Date</label>
                <input 
                  type="date" 
                  className="filter-input-00409"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </div>
              
              <div className="filter-group-00409">
                <label>Select Class</label>
                <select 
                  className="filter-input-00409"
                  value={filters.class}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                >
                  <option value="10th">10th</option>
                  <option value="9th">9th</option>
                  <option value="8th">8th</option>
                </select>
              </div>
              
              <div className="filter-group-00409">
                <label>Select Section</label>
                <select 
                  className="filter-input-00409"
                  value={filters.section}
                  onChange={(e) => handleFilterChange('section', e.target.value)}
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
              
              <button className="search-btn-00409" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <div className="attendance-section-00409">
            <div className="table-container-00409">
              <table className="attendance-table-00409">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Class Selected</th>
                    <th>Student Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map(student => (
                    <tr key={student.id} className="attendance-row-00409">
                      <td className="date-cell-00409">{student.date}</td>
                      <td className="class-cell-00409">{student.class}</td>
                      <td className="student-cell-00409">{student.studentName}</td>
                      <td className="status-cell-00409">
                        <select 
                          className={`status-select-00409 ${student.status.toLowerCase()}-00409`}
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-buttons-00409">
            <button className="save-btn-00409" onClick={handleSaveAttendance}>
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;