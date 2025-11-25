import React, { useState, useEffect } from 'react';
import './ParentDashboard.css';
import { parentDashboardAPI } from '../../Services/Parent-api';

const ParentDashboard = () => {
  const [quickStats, setQuickStats] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [months, setMonths] = useState([]);
  const [examScores, setExamScores] = useState([]);
  const [feesData, setFeesData] = useState({ fees: [], payment_progress: 0 });
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded for demo - in real app, get from authentication
  const studentId = 10001; 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          quickStatsData,
          attendanceTrendData,
          subjectPerformanceData,
          feesStatusData,
          announcementsData
        ] = await Promise.all([
          parentDashboardAPI.getQuickStats(studentId),
          parentDashboardAPI.getAttendanceTrend(studentId),
          parentDashboardAPI.getSubjectPerformance(studentId),
          parentDashboardAPI.getFeesStatus(studentId),
          parentDashboardAPI.getAnnouncements(studentId)
        ]);

        // Transform quick stats data for display
        const transformedQuickStats = [
          { icon: '🎯', value: `${quickStatsData.attendance}%`, label: 'Attendance', trend: '+2%' },
          { icon: '📚', value: `${quickStatsData.average_score}%`, label: 'Avg Score', trend: '+5%' },
          { icon: '💰', value: `$${quickStatsData.pending_fees}`, label: 'Pending Fees', status: 'Due Soon' },
          { icon: '📅', value: quickStatsData.next_ptm, label: 'Next PTM', date: 'This Month' }
        ];

        setQuickStats(transformedQuickStats);
        setAttendanceData(attendanceTrendData.attendance || []);
        setMonths(attendanceTrendData.months || []);
        setExamScores(subjectPerformanceData || []);
        setFeesData(feesStatusData);
        setAnnouncements(announcementsData || []);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="page-layout88">
        <div className="loading88">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-layout88">
        <div className="error88">Error: {error}</div>
      </div>
    );
  }

  // Recent updates data (static for now)
  const recentUpdates = [
    { icon: '📊', text: 'September attendance recorded', detail: '90% attendance rate', time: 'Today' },
    { icon: '📚', text: 'Mathematics result published', detail: 'Scored 85% in final exam', time: 'Yesterday' },
    { icon: '💰', text: 'August fee receipt generated', detail: 'Available for download', time: '2 days ago' }
  ];

  return (
    <div className="page-layout88">
      <main className="main-content88">
        <div className="page-container88">
          {/* Welcome Header */}
          <div className="welcome-header88">
            <h1 className="welcome-title88">Welcome Back! 👋</h1>
            <p className="welcome-subtitle88">Here's your child's academic overview</p>
          </div>

          <div className="dashboard-grid88">
            {/* Quick Stats - Modern Cards */}
            <div className="widget88 quick-stats-widget88">
              <div className="widget-header88">
                <h3>📊 Quick Overview</h3>
                <span className="widget-subtitle88">Current Status</span>
              </div>
              <div className="stats-grid88">
                {quickStats.map((stat, index) => (
                  <div key={index} className={`stat-card88 stat-${index + 1}88`}>
                    <div className="stat-icon88">{stat.icon}</div>
                    <div className="stat-content88">
                      <div className="stat-value88">{stat.value}</div>
                      <div className="stat-label88">{stat.label}</div>
                      <div className={`stat-trend88 ${stat.trend ? 'positive88' : 'info88'}`}>
                        {stat.trend || stat.status || stat.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Trend */}
            <div className="widget88 chart-widget88">
              <div className="widget-header88">
                <h3>📈 Attendance Trend</h3>
                <span className="widget-subtitle88">Monthly Overview</span>
              </div>
              <div className="graph-container88">
                <div className="attendance-graph88">
                  <div className="graph-header88">
                    <div className="current-stats88">
                      <span className="current-value88">
                        {attendanceData.length > 0 ? `${attendanceData[attendanceData.length - 1]}%` : '0%'}
                      </span>
                      <span className="current-label88">Current Month</span>
                    </div>
                    <div className="trend-indicator88 positive88">
                      ↑ 12% from last month
                    </div>
                  </div>
                  <div className="line-graph-visual88">
                    {attendanceData.map((value, index) => (
                      <div key={index} className="month-point88">
                        <div 
                          className="point88" 
                          style={{ height: `${value}%` }}
                          title={`${months[index] || 'Month'}: ${value}%`}
                        >
                          <span className="point-value88">{value}%</span>
                        </div>
                        <span className="month-label88">{months[index] || 'M' + (index + 1)}</span>
                      </div>
                    ))}
                    <div className="trend-line88"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="widget88 chart-widget88">
              <div className="widget-header88">
                <h3>🎯 Subject Performance</h3>
                <span className="widget-subtitle88">Term 1 Results</span>
              </div>
              <div className="graph-container88">
                <div className="performance-graph88">
                  <div className="bars-container88">
                    {examScores.map((subject, index) => (
                      <div key={subject.subject} className="subject-bar88">
                        <div className="bar-info88">
                          <span className="subject-name88">{subject.subject}</span>
                          <span className="subject-score88">{subject.score}%</span>
                          <span className={`score-trend88 ${subject.trend.includes('↑') ? 'positive88' : 'negative88'}`}>
                            {subject.trend}
                          </span>
                        </div>
                        <div className="bar-container88">
                          <div 
                            className="bar88" 
                            style={{ 
                              width: `${subject.score}%`,
                              backgroundColor: '#4C3B99'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="performance-summary88">
                    <div className="summary-item88">
                      <span className="summary-label88">Overall Average</span>
                      <span className="summary-value88">
                        {examScores.length > 0 
                          ? Math.round(examScores.reduce((sum, subject) => sum + subject.score, 0) / examScores.length) + '%'
                          : '0%'
                        }
                      </span>
                    </div>
                    <div className="summary-item88">
                      <span className="summary-label88">Top Subject</span>
                      <span className="summary-value88">
                        {examScores.length > 0 
                          ? `${examScores[0].subject} (${examScores[0].score}%)`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fees Summary */}
            <div className="widget88 fees-widget88">
              <div className="widget-header88">
                <h3>💰 Fees Status</h3>
                <span className="widget-subtitle88">Academic Year 2024</span>
              </div>
              <div className="fees-container88">
                <div className="fees-list88">
                  {feesData.fees.map((fee, index) => (
                    <div key={index} className={`fee-item88 ${fee.status}`}>
                      <div className="fee-info88">
                        <span className="fee-type88">{fee.type}</span>
                        <span className="fee-date88">{fee.date}</span>
                      </div>
                      <div className="fee-details88">
                        <span className="fee-amount88">{fee.amount}</span>
                        <span className={`status-badge88 ${fee.status}`}>
                          {fee.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="payment-progress88">
                  <div className="progress-header88">
                    <span>Payment Progress</span>
                    <span className="progress-percent88">{feesData.payment_progress}%</span>
                  </div>
                  <div className="progress-bar88">
                    <div className="progress-fill88" style={{width: `${feesData.payment_progress}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="widget88 announcements-widget88">
              <div className="widget-header88">
                <h3>📢 Announcements</h3>
                <span className="widget-subtitle88">Latest Updates</span>
              </div>
              <div className="announcements-list88">
                {announcements.map((announcement, index) => (
                  <div key={index} className={`announcement-item88 ${announcement.urgent ? 'urgent88' : ''}`}>
                    {announcement.urgent && <span className="urgent-badge88">NEW</span>}
                    <div className="announcement-content88">
                      <span className="announcement-text88">{announcement.text}</span>
                      <span className="announcement-time88">{announcement.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Updates */}
            <div className="widget88 updates-widget88">
              <div className="widget-header88">
                <h3>🔄 Recent Activity</h3>
                <span className="widget-subtitle88">Student Progress</span>
              </div>
              <div className="updates-list88">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="update-item88">
                    <span className="update-icon88">{update.icon}</span>
                    <div className="update-content88">
                      <span className="update-text88">{update.text}</span>
                      <span className="update-detail88">{update.detail}</span>
                    </div>
                    <span className="update-time88">{update.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;