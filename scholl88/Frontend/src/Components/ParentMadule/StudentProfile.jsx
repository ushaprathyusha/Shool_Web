import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentProfile.css';

const StudentProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [studentData, setStudentData] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [invoiceData, setInvoiceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const STUDENT_API = "http://127.0.0.1:8080/students/10004";
    const ATTENDANCE_API = "http://127.0.0.1:8080/attendance/10004";
    const INVOICE_API = "http://127.0.0.1:8080/invoice/10004";

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [studentRes, attendanceRes, invoiceRes] = await Promise.all([
                    axios.get(STUDENT_API),
                    axios.get(ATTENDANCE_API),
                    axios.get(INVOICE_API)
                ]);

                setStudentData(studentRes.data);
                setAttendanceData(attendanceRes.data.Attendance || []);
                setInvoiceData(invoiceRes.data.Invoices || []);
            } catch (err) {
                console.error('Error fetching student details:', err);
                setError('Failed to load data from backend.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // === Map Student Info ===
    const studentPersonalInfo = studentData
        ? [
            { property: 'Name', value: `${studentData.FirstName} ${studentData.LastName}` },
            { property: 'DOB', value: studentData.DateOfBirth },
            { property: 'Gender', value: studentData.GenderId === 1 ? 'Male' : 'Female' },
            { property: 'Nationality', value: studentData.Nationality },
            { property: 'Aadhar', value: studentData.AadhaarCardNumber },
            { property: 'Blood Group', value: studentData.BloodGroupId },
            { property: 'Religion', value: studentData.ReligionId },
            { property: 'Category', value: studentData.CasteCategoryId },
            { property: 'Address', value: studentData.PermanentAddress },
            { property: 'Class', value: studentData.ClassId },
            { property: 'Section', value: studentData.SectionId },
            { property: 'Date Of Admission', value: studentData.DateOfAdmission },
            { property: 'Transport', value: studentData.RequiresTransport ? 'Yes' : 'No' }
        ]
        : [];

    // === Guardian Info (placeholder) ===
    const guardianInfo = [
        { property: 'Relation', value: 'Father' },
        { property: 'Full Name', value: 'Venkatesh' },
        { property: 'Phone Number', value: '987747483989' },
        { property: 'Occupation', value: 'Farmer' },
        { property: 'Email', value: 'venky98@gmail.com' }
    ];

    // === Fees from Invoice API ===
    const feeData = invoiceData.map(inv => ({
        date: inv.InvoiceDate,
        feeTerm: `Academic Year ${inv.AcademicYearId}`,
        status: inv.BalanceDue === 0 ? 'Paid' : 'Due',
        payments: inv.PaidTillNow.toLocaleString(),
        total: inv.TotalFee,
        balance: inv.BalanceDue
    }));

    const totalFee = feeData.reduce((sum, i) => sum + (i.total || 0), 0);
    const paidAmount = feeData.reduce((sum, i) => sum + (i.payments ? parseFloat(i.payments.replace(/,/g, '')) : 0), 0);
    const paymentProgress = totalFee > 0 ? (paidAmount / totalFee) * 100 : 0;

    // === Attendance from API ===
    const totalDays = attendanceData.length;
    const present = attendanceData.filter(a => a.Status === 'Present').length;
    const absent = attendanceData.filter(a => a.Status === 'Absent').length;
    const leave = attendanceData.filter(a => a.Status === 'Leave').length;
    const attendancePercentage = totalDays ? ((present / totalDays) * 100).toFixed(1) : 0;

    const attendanceSummary = {
        totalDays,
        present,
        absent,
        leave,
        percentage: attendancePercentage
    };

    // === Other Static Sections ===
    const extracurricularActivities = [
        { activity: 'Football Team', role: 'Player', achievements: 'Inter-school winner' },
        { activity: 'Science Club', role: 'Member', achievements: 'Fair participant' },
        { activity: 'Music Band', role: 'Keyboard Player', achievements: 'Annual day performance' }
    ];

    const communicationLog = [
        { date: '2024-10-15', type: 'Meeting', summary: 'Discussed academic progress' },
        { date: '2024-10-10', type: 'Notification', summary: 'Fee payment reminder' }
    ];

    const documents = [
        { name: 'Aadhar Card', type: 'ID Proof', uploadDate: '2024-01-15' },
        { name: 'Birth Certificate', type: 'Birth Proof', uploadDate: '2024-01-15' },
        { name: 'Previous School TC', type: 'Transfer Certificate', uploadDate: '2024-01-20' }
    ];

    // === UI Rendering ===
    if (loading) return <div className="loading88">Loading student data...</div>;
    if (error) return <div className="error88">{error}</div>;

    return (
        <div className="student-profile-page88">
            {/* Header Section */}
            <div className="profile-header-compact88">
                <div className="compact-header-content88">
                    <div className="student-basic-compact88">
                        <div className="student-avatar-compact88">
                            <div className="avatar-placeholder88">👧</div>
                        </div>
                        <div className="student-info-compact88">
                            <h1 className="student-name-compact88">{studentData?.FirstName} {studentData?.LastName}</h1>
                            <div className="student-details-compact88">
                                <span className="detail-item88">Class: {studentData?.ClassId}</span>
                                <span className="detail-item88">Section: {studentData?.SectionId}</span>
                                <span className="detail-item88">Roll: {studentData?.RollNumber}</span>
                                <span className="detail-item88">ID: {studentData?.StudentId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs88">
                <button
                    className={`tab-btn88 ${activeTab === 'overview' ? 'active88' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    📊 Overview
                </button>
                <button
                    className={`tab-btn88 ${activeTab === 'activities' ? 'active88' : ''}`}
                    onClick={() => setActiveTab('activities')}
                >
                    ⚽ Activities
                </button>
            </div>

            {/* Content */}
            <div className="profile-content88">
                {activeTab === 'overview' && (
                    <div className="overview-grid88">

                        {/* Personal Info */}
                        <div className="profile-widget88 personal-info-widget88">
                            <div className="widget-header88"><h4>👤 Student Info</h4></div>
                            <div className="info-table88">
                                {studentPersonalInfo.map((item, i) => (
                                    <div key={i} className="info-row88">
                                        <div className="info-property88">{item.property}</div>
                                        <div className="info-value88">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Guardian Info */}
                        <div className="profile-widget88 guardian-widget88">
                            <div className="widget-header88"><h4>👨‍👩‍👧 Guardian Info</h4></div>
                            <div className="info-table88">
                                {guardianInfo.map((item, i) => (
                                    <div key={i} className="info-row88">
                                        <div className="info-property88">{item.property}</div>
                                        <div className="info-value88">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fees */}
                        <div className="profile-widget88 fees-widget88">
                            <div className="widget-header88"><h4>💰 Fees & Payment</h4></div>
                            <table className="fees-table88">
                                <thead>
                                    <tr><th>Date</th><th>Term</th><th>Status</th><th>Paid</th></tr>
                                </thead>
                                <tbody>
                                    {feeData.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.date}</td>
                                            <td>{row.feeTerm}</td>
                                            <td>
                                                <span className={`status-badge88 ${row.status.toLowerCase()}`}>{row.status}</span>
                                            </td>
                                            <td className="payment-amount88">{row.payments}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="payment-progress88">
                                <div className="progress-bar88">
                                    <div className="progress-fill88" style={{ width: `${paymentProgress}%` }}></div>
                                </div>
                                <div className="progress-text88">
                                    {paymentProgress.toFixed(1)}% Paid ({paidAmount}/{totalFee})
                                </div>
                            </div>
                        </div>

                        {/* Attendance */}
                        <div className="profile-widget88 attendance-widget88">
                            <div className="widget-header88"><h4>📅 Attendance</h4></div>
                            <div className="attendance-stats88">
                                <div className="attendance-item88 present88">
                                    <div className="attendance-count88">{attendanceSummary.present}</div>
                                    <div className="attendance-label88">Present</div>
                                </div>
                                <div className="attendance-item88 absent88">
                                    <div className="attendance-count88">{attendanceSummary.absent}</div>
                                    <div className="attendance-label88">Absent</div>
                                </div>
                                <div className="attendance-item88 leave88">
                                    <div className="attendance-count88">{attendanceSummary.leave}</div>
                                    <div className="attendance-label88">Leave</div>
                                </div>
                                <div className="attendance-item88 total88">
                                    <div className="attendance-count88">{attendanceSummary.totalDays}</div>
                                    <div className="attendance-label88">Total</div>
                                </div>
                            </div>
                            <div className="attendance-percentage88">
                                <div className="percentage-circle88">
                                    <div className="percentage-value88">{attendanceSummary.percentage}%</div>
                                    <div className="percentage-label88">Overall Attendance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activities' && (
                    <div className="activities-grid88">
                        {/* Activities */}
                        <div className="profile-widget88 activities-widget88">
                            <div className="widget-header88"><h4>⚽ Extracurricular Activities</h4></div>
                            {extracurricularActivities.map((a, i) => (
                                <div key={i} className="activity-item88">
                                    <div className="activity-header88">
                                        <h5>{a.activity}</h5>
                                        <span className="activity-role88">{a.role}</span>
                                    </div>
                                    <div className="activity-achievements88">
                                        <strong>Achievements:</strong> {a.achievements}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Communication */}
                        <div className="profile-widget88 communication-widget88">
                            <div className="widget-header88"><h4>💬 Communication Log</h4></div>
                            {communicationLog.map((log, i) => (
                                <div key={i} className="log-item88">
                                    <div className="log-date88">{log.date}</div>
                                    <div className="log-type88">{log.type}</div>
                                    <div className="log-summary88">{log.summary}</div>
                                </div>
                            ))}
                        </div>

                        {/* Documents */}
                        <div className="profile-widget88 documents-widget88">
                            <div className="widget-header88"><h4>📁 Documents</h4></div>
                            {documents.map((doc, i) => (
                                <div key={i} className="document-item88">
                                    <div className="document-icon88">📄</div>
                                    <div className="document-details88">
                                        <div className="document-name88">{doc.name}</div>
                                        <div className="document-meta88">
                                            <span>{doc.type}</span>
                                            <span>Uploaded: {doc.uploadDate}</span>
                                        </div>
                                    </div>
                                    <button className="download-btn88">⬇️</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;
