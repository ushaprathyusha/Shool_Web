import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AttendanceReport.css';

const AttendanceReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [attendanceData, setAttendanceData] = useState({});
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8080/attendance/10004');
        const data = response.data;

        // Save student info
        setStudentInfo({
          name: data.FullName,
          class: data.ClassId,
          rollNumber: data.RollNumber,
          academicYear: data.AcademicYearId
        });

        // Group attendance by month
        const grouped = {};
        data.Attendance.forEach(item => {
          const date = new Date(item.AttendanceDate);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push({
            date: item.AttendanceDate,
            day: date.toLocaleDateString('en-US', { weekday: 'long' }),
            status: item.Status.toLowerCase()
          });
        });

        setAttendanceData(grouped);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // 🧮 Stats calculator
  const calculateStats = useCallback((data) => {
    const workingDays = data.filter(d => !['weekend', 'holiday'].includes(d.status)).length;
    const presentDays = data.filter(d => d.status === 'present').length;
    const absentDays = data.filter(d => d.status === 'absent').length;

    return {
      total: workingDays,
      present: presentDays,
      absent: absentDays,
      percentage: workingDays > 0 ? Math.round((presentDays / workingDays) * 100) : 0,
      presentFraction: `${presentDays}/${workingDays}`
    };
  }, []);

  // 🎨 Status details
  const getStatusDetails = useCallback((status) => {
    const statusMap = {
      present: { label: 'Present', color: '#10B981', icon: '✅', bgColor: '#ECFDF5' },
      absent: { label: 'Absent', color: '#EF4444', icon: '❌', bgColor: '#FEF2F2' },
      holiday: { label: 'Holiday', color: '#EC4899', icon: '🎉', bgColor: '#FDF2F8' },
      weekend: { label: 'Weekend', color: '#6B7280', icon: '😊', bgColor: '#F9FAFB' }
    };
    return statusMap[status] || { label: 'Unknown', color: '#6B7280', icon: '❓', bgColor: '#F9FAFB' };
  }, []);

  // 🔥 Current streak calculator
  const calculateCurrentStreak = useCallback((data) => {
    let streak = 0;
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (let record of sorted) {
      if (record.status === 'present') streak++;
      else if (['absent', 'weekend', 'holiday'].includes(record.status)) break;
    }
    return streak;
  }, []);

  // 🧠 Data filtering
  const filterData = useCallback(() => {
    const monthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
    let data = attendanceData[monthKey] || [];

    if (statusFilter !== 'all') {
      data = data.filter(r => r.status === statusFilter);
    }

    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      data = data.filter(r => {
        const d = new Date(r.date);
        return d >= start && d <= end;
      });
    }

    setFilteredData(data);

    if (attendanceData[monthKey]) {
      setCurrentStreak(calculateCurrentStreak(attendanceData[monthKey]));
    }
  }, [selectedMonth, selectedYear, statusFilter, dateRange, attendanceData, calculateCurrentStreak]);

  useEffect(() => {
    if (!loading) filterData();
  }, [filterData, loading]);

  const stats = calculateStats(filteredData);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Month navigation
  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else setSelectedMonth(prev => prev - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else setSelectedMonth(prev => prev + 1);
  };

  const handleCurrentMonth = () => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
  };

  // Export buttons
  const handleExportPDF = () => alert('PDF export functionality will be added here');
  const handleExportExcel = () => alert('Excel export functionality will be added here');

  const clearFilters = () => {
    setStatusFilter('all');
    setDateRange({ start: '', end: '' });
  };

  if (loading) return <div className="attendance-report88">Loading attendance data...</div>;
  if (!studentInfo) return <div className="attendance-report88">No student data found.</div>;

  return (
    <div className="attendance-report88">
      {/* Header */}
      <div className="attendance-header88">
        <div className="header-main88">
          <h1 className="page-title88">Attendance Report</h1>
          <div className="student-info-horizontal88">
            <div className="info-item-horizontal88">
              <span className="info-label88">Student Name:</span>
              <span className="info-value88">{studentInfo.name}</span>
            </div>
            <div className="info-item-horizontal88">
              <span className="info-label88">Class:</span>
              <span className="info-value88">{studentInfo.class}</span>
            </div>
            <div className="info-item-horizontal88">
              <span className="info-label88">Roll No:</span>
              <span className="info-value88">{studentInfo.rollNumber}</span>
            </div>
            <div className="info-item-horizontal88">
              <span className="info-label88">Academic Year:</span>
              <span className="info-value88">{studentInfo.academicYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section-enhanced88">
        <div className="stats-cards-main88">
          <div className="stat-card88 present-card88">
            <div className="stat-icon88">✅</div>
            <div className="stat-details88">
              <div className="stat-number88">{stats.presentFraction}</div>
              <div className="stat-label88">Present Days</div>
              <div className="progress-bar88">
                <div
                  className="progress-fill88 present-fill88"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="stat-card88 absent-card88">
            <div className="stat-icon88">❌</div>
            <div className="stat-details88">
              <div className="stat-number88">{stats.absent}</div>
              <div className="stat-label88">Absent Days</div>
            </div>
          </div>

          <div className="stat-card88 percentage-card88">
            <div className="stat-icon88">📊</div>
            <div className="stat-details88">
              <div className="stat-number88">{stats.percentage}%</div>
              <div className="stat-label88">Attendance</div>
              <div className="percentage-indicator88">
                {stats.percentage >= 75
                  ? '🎉 Good'
                  : stats.percentage >= 60
                  ? '⚠️ Average'
                  : '😟 Needs Improvement'}
              </div>
            </div>
          </div>

          <div className="stat-card88 streak-card88">
            <div className="stat-icon88">🔥</div>
            <div className="stat-details88">
              <div className="stat-number88">{currentStreak}</div>
              <div className="stat-label88">Current Streak</div>
              <div className="streak-subtext88">Consecutive Present Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section-enhanced88">
        <div className="filters-main88">
          <div className="filter-group88">
            <label className="filter-label88">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="month-select88"
            >
              {monthNames.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group88">
            <label className="filter-label88">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="year-select88"
            >
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group88">
            <label className="filter-label88">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select88"
            >
              <option value="all">All Status</option>
              <option value="present">Present Only</option>
              <option value="absent">Absent Only</option>
            </select>
          </div>

          <div className="filter-group88 date-range-group88">
            <label className="filter-label88">Date Range:</label>
            <div className="date-range-inputs88">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="date-range-input88"
              />
              <span className="date-range-separator88">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="date-range-input88"
              />
            </div>
          </div>

          <div className="filter-actions88">
            <button className="clear-filters-btn88" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="quick-navigation88">
          <button className="nav-btn88 prev-btn88" onClick={handlePreviousMonth}>
            ← Previous Month
          </button>
          <button className="nav-btn88 current-btn88" onClick={handleCurrentMonth}>
            Current Month
          </button>
          <button className="nav-btn88 next-btn88" onClick={handleNextMonth}>
            Next Month →
          </button>
        </div>

        <div className="export-actions88">
          <button className="export-btn88 pdf-btn88" onClick={handleExportPDF}>
            📄 Export PDF
          </button>
          <button className="export-btn88 excel-btn88" onClick={handleExportExcel}>
            📊 Export Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-section-full88">
        <div className="section-header88">
          <h2 className="section-title88">
            Attendance Records - {monthNames[selectedMonth]} {selectedYear}
          </h2>
          <div className="records-count88">Showing {filteredData.length} records</div>
        </div>
        <div className="table-container-scroll88">
          <table className="attendance-table88">
            <thead>
              <tr>
                <th className="table-header88">Date</th>
                <th className="table-header88">Day</th>
                <th className="table-header88">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => {
                const statusInfo = getStatusDetails(record.status);
                return (
                  <tr key={index} className="table-row88">
                    <td className="table-cell88 date-cell88">{record.date}</td>
                    <td className="table-cell88 day-cell88">{record.day}</td>
                    <td className="table-cell88 status-cell88">
                      <span
                        className="status-badge88"
                        style={{
                          backgroundColor: statusInfo.bgColor,
                          color: statusInfo.color,
                          border: `1px solid ${statusInfo.color}`
                        }}
                      >
                        <span className="status-icon88">{statusInfo.icon}</span>
                        <span className="status-text88">{statusInfo.label}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="no-data-message88">
            No attendance records found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
