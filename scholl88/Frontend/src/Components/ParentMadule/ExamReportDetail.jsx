import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExamReportDetail.css';

/**
 * Renders the detailed view of a single exam report, including academic
 * performance, attendance, and teacher remarks.
 */
const ExamReportDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="report-container88">
      <div className="report-card88">
        {/* --- Report Header --- */}
        <header className="report-header88">
          <div className="school-info88">
            <h4>Little Rise School</h4>
            <p>Majestic, Bangalore</p>
            <p>080-2312306</p>
          </div>
          <div className="student-info-main88">
            <span>Student Report - Q1</span>
            <span>Student Name: <strong>Sasikiran</strong></span>
            <span>Roll No: <strong>23</strong></span>
            <span>Class: <strong>10</strong></span>
          </div>
          <div className="date-info88">
            <span>Date Issued: 15 Sept 2025</span>
          </div>
        </header>

        {/* --- Report Body --- */}
        <div className="report-body88">
          <div className="performance-details88">
            <h3 className="section-title88">Academic Performance</h3>
            <table className="performance-table88">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Total Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>English</td>
                  <td>85</td>
                  <td>100</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Mathematics</td>
                  <td>88</td>
                  <td>100</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Science</td>
                  <td>82</td>
                  <td>100</td>
                  <td>B+</td>
                </tr>
                <tr>
                  <td>Social Studies</td>
                  <td>89</td>
                  <td>100</td>
                  <td>A</td>
                </tr>
                 <tr>
                  <td>Hindi</td>
                  <td>86</td>
                  <td>100</td>
                  <td>A</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><strong>Average Marks: 86%</strong></td>
                  <td><strong>Overall Grade: A</strong></td>
                </tr>
              </tfoot>
            </table>

            <div className="attendance-and-remarks88">
                 <table className="attendance-summary88">
                    <thead>
                        <tr><th colSpan="2">Attendance Summary</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Working Days</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Days Present</td>
                            <td>57</td>
                        </tr>
                        <tr>
                            <td>Attendance %</td>
                            <td>95%</td>
                        </tr>
                    </tbody>
                </table>
                 <div className="remarks-section88">
                    <h3 className="section-title88">Remarks by Class Teacher</h3>
                    <p>
                        Sasikiran has shown consistent performance throughout the quarter. Needs to participate more in class discussions. Keep up the good work!
                    </p>
                    <p className="teacher-name88">Class Teacher: <strong>Mrs. Kavitha</strong></p>
                </div>
            </div>
          </div>

          <aside className="charts-container88">
            <div className="chart-wrapper88">
              <h4 className="chart-title88">Academic Performance</h4>
              <div className="chart-placeholder88">[Bar Chart Placeholder]</div>
            </div>
            <div className="chart-wrapper88">
              <h4 className="chart-title88">Attendance Summary</h4>
              <div className="chart-placeholder88">[Pie Chart Placeholder]</div>
            </div>
          </aside>
        </div>

        {/* --- Report Actions --- */}
        <footer className="report-actions88">
          <button className="report-btn88 back-btn88" onClick={() => navigate(-1)}>Back</button>
          <button className="report-btn88 close-btn88" onClick={() => navigate('/')}>Close</button>
        </footer>
      </div>
    </div>
  );
};

export default ExamReportDetail;