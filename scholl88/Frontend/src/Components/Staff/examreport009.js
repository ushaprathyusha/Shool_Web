import React, { useState } from 'react';
import './examreport009.css';

const ExamReportPage = ({ onPageChange }) => {
  const [activeView, setActiveView] = useState('studentReports');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const studentsData = [
    {
      id: 1,
      name: 'Mel Parker',
      class: '10th',
      section: 'A',
      parentMobile: '+91 9876543210',
      percentage: 85.5,
      subjects: [
        { name: 'Maths', marks: 92, total: 100, grade: 'A+' },
        { name: 'English', marks: 78, total: 100, grade: 'B+' },
        { name: 'Science', marks: 88, total: 100, grade: 'A' },
        { name: 'Social', marks: 82, total: 100, grade: 'A' },
        { name: 'Physics', marks: 90, total: 100, grade: 'A+' },
        { name: 'Chemistry', marks: 84, total: 100, grade: 'A' }
      ],
      attendance: {
        present: 45,
        total: 50,
        percentage: 90
      },
      performance: {
        strong: ['Maths', 'Physics'],
        average: ['Science', 'Chemistry', 'Social'],
        weak: ['English']
      }
    },
    {
      id: 2,
      name: 'Lucas Johnson',
      class: '10th',
      section: 'A',
      parentMobile: '+91 9876543211',
      percentage: 78.2,
      subjects: [
        { name: 'Maths', marks: 85, total: 100, grade: 'A' },
        { name: 'English', marks: 72, total: 100, grade: 'B' },
        { name: 'Science', marks: 80, total: 100, grade: 'A' },
        { name: 'Social', marks: 75, total: 100, grade: 'B+' },
        { name: 'Physics', marks: 78, total: 100, grade: 'B+' },
        { name: 'Chemistry', marks: 79, total: 100, grade: 'B+' }
      ],
      attendance: {
        present: 42,
        total: 50,
        percentage: 84
      },
      performance: {
        strong: ['Science'],
        average: ['Maths', 'Chemistry', 'Physics'],
        weak: ['English', 'Social']
      }
    },
    {
      id: 3,
      name: 'Rama',
      class: '10th',
      section: 'A',
      parentMobile: '+91 9876543212',
      percentage: 92.8,
      subjects: [
        { name: 'Maths', marks: 95, total: 100, grade: 'A+' },
        { name: 'English', marks: 90, total: 100, grade: 'A+' },
        { name: 'Science', marks: 94, total: 100, grade: 'A+' },
        { name: 'Social', marks: 92, total: 100, grade: 'A+' },
        { name: 'Physics', marks: 93, total: 100, grade: 'A+' },
        { name: 'Chemistry', marks: 91, total: 100, grade: 'A+' }
      ],
      attendance: {
        present: 48,
        total: 50,
        percentage: 96
      },
      performance: {
        strong: ['Maths', 'Science', 'Physics', 'Chemistry', 'English', 'Social'],
        average: [],
        weak: []
      }
    }
  ];

  const teacherAnalytics = {
    classPerformance: {
      maths: { average: 87, strong: 65, weak: 15 },
      english: { average: 72, strong: 40, weak: 35 },
      science: { average: 85, strong: 60, weak: 20 },
      social: { average: 78, strong: 45, weak: 25 },
      physics: { average: 82, strong: 55, weak: 20 },
      chemistry: { average: 80, strong: 50, weak: 25 }
    },
    attendance: {
      average: 88,
      good: 70,
      needsImprovement: 30
    },
    insights: [
      "Students are performing exceptionally well in Mathematics",
      "English scores need improvement - consider additional support",
      "Science subjects show consistent performance",
      "Attendance rate is good overall"
    ]
  };

  const handleViewReport = (student) => {
    setSelectedStudent(student);
    setShowReportModal(true);
  };

  const handleShareWhatsApp = (student) => {
    const message = `Student Report for ${student.name}\nClass: ${student.class} ${student.section}\nOverall Percentage: ${student.percentage}%\n\nView detailed report for performance analysis.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${student.parentMobile.replace(/\D/g, '')}?text=${encodedMessage}`, '_blank');
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return '#28a745';
    if (percentage >= 75) return '#ffc107';
    return '#dc3545';
  };

  const renderStudentReports = () => (
    <div className="reports-section09">
      <div className="section-header09">
        <h3>Student Exam Reports</h3>
        <div className="total-count09">Total Students: {studentsData.length}</div>
      </div>

      <div className="table-container09">
        <table className="reports-table09">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Parent Mobile</th>
              <th>Overall %</th>
              <th>Attendance %</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map(student => (
              <tr key={student.id} className="report-row09">
                <td className="student-name09">{student.name}</td>
                <td className="student-class09">{student.class}</td>
                <td className="student-section09">{student.section}</td>
                <td className="parent-mobile09">{student.parentMobile}</td>
                <td className="percentage09">
                  <span 
                    className="percentage-badge09"
                    style={{ backgroundColor: getPerformanceColor(student.percentage) }}
                  >
                    {student.percentage}%
                  </span>
                </td>
                <td className="attendance09">
                  <span className="attendance-badge09">{student.attendance.percentage}%</span>
                </td>
                <td className="actions09">
                  <button 
                    className="action-btn09 view-btn09"
                    onClick={() => handleViewReport(student)}
                  >
                    👁️ View
                  </button>
                  <button 
                    className="action-btn09 share-btn09"
                    onClick={() => handleShareWhatsApp(student)}
                  >
                    📤 Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeacherAnalytics = () => (
    <div className="analytics-section09">
      <div className="section-header09">
        <h3>Class Performance Analytics</h3>
        <div className="analytics-summary09">
          Overall Class Average: <span className="highlight09">82.5%</span>
        </div>
      </div>

      <div className="analytics-grid09">
        {/* Subject Performance */}
        <div className="analytics-card09">
          <h4>Subject-wise Performance</h4>
          <div className="subject-bars09">
            {Object.entries(teacherAnalytics.classPerformance).map(([subject, data]) => (
              <div key={subject} className="subject-bar09">
                <div className="subject-name09">{subject}</div>
                <div className="bar-container09">
                  <div 
                    className="performance-bar09"
                    style={{ width: `${data.average}%` }}
                    data-percentage={data.average}
                  >
                    <span className="bar-label09">{data.average}%</span>
                  </div>
                </div>
                <div className="performance-stats09">
                  <span className="strong09">Strong: {data.strong}%</span>
                  <span className="weak09">Weak: {data.weak}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Analytics */}
        <div className="analytics-card09">
          <h4>Attendance Overview</h4>
          <div className="attendance-chart09">
            <div className="chart-circle09">
              <div 
                className="circle-progress09"
                style={{ 
                  background: `conic-gradient(#28a745 ${teacherAnalytics.attendance.average * 3.6}deg, #e0e0e0 0deg)` 
                }}
              >
                <span className="progress-text09">{teacherAnalytics.attendance.average}%</span>
              </div>
            </div>
            <div className="attendance-stats09">
              <div className="stat-item09 good09">
                <span className="stat-label09">Good Attendance</span>
                <span className="stat-value09">{teacherAnalytics.attendance.good}%</span>
              </div>
              <div className="stat-item09 needs-improvement09">
                <span className="stat-label09">Needs Improvement</span>
                <span className="stat-value09">{teacherAnalytics.attendance.needsImprovement}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="analytics-card09 insights09">
          <h4>Key Insights & Recommendations</h4>
          <div className="insights-list09">
            {teacherAnalytics.insights.map((insight, index) => (
              <div key={index} className="insight-item09">
                <span className="insight-icon09">💡</span>
                <span className="insight-text09">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentReportModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="modal-overlay09">
        <div className="report-modal09">
          <div className="modal-header09">
            <h3>Detailed Report - {selectedStudent.name}</h3>
            <button 
              className="close-btn09"
              onClick={() => setShowReportModal(false)}
            >
              ✕
            </button>
          </div>

          <div className="modal-content09">
            {/* Student Summary */}
            <div className="student-summary09">
              <div className="summary-card09">
                <h4>Overall Performance</h4>
                <div className="summary-stats09">
                  <div className="stat09">
                    <span className="stat-label09">Overall Percentage</span>
                    <span className="stat-value09" style={{ color: getPerformanceColor(selectedStudent.percentage) }}>
                      {selectedStudent.percentage}%
                    </span>
                  </div>
                  <div className="stat09">
                    <span className="stat-label09">Attendance</span>
                    <span className="stat-value09">{selectedStudent.attendance.percentage}%</span>
                  </div>
                  <div className="stat09">
                    <span className="stat-label09">Strong Subjects</span>
                    <span className="stat-value09">{selectedStudent.performance.strong.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Performance Chart */}
            <div className="subject-performance09">
              <h4>Subject-wise Marks</h4>
              <div className="marks-chart09">
                {selectedStudent.subjects.map(subject => (
                  <div key={subject.name} className="subject-mark09">
                    <div className="subject-info09">
                      <span className="subject-name09">{subject.name}</span>
                      <span className="subject-grade09">{subject.grade}</span>
                    </div>
                    <div className="mark-bar09">
                      <div 
                        className="mark-fill09"
                        style={{ width: `${subject.marks}%` }}
                      ></div>
                      <span className="mark-text09">{subject.marks}/{subject.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analysis */}
            <div className="performance-analysis09">
              <h4>Performance Analysis</h4>
              <div className="analysis-grid09">
                <div className="analysis-card09 strong09">
                  <h5>🏆 Strong Areas</h5>
                  <div className="subjects-list09">
                    {selectedStudent.performance.strong.map(subject => (
                      <span key={subject} className="subject-tag09">{subject}</span>
                    ))}
                  </div>
                </div>
                <div className="analysis-card09 weak09">
                  <h5>📚 Needs Improvement</h5>
                  <div className="subjects-list09">
                    {selectedStudent.performance.weak.map(subject => (
                      <span key={subject} className="subject-tag09">{subject}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Report */}
            <div className="attendance-report09">
              <h4>Attendance Summary (Last Month)</h4>
              <div className="attendance-details09">
                <div className="attendance-stats09">
                  <span>Present: {selectedStudent.attendance.present} days</span>
                  <span>Total: {selectedStudent.attendance.total} days</span>
                  <span>Percentage: {selectedStudent.attendance.percentage}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions09">
            <button 
              className="share-report-btn09"
              onClick={() => handleShareWhatsApp(selectedStudent)}
            >
              📤 Share via WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="exam-report-page09">
      <div className="page-container09">
        <div className="page-header09">
          <h1 className="page-title09">Exam Reports & Analytics</h1>
        </div>

        <div className="view-toggle09">
          <button 
            className={`toggle-btn09 ${activeView === 'studentReports' ? 'active09' : ''}`}
            onClick={() => setActiveView('studentReports')}
          >
            📋 Student Reports
          </button>
          <button 
            className={`toggle-btn09 ${activeView === 'teacherAnalytics' ? 'active09' : ''}`}
            onClick={() => setActiveView('teacherAnalytics')}
          >
            📊 Teacher Analytics
          </button>
        </div>

        <div className="content-card09">
          {activeView === 'studentReports' ? renderStudentReports() : renderTeacherAnalytics()}
        </div>

        {showReportModal && renderStudentReportModal()}
      </div>
    </div>
  );
};

export default ExamReportPage;