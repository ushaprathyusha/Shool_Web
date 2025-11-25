import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ExamReports.css';

const ExamReports = () => {
    const [searchTerm] = useState('');

    // Sample exam reports data
    const examReports = [
        {
            id: 1,
            name: 'Unit Test - 1',
            date: '2024-09-15',
            grade: 'A',
            marks: 85,
            classAvg: 78,
            attendance: '95%',
            rank: 5,
            totalStudents: 40
        },
        {
            id: 2,
            name: 'Unit Test - 2',
            date: '2024-10-20',
            grade: 'B+',
            marks: 82,
            classAvg: 75,
            attendance: '90%',
            rank: 8,
            totalStudents: 40
        },
        {
            id: 3,
            name: 'Mid-Term Examination',
            date: '2024-11-15',
            grade: 'A',
            marks: 87,
            classAvg: 72,
            attendance: '92%',
            rank: 3,
            totalStudents: 40
        },
        {
            id: 4,
            name: 'Final Examination',
            date: '2024-12-20',
            grade: 'A-',
            marks: 84,
            classAvg: 70,
            attendance: '88%',
            rank: 6,
            totalStudents: 40
        }
    ];

    // Filter reports based on search term
    const filteredReports = examReports.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Quick statistics
    const statistics = {
        totalExams: examReports.length,
        bestScore: Math.max(...examReports.map(r => r.marks)),
        averageScore: (examReports.reduce((sum, r) => sum + r.marks, 0) / examReports.length).toFixed(1),
        bestSubject: 'Mathematics'
    };

    const getGradeColor = (grade) => {
        const gradeColors = {
            'A+': '#10B981',
            'A': '#10B981',
            'A-': '#34D399',
            'B+': '#3B82F6',
            'B': '#3B82F6',
            'B-': '#60A5FA',
            'C+': '#F59E0B',
            'C': '#F59E0B',
            'C-': '#FBBF24',
            'D': '#EF4444',
            'F': '#DC2626'
        };
        return gradeColors[grade] || '#6B7280';
    };

    return (
        <div className="exam-reports-page88">
            {/* Header Section */}
            <div className="reports-header88">
                <div className="header-content88">
                    <h1 className="page-title88">Exam Reports</h1>
                    <p className="page-subtitle88">View and analyze student performance</p>
                </div>
            </div>

            {/* Quick Statistics */}
            <div className="stats-section88">
                <div className="stats-cards88">
                    <div className="stat-card88">
                        <div className="stat-icon88">📊</div>
                        <div className="stat-details88">
                            <div className="stat-value88">{statistics.totalExams}</div>
                            <div className="stat-label88">Total Exams</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">⭐</div>
                        <div className="stat-details88">
                            <div className="stat-value88">{statistics.bestScore}%</div>
                            <div className="stat-label88">Best Score</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">📈</div>
                        <div className="stat-details88">
                            <div className="stat-value88">{statistics.averageScore}%</div>
                            <div className="stat-label88">Average</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">🎯</div>
                        <div className="stat-details88">
                            <div className="stat-value88">{statistics.bestSubject}</div>
                            <div className="stat-label88">Best Subject</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reports Table */}
            <div className="reports-table-section88">
                <div className="table-container88">
                    <table className="reports-table88">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Date</th>
                                <th>Grade</th>
                                <th>Marks</th>
                                <th>Class Avg</th>
                                <th>Attendance</th>
                                <th>Rank</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="report-row88">
                                    <td className="exam-name88">
                                        <strong>{report.name}</strong>
                                    </td>
                                    <td>{report.date}</td>
                                    <td>
                                        <span 
                                            className="grade-badge88"
                                            style={{ backgroundColor: getGradeColor(report.grade) }}
                                        >
                                            {report.grade}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="marks-display88">
                                            <strong>{report.marks}%</strong>
                                            <div className="progress-bar88">
                                                <div 
                                                    className="progress-fill88"
                                                    style={{ width: `${report.marks}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="class-avg88">{report.classAvg}%</span>
                                    </td>
                                    <td>
                                        <span className="attendance-badge88">{report.attendance}</span>
                                    </td>
                                    <td>
                                        <span className="rank-badge88">
                                            #{report.rank} of {report.totalStudents}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons88">
                                            <Link 
                                                to="/exam-report-detail" 
                                                className="btn-view88"
                                            >
                                                View
                                            </Link>
                                            <button className="btn-download88">
                                                Download
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredReports.length === 0 && (
                        <div className="no-results88">
                            <div className="no-results-icon88">📭</div>
                            <h3>No exam reports found</h3>
                            <p>Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamReports;