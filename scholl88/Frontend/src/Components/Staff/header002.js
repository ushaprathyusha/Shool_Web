import React, { useState, useEffect } from 'react';
import './header002.css';

const Header = ({ onMenuToggle, isMobile }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('');

  const notifications = [
    { id: 1, message: 'New attendance report available', time: '2 min ago' },
    { id: 2, message: 'Exam schedule updated', time: '1 hour ago' },
    { id: 3, message: 'Parent meeting scheduled', time: '3 hours ago' }
  ];

  const teacherProfile = {
    name: 'John Doe',
    email: 'john.doe@littlerise.edu',
    phone: '+1 (555) 123-4567',
    qualification: 'M.Ed in Mathematics',
    address: '123 School Street, Education City, EC 12345',
    department: 'Mathematics',
    experience: '8 years',
    joinDate: 'January 15, 2016',
    employeeId: 'LRS-T-042',
    dateOfBirth: 'March 15, 1985',
    bloodGroup: 'O+',
    emergencyContact: '+1 (555) 987-6543',
    subjects: ['Mathematics', 'Advanced Calculus', 'Statistics'],
    classTeacher: 'Grade 10-A',
    workingHours: '8:00 AM - 3:00 PM'
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };

    const setLastLogin = () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(10, 22, 0);
      const lastLoginString = yesterday.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setLastLoginTime(lastLoginString);
    };

    updateTime();
    setLastLogin();
    
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-00209">
      <div className="header-left-00209">
        {isMobile && (
          <button 
            className="mobile-menu-btn-00209"
            onClick={onMenuToggle}
          >
            ☰
          </button>
        )}
      </div>

      <div className="header-right-00209">
        <div className="login-info-section-00209">
          <div className="login-time-00209 current-00209">
            <div className="time-content-00209">
              <span className="time-label-00209">Current Login</span>
              <span className="live-time-00209">{currentTime}</span>
            </div>
          </div>
          <div className="login-time-00209 last-00209">
            <div className="time-content-00209">
              <span className="time-label-00209">Last Login</span>
              <span>{lastLoginTime}</span>
            </div>
          </div>
        </div>

        <div className="header-actions-00209">
          <div className="action-item-00209 help-container-00209">
            <button 
              className="action-btn-00209 help-btn-00209"
              onClick={() => setShowHelp(!showHelp)}
              onBlur={() => setTimeout(() => setShowHelp(false), 200)}
            >
              <span className="btn-icon-00209">💡</span>
              {!isMobile && <span className="btn-text-00209">Help</span>}
            </button>
            {showHelp && (
              <div className="help-dropdown-00209">
                <div className="help-item-00209">📖 User Guide</div>
                <div className="help-item-00209">🎥 Video Tutorials</div>
                <div className="help-item-00209">📞 Contact Support</div>
                <div className="help-item-00209">❓ FAQ</div>
              </div>
            )}
          </div>

          <div className="action-item-00209 notification-container-00209">
            <button 
              className="action-btn-00209 notification-btn-00209"
              onClick={() => setShowNotifications(!showNotifications)}
              onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
            >
              <span className="btn-icon-00209">🔔</span>
              {!isMobile && <span className="btn-text-00209">Alerts</span>}
              <span className="notification-badge-00209">3</span>
            </button>
            {showNotifications && (
              <div className="notification-dropdown-00209">
                <div className="notification-header-00209">
                  <h4>📢 Notifications</h4>
                  <span className="notification-count-00209">3 new</span>
                </div>
                <div className="notification-list-00209">
                  {notifications.map(notification => (
                    <div key={notification.id} className="notification-item-00209">
                      <div className="notification-message-00209">{notification.message}</div>
                      <div className="notification-time-00209">{notification.time}</div>
                    </div>
                  ))}
                </div>
                <div className="notification-footer-00209">
                  <button className="view-all-btn-00209">View All Notifications</button>
                </div>
              </div>
            )}
          </div>

          <div className="action-item-00209 profile-container-00209">
            <button 
              className="action-btn-00209 profile-btn-00209"
              onClick={() => setShowProfile(!showProfile)}
              onBlur={() => setTimeout(() => setShowProfile(false), 200)}
            >
              <div className="profile-avatar-00209">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Profile" 
                />
              </div>
              {!isMobile && (
                <>
                  <span className="btn-text-00209">Profile</span>
                  <span className="dropdown-arrow-00209">▼</span>
                </>
              )}
            </button>
            {showProfile && (
              <div className="profile-dropdown-00209">
                <div className="profile-header-00209">
                  <div className="profile-avatar-large-00209">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                      alt="Profile" 
                    />
                  </div>
                  <div className="profile-basic-info-00209">
                    <h4>{teacherProfile.name}</h4>
                    <p className="department-00209">{teacherProfile.department} Teacher</p>
                    <p className="employee-id-00209">ID: {teacherProfile.employeeId}</p>
                  </div>
                </div>
                <div className="profile-details-00209">
                  <div className="profile-section-00209">
                    <h5>Personal Information</h5>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">📧</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.email}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">📱</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.phone}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">🎓</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.qualification}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">📍</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section-00209">
                    <h5>Professional Details</h5>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">⏰</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.experience} Experience</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">📅</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">Joined {teacherProfile.joinDate}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">🕒</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">{teacherProfile.workingHours}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">👨‍🏫</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">Class Teacher: {teacherProfile.classTeacher}</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section-00209">
                    <h5>Additional Information</h5>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">🆔</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">DOB: {teacherProfile.dateOfBirth}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">💉</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">Blood Group: {teacherProfile.bloodGroup}</span>
                      </div>
                    </div>
                    <div className="profile-field-00209">
                      <span className="field-icon-00209">🚨</span>
                      <div className="field-content-00209">
                        <span className="field-value-00209">Emergency: {teacherProfile.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-section-00209">
                    <h5>Subjects Taught</h5>
                    <div className="subjects-list-00209">
                      {teacherProfile.subjects.map((subject, index) => (
                        <span key={index} className="subject-tag-00209">{subject}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;