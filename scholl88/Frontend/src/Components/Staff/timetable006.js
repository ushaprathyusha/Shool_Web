import React, { useState } from 'react';
import './timetable006.css';

const Timetable = () => {
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [swapRequest, setSwapRequest] = useState('');

  // Sample data - replace with actual data from your backend
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // 7 periods with lunch break as a separate column after period 4
  const periods = [
    { id: 1, time: '8:00-8:45' },
    { id: 2, time: '8:45-9:30' },
    { id: 3, time: '9:30-10:15' },
    { id: 4, time: '10:15-11:00' },
    { id: 'lunch', time: 'LUNCH', duration: '11:00-11:30' },
    { id: 5, time: '11:30-12:15' },
    { id: 6, time: '12:15-1:00' },
    { id: 7, time: '1:00-1:45' },
  ];

  // Complete timetable data for all days and periods
  const timetableData = {
    Monday: {
      1: { class: 'Class 8A', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      2: { class: 'Class 9B', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      3: { class: 'Class 7C', subject: 'Mathematics', classroom: 'Room 102', teacher: 'You' },
      4: { class: 'Class 6A', subject: 'Chemistry', classroom: 'Lab B', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'Class 10A', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      6: { class: 'Class 8B', subject: 'Mathematics', classroom: 'Room 103', teacher: 'You' },
      7: { class: 'Class 9C', subject: 'Science Club', classroom: 'Room 201', teacher: 'You' },
    },
    Tuesday: {
      1: { class: 'Class 7A', subject: 'Physics', classroom: 'Lab B', teacher: 'You' },
      2: { class: 'Class 8C', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      3: { class: 'Class 9A', subject: 'Chemistry', classroom: 'Lab A', teacher: 'You' },
      4: { class: 'Class 10B', subject: 'Mathematics', classroom: 'Room 102', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'All Staff', subject: 'Team Meeting', classroom: 'Conference', teacher: 'All Staff' },
      6: { class: 'Class 7B', subject: 'Physics', classroom: 'Lab B', teacher: 'You' },
      7: { class: 'Class 8D', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
    },
    Wednesday: {
      1: { class: 'Class 10C', subject: 'Mathematics', classroom: 'Room 103', teacher: 'You' },
      2: { class: 'Class 8E', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      3: { class: 'Class 9E', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      4: { class: 'Class 7D', subject: 'Chemistry', classroom: 'Lab B', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'Class 8F', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      6: { class: 'Dept. Staff', subject: 'Department Meeting', classroom: 'Conference', teacher: 'Dept. Staff' },
      7: { class: 'Class 10D', subject: 'Mathematics', classroom: 'Room 102', teacher: 'You' },
    },
    Thursday: {
      1: { class: 'Class 9F', subject: 'Chemistry', classroom: 'Lab A', teacher: 'You' },
      2: { class: 'Class 7E', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      3: { class: 'Class 8G', subject: 'Physics', classroom: 'Lab B', teacher: 'You' },
      4: { class: 'Class 10E', subject: 'Mathematics', classroom: 'Room 103', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'All Teachers', subject: 'Professional Development', classroom: 'Library', teacher: 'All Teachers' },
      6: { class: 'Class 9G', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      7: { class: 'Class 7F', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
    },
    Friday: {
      1: { class: 'Class 10F', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      2: { class: 'Class 8I', subject: 'Physics', classroom: 'Lab B', teacher: 'You' },
      3: { class: 'Class 9H', subject: 'Chemistry', classroom: 'Lab A', teacher: 'You' },
      4: { class: 'Class 7G', subject: 'Mathematics', classroom: 'Room 102', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'All Students', subject: 'Assembly', classroom: 'Auditorium', teacher: 'All Students' },
      6: { class: 'Class 10G', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      7: { class: 'Class 8J', subject: 'Mathematics', classroom: 'Room 103', teacher: 'You' },
    },
    Saturday: {
      1: { class: 'Class 9I', subject: 'Mathematics', classroom: 'Room 101', teacher: 'You' },
      2: { class: 'Class 8K', subject: 'Physics', classroom: 'Lab A', teacher: 'You' },
      3: { class: 'Class 10H', subject: 'Chemistry', classroom: 'Lab B', teacher: 'You' },
      4: { class: 'Class 7H', subject: 'Mathematics', classroom: 'Room 102', teacher: 'You' },
      lunch: { isBreak: true },
      5: { class: 'Planning', subject: 'Weekly Review', classroom: 'Office', teacher: 'You' },
      6: { class: 'Planning', subject: 'Lesson Planning', classroom: 'Office', teacher: 'You' },
      7: { class: '', subject: '', classroom: '', teacher: '' },
    },
  };

  // Sample list of teachers
  const teachers = [
    { id: 1, name: 'Dr. Smith (Math)' },
    { id: 2, name: 'Prof. Johnson (Physics)' },
    { id: 3, name: 'Ms. Davis (Chemistry)' },
    { id: 4, name: 'Mr. Wilson (Biology)' },
    { id: 5, name: 'Dr. Brown (CS)' },
  ];

  const handleSwapClick = (day, period) => {
    setSelectedPeriod({ day, period });
    setShowSwapModal(true);
  };

  const handleRevokeClick = (day, period) => {
    const periodInfo = getPeriodInfo(day, period);
    if (periodInfo && window.confirm(`Are you sure you want to revoke your ${periodInfo.subject} class for ${periodInfo.class} on ${day}, Period ${period}?`)) {
      alert(`Revoke request sent for ${day}, Period ${period}`);
      // Send revoke request to backend
    }
  };

  const handleSubmitSwap = () => {
    if (!selectedTeacher) {
      alert('Please select a teacher');
      return;
    }

    const selectedTeacherInfo = teachers.find(teacher => teacher.id === parseInt(selectedTeacher));
    const periodInfo = getPeriodInfo(selectedPeriod.day, selectedPeriod.period);
    
    console.log('Swap Request:', {
      from: selectedPeriod,
      class: periodInfo.class,
      subject: periodInfo.subject,
      to: selectedTeacherInfo.name,
      message: swapRequest
    });

    alert(`Swap request for ${periodInfo.class} - ${periodInfo.subject} sent to ${selectedTeacherInfo.name} successfully!`);
    setShowSwapModal(false);
    setSelectedTeacher('');
    setSwapRequest('');
  };

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  const getPeriodInfo = (day, periodId) => {
    return timetableData[day]?.[periodId];
  };

  const isBreakOrMeeting = (periodInfo) => {
    return periodInfo && 
           (periodInfo.subject?.includes('Meeting') ||
            periodInfo.subject?.includes('Assembly') ||
            periodInfo.subject?.includes('Planning') ||
            periodInfo.subject?.includes('Development') ||
            periodInfo.subject?.includes('Review') ||
            periodInfo.subject?.includes('Club') ||
            periodInfo.subject?.includes('Office Hours'));
  };

  const renderPeriodCell = (day, period) => {
    const periodInfo = getPeriodInfo(day, period.id);
    
    if (period.id === 'lunch') {
      return (
        <td key="lunch" className="lunch-break-cell-00609">
          <div className="lunch-break-content-00609">
            <div className="lunch-icon-00609">🍽️</div>
            <div className="break-text-00609">
              <strong>LUNCH</strong>
              <small>{period.duration}</small>
            </div>
          </div>
        </td>
      );
    }

    const isSpecialPeriod = isBreakOrMeeting(periodInfo);
    const isEmpty = !periodInfo || !periodInfo.class;
    
    return (
      <td 
        key={period.id} 
        className={`period-cell-00609 ${periodInfo && !isEmpty ? 'has-class-00609' : ''} ${isEmpty ? 'empty-cell-00609' : ''}`}
      >
        {periodInfo && !isEmpty ? (
          <div className="class-info-00609">
            <div className="class-name-00609">{periodInfo.class}</div>
            <div className="subject-00609">{periodInfo.subject}</div>
            <div className="classroom-00609">{periodInfo.classroom}</div>
            {!isSpecialPeriod && periodInfo.teacher === 'You' && (
              <div className="actions-00609">
                <button 
                  className="btn-00609 btn-swap-00609"
                  onClick={() => handleSwapClick(day, period.id)}
                >
                  Swap
                </button>
                <button 
                  className="btn-00609 btn-revoke-00609"
                  onClick={() => handleRevokeClick(day, period.id)}
                >
                  Revoke
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-content-00609">
            <span className="empty-text-00609">Free</span>
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="timetable-container-00609">
      <div className="timetable-header-00609">
        <div className="header-icon-00609">📅</div>
        <div className="header-text-00609">
          <h1>Weekly Timetable</h1>
          <p>Your teaching schedule for the week</p>
        </div>
      </div>

      <div className="stats-overview-00609">
        <div className="stat-item-00609">
          <div className="stat-number-00609">{days.length}</div>
          <div className="stat-label-00609">Days</div>
        </div>
        <div className="stat-item-00609">
          <div className="stat-number-00609">{periods.length - 1}</div>
          <div className="stat-label-00609">Periods/Day</div>
        </div>
        <div className="stat-item-00609">
          <div className="stat-number-00609">18</div>
          <div className="stat-label-00609">Classes/Week</div>
        </div>
      </div>

      <div className="timetable-wrapper-00609">
        <div className="table-scroll-container-00609">
          <table className="timetable-00609">
            <thead>
              <tr>
                <th className="day-header-00609">Day/Period</th>
                {periods.map(period => (
                  <th 
                    key={period.id} 
                    className={period.id === 'lunch' ? 'lunch-break-header-00609' : 'period-header-00609'}
                  >
                    {period.id === 'lunch' ? (
                      <div className="lunch-header-content-00609">
                        <span className="period-icon-00609">🍽️</span>
                        <div className="period-info-00609">
                          <div className="period-title-00609">{period.time}</div>
                          <div className="period-time-00609">{period.duration}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="period-header-content-00609">
                        <span className="period-icon-00609">⏰</span>
                        <div className="period-info-00609">
                          <div className="period-title-00609">P{period.id}</div>
                          <div className="period-time-00609">{period.time}</div>
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="day-row-00609">
                  <td className="day-cell-00609">
                    <div className="day-content-00609">
                      <span className="day-name-00609">{day}</span>
                      <span className="day-short-00609">{day.slice(0, 3)}</span>
                    </div>
                  </td>
                  {periods.map(period => renderPeriodCell(day, period))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="modal-overlay-00609">
          <div className="modal-content-00609">
            <div className="modal-header-00609">
              <h2>Swap Class Request</h2>
              <button 
                className="close-button-00609"
                onClick={() => setShowSwapModal(false)}
              >
                ×
              </button>
            </div>

            <div className="form-group-00609">
              <label>Selected Period</label>
              <div className="selected-period-info-00609">
                <div className="period-details-00609">
                  <span className="day-00609">{selectedPeriod?.day}</span>
                  <span className="period-00609">Period {selectedPeriod?.period}</span>
                  <span className="time-00609">{periods.find(p => p.id === selectedPeriod?.period)?.time}</span>
                </div>
                {selectedPeriod && (
                  <div className="class-details-card-00609">
                    <div className="class-detail-item-00609">
                      <span className="label-00609">Class:</span>
                      <span className="value-00609">{getPeriodInfo(selectedPeriod.day, selectedPeriod.period)?.class}</span>
                    </div>
                    <div className="class-detail-item-00609">
                      <span className="label-00609">Subject:</span>
                      <span className="value-00609">{getPeriodInfo(selectedPeriod.day, selectedPeriod.period)?.subject}</span>
                    </div>
                    <div className="class-detail-item-00609">
                      <span className="label-00609">Room:</span>
                      <span className="value-00609">{getPeriodInfo(selectedPeriod.day, selectedPeriod.period)?.classroom}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group-00609">
              <label>Select Teacher to Swap With</label>
              <div className="teacher-list-00609">
                {teachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className={`teacher-option-00609 ${selectedTeacher === teacher.id ? 'selected-00609' : ''}`}
                    onClick={() => handleTeacherSelect(teacher.id)}
                  >
                    <span className="teacher-icon-00609">👨‍🏫</span>
                    <span className="teacher-name-00609">{teacher.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group-00609">
              <label>Swap Request Message</label>
              <textarea
                className="form-control-00609 textarea-00609"
                value={swapRequest}
                onChange={(e) => setSwapRequest(e.target.value)}
                placeholder="Explain why you want to swap this class and any specific requests..."
                rows="3"
              />
            </div>

            <div className="modal-actions-00609">
              <button 
                className="btn-00609 btn-secondary-00609"
                onClick={() => setShowSwapModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-00609 btn-primary-00609"
                onClick={handleSubmitSwap}
              >
                Send Swap Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;