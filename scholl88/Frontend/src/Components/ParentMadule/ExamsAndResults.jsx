import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExamsAndResults.css';

const ExamsAndResults = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedExam, setSelectedExam] = useState(null);
    const [marksData, setMarksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Backend API endpoint
    const API_URL = 'http://127.0.0.1:8080/students/10004/marks';

    // Fetch marks from FastAPI
    useEffect(() => {
        const fetchMarks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                if (Array.isArray(response.data)) {
                    setMarksData(response.data);
                } else {
                    setError('Invalid response format.');
                }
            } catch (err) {
                console.error('Error fetching marks:', err);
                setError('Failed to load marks data.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, []);

    // Hardcoded data for upcoming & timetable (still useful)
    const examData = {
        upcoming: [
            { id: 1, subject: 'Mathematics', date: '2024-11-15', time: '10:00 AM - 1:00 PM', duration: '3 hours', syllabus: 'Chapters 1-5', venue: 'Room 101', importance: 'High', teacher: 'Mr. Sharma' },
            { id: 2, subject: 'Science', date: '2024-11-17', time: '9:00 AM - 12:00 PM', duration: '3 hours', syllabus: 'Physics & Chemistry', venue: 'Lab 2', importance: 'Medium', teacher: 'Dr. Gupta' },
            { id: 3, subject: 'English', date: '2024-11-20', time: '11:00 AM - 2:00 PM', duration: '3 hours', syllabus: 'Grammar & Literature', venue: 'Room 205', importance: 'High', teacher: 'Ms. Patel' }
        ],
        timetable: [
            { day: 'Monday', date: '2024-11-11', exams: ['Mathematics', 'English'] },
            { day: 'Tuesday', date: '2024-11-12', exams: ['Science', 'Social Studies'] }
        ]
    };

    // Map fetched marks data to display format
    const previousResults = marksData.map((m, index) => ({
        id: index + 1,
        subject: `Exam ${m.ExamId}`,
        exam: `Exam #${m.ExamId}`,
        date: `2024-11-${10 + index}`, // Dummy dates
        marks: `${m.Marks}/100`,
        percentage: m.Marks,
        grade: m.Grade,
        classAvg: 75,
        rank: index + 1,
        totalStudents: 40,
        teacherRemarks: 'Keep it up!',
        improvement: 'Revise more for next exam'
    }));

    // Statistics
    const statistics = {
        totalUpcoming: examData.upcoming.length,
        averageScore: marksData.length
            ? (marksData.reduce((sum, m) => sum + m.Marks, 0) / marksData.length).toFixed(1)
            : 0,
        bestSubject: marksData.reduce(
            (best, m) => (m.Marks > (best?.Marks || 0) ? m : best),
            {}
        ),
        totalExams: marksData.length,
        attendance: '95%'
    };

    const getGradeColor = (grade) => {
        const colors = { 'A+': '#10B981', 'A': '#10B981', 'B+': '#3B82F6', 'B': '#3B82F6', 'C+': '#F59E0B', 'C': '#F59E0B', 'D': '#EF4444', 'F': '#DC2626' };
        return colors[grade] || '#6B7280';
    };

    const getImportanceColor = (importance) => {
        const colors = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
        return colors[importance] || '#6B7280';
    };

    const handleViewDetails = (exam, type) => setSelectedExam({ ...exam, type });
    const handleCloseDetails = () => setSelectedExam(null);
    const handleDownloadReport = (exam) => alert(`Downloading report for ${exam.subject}`);

    return (
        <div className="exams-results-page88">
            {/* Header */}
            <div className="page-header88">
                <h1 className="page-title88">Exams & Results Dashboard</h1>
                <p className="page-subtitle88">Track your exam performance in real-time</p>
            </div>

            {/* Stats Section */}
            <div className="stats-section88">
                <div className="stats-cards88">
                    <div className="stat-card88">
                        <div className="stat-icon88">📅</div>
                        <div>
                            <div className="stat-value88">{statistics.totalUpcoming}</div>
                            <div className="stat-label88">Upcoming Exams</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">📊</div>
                        <div>
                            <div className="stat-value88">{statistics.averageScore}%</div>
                            <div className="stat-label88">Average Score</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">🏆</div>
                        <div>
                            <div className="stat-value88">
                                {statistics.bestSubject?.ExamId
                                    ? `Exam ${statistics.bestSubject.ExamId}`
                                    : '-'}
                            </div>
                            <div className="stat-label88">Best Exam</div>
                        </div>
                    </div>
                    <div className="stat-card88">
                        <div className="stat-icon88">✅</div>
                        <div>
                            <div className="stat-value88">{statistics.attendance}</div>
                            <div className="stat-label88">Attendance</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="navigation-tabs88">
                <button
                    className={`tab-btn88 ${activeTab === 'upcoming' ? 'active88' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    📅 Upcoming
                </button>
                <button
                    className={`tab-btn88 ${activeTab === 'previous' ? 'active88' : ''}`}
                    onClick={() => setActiveTab('previous')}
                >
                    📊 Results
                </button>
                <button
                    className={`tab-btn88 ${activeTab === 'timetable' ? 'active88' : ''}`}
                    onClick={() => setActiveTab('timetable')}
                >
                    🗓️ Timetable
                </button>
            </div>

            {/* Content */}
            <div className="main-content88">
                {loading && <p className="loading88">Loading data...</p>}
                {error && <p className="error88">{error}</p>}

                {!loading && !error && activeTab === 'previous' && (
                    <div className="previous-results-section88">
                        <h2>Previous Exam Results</h2>
                        <table className="results-table88">
                            <thead>
                                <tr>
                                    <th>Exam</th>
                                    <th>Marks</th>
                                    <th>Grade</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previousResults.map((exam) => (
                                    <tr key={exam.id}>
                                        <td>{exam.exam}</td>
                                        <td>{exam.marks}</td>
                                        <td>
                                            <span
                                                className="grade-badge88"
                                                style={{ backgroundColor: getGradeColor(exam.grade) }}
                                            >
                                                {exam.grade}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-view88"
                                                onClick={() => handleViewDetails(exam, 'previous')}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'upcoming' && (
                    <div className="upcoming-exams-section88">
                        <h2>Upcoming Exams</h2>
                        <div className="exams-grid88">
                            {examData.upcoming.map((exam) => (
                                <div key={exam.id} className="exam-card88">
                                    <h3>{exam.subject}</h3>
                                    <p>{exam.date} | {exam.time}</p>
                                    <p>Teacher: {exam.teacher}</p>
                                    <p>Venue: {exam.venue}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamsAndResults;
