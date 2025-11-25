import React, { useState } from 'react';
import './attendancereport005.css';

const AttendanceReport = ({ onPageChange }) => {
  const [dateRange, setDateRange] = useState({
    from: '2025-11-01',
    to: '2025-11-09'
  });

  const [filters, setFilters] = useState({
    class: '10th',
    section: 'A'
  });

  const reportData = [
    { 
      id: 1, 
      studentName: 'Mel Parker', 
      totalDays: 9, 
      present: 7, 
      absent: 1, 
      late: 1, 
      percentage: '77.8%',
      status: 'Good'
    },
    { 
      id: 2, 
      studentName: 'Lucas Johnson', 
      totalDays: 9, 
      present: 8, 
      absent: 0, 
      late: 1, 
      percentage: '88.9%',
      status: 'Good'
    },
    { 
      id: 3, 
      studentName: 'Rama', 
      totalDays: 9, 
      present: 6, 
      absent: 2, 
      late: 1, 
      percentage: '66.7%',
      status: 'Needs Attention'
    },
    { 
      id: 4, 
      studentName: 'Johnson', 
      totalDays: 9, 
      present: 9, 
      absent: 0, 
      late: 0, 
      percentage: '100%',
      status: 'Good'
    },
    { 
      id: 5, 
      studentName: 'Alden', 
      totalDays: 9, 
      present: 7, 
      absent: 1, 
      late: 1, 
      percentage: '77.8%',
      status: 'Good'
    },
    { 
      id: 6, 
      studentName: 'Sophia', 
      totalDays: 9, 
      present: 8, 
      absent: 1, 
      late: 0, 
      percentage: '88.9%',
      status: 'Good'
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (rangeType, value) => {
    setDateRange(prev => ({
      ...prev,
      [rangeType]: value
    }));
  };

  const handleGenerateReport = () => {
    alert(`Generating report from ${dateRange.from} to ${dateRange.to} for Class: ${filters.class}, Section: ${filters.section}`);
  };

  const handleExportExcel = () => {
    alert('Exporting to Excel...');
  };

  const getStatusColor = (percentage, status) => {
    if (status === 'Needs Attention') return '#dc3545';
    const percent = parseFloat(percentage);
    if (percent >= 90) return '#28a745';
    if (percent >= 75) return '#28a745';
    return '#dc3545';
  };

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Good': return '#28a745';
      case 'Needs Attention': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="attendance-report-page-00509">
      <div className="page-container-00509">
        <div className="page-header-00509">
          <h1 className="page-title-00509">Attendance Report</h1>
          <div className="tab-buttons-00509">
            <button 
              className="tab-btn-00509"
              onClick={() => onPageChange('attendance-entry')}
            >
              Attendance Entry
            </button>
            <button 
              className="tab-btn-00509 active-00509"
            >
              Attendance Report
            </button>
          </div>
        </div>

        <div className="content-card-00509">
          <div className="filters-section-00509">
            <div className="filters-grid-00509">
              <div className="filter-group-00509">
                <label>Date From</label>
                <input 
                  type="date" 
                  className="filter-input-00509"
                  value={dateRange.from}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                />
              </div>
              
              <div className="filter-group-00509">
                <label>Date To</label>
                <input 
                  type="date" 
                  className="filter-input-00509"
                  value={dateRange.to}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                />
              </div>
              
              <div className="filter-group-00509">
                <label>Select Class</label>
                <select 
                  className="filter-input-00509"
                  value={filters.class}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                >
                  <option value="10th">10th</option>
                  <option value="9th">9th</option>
                  <option value="8th">8th</option>
                </select>
              </div>
              
              <div className="filter-group-00509">
                <label>Select Section</label>
                <select 
                  className="filter-input-00509"
                  value={filters.section}
                  onChange={(e) => handleFilterChange('section', e.target.value)}
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
              
              <button className="search-btn-00509" onClick={handleGenerateReport}>
                Generate Report
              </button>
            </div>
          </div>

          <div className="report-section-00509">
            <div className="report-header-00509">
              <div className="report-info-00509">
                <h3>Attendance Summary</h3>
                <div className="date-range-00509">
                  Period: {dateRange.from} to {dateRange.to}
                </div>
              </div>
              <div className="report-stats-00509">
                <div className="stat-item-00509">
                  <span className="stat-label-00509">Total Students:</span>
                  <span className="stat-value-00509">{reportData.length}</span>
                </div>
                <div className="stat-item-00509">
                  <span className="stat-label-00509">Average Attendance:</span>
                  <span className="stat-value-00509">83.3%</span>
                </div>
              </div>
            </div>

            <div className="table-container-00509">
              <table className="report-table-00509">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Total Days</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Late</th>
                    <th>Attendance %</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(student => (
                    <tr key={student.id} className="report-row-00509">
                      <td className="student-cell-00509">{student.studentName}</td>
                      <td className="number-cell-00509">{student.totalDays}</td>
                      <td className="present-cell-00509">{student.present}</td>
                      <td className="absent-cell-00509">{student.absent}</td>
                      <td className="late-cell-00509">{student.late}</td>
                      <td className="percentage-cell-00509">
                        <span 
                          className="percentage-value-00509"
                          style={{ color: getStatusColor(student.percentage, student.status) }}
                        >
                          {student.percentage}
                        </span>
                      </td>
                      <td className="status-cell-00509">
                        <span 
                          className="status-badge-00509"
                          style={{ 
                            backgroundColor: getStatusBadgeColor(student.status)
                          }}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="action-buttons-00509">
            <button className="export-btn-00509" onClick={handleExportExcel}>
              📊 Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;