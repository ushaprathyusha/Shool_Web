import React from 'react';
import './class-subject007.css';

const ClassesSubjectsPage = ({ onPageChange }) => {
  const classesData = [
    { id: 1, className: 'Class 1', subject: 'English' },
    { id: 2, className: 'Class 2', subject: 'English' },
    { id: 3, className: 'Class 3', subject: 'English' },
    { id: 4, className: 'Class 4', subject: 'English' },
    { id: 5, className: 'Class 5', subject: 'English' },
    { id: 6, className: 'Class 6', subject: 'Maths' },
    { id: 7, className: 'Class 7', subject: 'Maths' },
    { id: 8, className: 'Class 8', subject: 'Maths' },
    { id: 9, className: 'Class 9', subject: 'Maths' },
    { id: 10, className: 'Class 10', subject: 'Maths' }
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      'english': { 
        bg: '#4C3B99', 
        gradient: 'linear-gradient(135deg, #4C3B99, #6A5BE2)', 
        icon: '📚',
        textColor: '#FFFFFF'
      },
      'maths': { 
        bg: '#28a745', 
        gradient: 'linear-gradient(135deg, #28a745, #20c997)', 
        icon: '🧮',
        textColor: '#FFFFFF'
      },
      'science': { 
        bg: '#dc3545', 
        gradient: 'linear-gradient(135deg, #dc3545, #e74c3c)', 
        icon: '🔬',
        textColor: '#FFFFFF'
      },
      'social': { 
        bg: '#ffc107', 
        gradient: 'linear-gradient(135deg, #ffc107, #ffd54f)', 
        icon: '🌍',
        textColor: '#333333'
      }
    };
    return colors[subject.toLowerCase()] || { 
      bg: '#6c757d', 
      gradient: 'linear-gradient(135deg, #6c757d, #868e96)', 
      icon: '📖',
      textColor: '#FFFFFF'
    };
  };

  return (
    <div className="classes-subjects-page-00709">
      <div className="page-container-00709">
        <div className="page-header-00709">
          <div className="header-content-00709">
            <div className="title-icon-00709">🏫</div>
            <div className="header-text-00709">
              <h1 className="page-title-00709">Classes & Subjects</h1>
              <p className="page-subtitle-00709">Teaching Assignments Overview</p>
            </div>
          </div>
        </div>

        <div className="stats-section-00709">
          <div className="stat-card-00709">
            <div className="stat-icon-00709">📋</div>
            <div className="stat-details-00709">
              <div className="stat-number-00709">{classesData.length}</div>
              <div className="stat-label-00709">Total Classes</div>
            </div>
          </div>
          <div className="stat-card-00709">
            <div className="stat-icon-00709">🎯</div>
            <div className="stat-details-00709">
              <div className="stat-number-00709">{new Set(classesData.map(item => item.subject)).size}</div>
              <div className="stat-label-00709">Subjects</div>
            </div>
          </div>
        </div>

        <div className="content-card-00709">
          <div className="table-section-00709">
            {/* Mobile View */}
            <div className="mobile-classes-list-00709">
              {classesData.map((item) => {
                const subjectData = getSubjectColor(item.subject);
                return (
                  <div key={item.id} className="mobile-class-item-00709">
                    <div className="class-info-00709">
                      <div className="class-icon-00709">🏫</div>
                      <div className="class-details-00709">
                        <div className="class-name-00709">{item.className}</div>
                        <div className="class-meta-00709">Teaching Assignment</div>
                      </div>
                    </div>
                    <div 
                      className="subject-badge-00709"
                      style={{ 
                        background: subjectData.gradient,
                        color: subjectData.textColor
                      }}
                    >
                      <span className="subject-icon-00709">{subjectData.icon}</span>
                      <span className="subject-name-00709">{item.subject}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table */}
            <div className="desktop-table-container-00709">
              <table className="classes-table-00709">
                <thead>
                  <tr>
                    <th className="class-column-00709">
                      <div className="header-cell-00709">
                        <span className="header-icon-00709">🎓</span>
                        Class Name
                      </div>
                    </th>
                    <th className="subject-column-00709">
                      <div className="header-cell-00709">
                        <span className="header-icon-00709">📚</span>
                        Assigned Subject
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classesData.map((item, index) => {
                    const subjectData = getSubjectColor(item.subject);
                    return (
                      <tr key={item.id} className={`table-row-00709 ${index % 2 === 0 ? 'even-00709' : 'odd-00709'}`}>
                        <td className="class-cell-00709">
                          <div className="class-content-00709">
                            <div className="class-icon-00709">🏫</div>
                            <div className="class-info-desktop-00709">
                              <span className="class-name-00709">{item.className}</span>
                              <span className="class-assignment-00709">Teaching Assignment</span>
                            </div>
                          </div>
                        </td>
                        <td className="subject-cell-00709">
                          <div 
                            className="subject-content-00709"
                            style={{ 
                              background: subjectData.gradient,
                              color: subjectData.textColor
                            }}
                          >
                            <span className="subject-icon-00709">{subjectData.icon}</span>
                            <span className="subject-name-00709">{item.subject}</span>
                            <div className="subject-status-00709">Active</div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesSubjectsPage;