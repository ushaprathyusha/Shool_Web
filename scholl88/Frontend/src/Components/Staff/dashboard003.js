import React, { useState } from 'react';
import './dashboard003.css';

const DashboardPage = ({ onPageChange }) => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Prepare Maths lesson', completed: false },
    { id: 2, text: 'Grade Test papers', completed: true },
    { id: 3, text: 'Meet parents', completed: false }
  ]);

  const [assignmentInput, setAssignmentInput] = useState({
    title: '',
    class: '10th'
  });

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Algebra HW', class: '10th A', dueDate: '2024-01-15' },
    { id: 2, title: 'Science Project', class: '9th B', dueDate: '2024-01-20' }
  ]);

  // Sample data
  const attendanceData = {
    total: 45,
    boys: { total: 25, present: 22, absent: 3 },
    girls: { total: 20, present: 18, absent: 2 }
  };

  const overallPercentage = Math.round(((attendanceData.boys.present + attendanceData.girls.present) / attendanceData.total) * 100);

  const upcomingEvents = [
    { id: 1, type: 'exam', title: 'Maths Test', class: '10th A', date: '2024-01-12' },
    { id: 2, type: 'meeting', title: 'PT Meeting', class: 'All', date: '2024-01-15' },
    { id: 3, type: 'event', title: 'Science Fair', class: '9th & 10th', date: '2024-01-18' }
  ];

  const performanceData = [
    { subject: 'Maths', average: 85 },
    { subject: 'English', average: 72 },
    { subject: 'Science', average: 78 },
    { subject: 'Social', average: 75 }
  ];

  const recentActivity = [
    { id: 1, type: 'attendance', text: 'Marked attendance for 10th A', time: '2 hours ago' },
    { id: 2, type: 'assignment', text: 'Created new assignment', time: '4 hours ago' },
    { id: 3, type: 'grade', text: 'Graded Maths papers', time: '1 day ago' },
    { id: 4, type: 'message', text: 'Replied to parent', time: '1 day ago' }
  ];

  const classDistribution = [
    { name: '10th A', count: 25 },
    { name: '10th B', count: 20 },
    { name: '9th A', count: 22 },
    { name: '9th B', count: 18 }
  ];

  // To-do functions
  const addTodo = () => {
    if (todoInput.trim()) {
      const newTodo = {
        id: Date.now(),
        text: todoInput,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Assignment functions
  const addAssignment = () => {
    if (assignmentInput.title.trim()) {
      const newAssignment = {
        id: Date.now(),
        title: assignmentInput.title,
        class: assignmentInput.class,
        dueDate: '2024-01-25'
      };
      setAssignments([...assignments, newAssignment]);
      setAssignmentInput({
        title: '',
        class: '10th'
      });
    }
  };

  const getEventIcon = (type) => {
    switch(type) {
      case 'exam': return '📝';
      case 'meeting': return '👥';
      case 'event': return '🎉';
      default: return '📅';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'attendance': return '✅';
      case 'assignment': return '📚';
      case 'grade': return '📊';
      case 'message': return '💬';
      default: return '🔔';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-page-00309">
      <div className="page-container-00309">
        <div className="page-header-00309">
          <h1 className="page-title-00309">Teacher Dashboard</h1>
          <p className="page-subtitle-00309">Welcome back! Here's your overview.</p>
        </div>

        {/* Enhanced Stats Row */}
        <div className="stats-row-00309">
          <div className="stat-card-00309">
            <div className="stat-icon-00309">👨‍🎓</div>
            <div className="stat-info-00309">
              <div className="stat-number-00309">{attendanceData.total}</div>
              <div className="stat-label-00309">Total Students</div>
            </div>
          </div>
          
          <div className="stat-card-00309 boys-00309">
            <div className="stat-icon-00309">👦</div>
            <div className="stat-info-00309">
              <div className="stat-number-00309">{attendanceData.boys.present}/{attendanceData.boys.total}</div>
              <div className="stat-label-00309">Boys Present</div>
            </div>
          </div>
          
          <div className="stat-card-00309 girls-00309">
            <div className="stat-icon-00309">👧</div>
            <div className="stat-info-00309">
              <div className="stat-number-00309">{attendanceData.girls.present}/{attendanceData.girls.total}</div>
              <div className="stat-label-00309">Girls Present</div>
            </div>
          </div>
          
          <div className="stat-card-00309 attendance-00309">
            <div className="stat-icon-00309">📊</div>
            <div className="stat-info-00309">
              <div className="stat-number-00309">{overallPercentage}%</div>
              <div className="stat-label-00309">Attendance</div>
            </div>
          </div>

          <div className="stat-card-00309 classes-00309">
            <div className="stat-icon-00309">🏫</div>
            <div className="stat-info-00309">
              <div className="stat-number-00309">4</div>
              <div className="stat-label-00309">Classes</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="main-grid-00309">
          {/* Left Column - Attendance & Recent Activity */}
          <div className="column-00309">
            {/* Attendance Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Today's Attendance</h3>
                <span className="card-badge-00309">Live</span>
              </div>
              <div className="card-content-00309">
                <div className="attendance-section-00309">
                  <div className="attendance-chart-00309">
                    <div className="pie-chart-wrapper-00309">
                      <div className="pie-chart-00309"></div>
                      <div className="pie-center-00309">
                        <div className="pie-text-00309">
                          <span className="pie-total-00309">{overallPercentage}%</span>
                          <span className="pie-label-00309">Present</span>
                        </div>
                      </div>
                    </div>
                    <div className="attendance-legend-00309">
                      <div className="legend-item-00309">
                        <div className="legend-color-00309 color-boys-00309"></div>
                        <div className="legend-details-00309">
                          <span className="legend-main-00309">Boys</span>
                          <span className="legend-sub-00309">{attendanceData.boys.present}/{attendanceData.boys.total}</span>
                        </div>
                        <span className="legend-value-00309">{Math.round((attendanceData.boys.present/attendanceData.boys.total)*100)}%</span>
                      </div>
                      <div className="legend-item-00309">
                        <div className="legend-color-00309 color-girls-00309"></div>
                        <div className="legend-details-00309">
                          <span className="legend-main-00309">Girls</span>
                          <span className="legend-sub-00309">{attendanceData.girls.present}/{attendanceData.girls.total}</span>
                        </div>
                        <span className="legend-value-00309">{Math.round((attendanceData.girls.present/attendanceData.girls.total)*100)}%</span>
                      </div>
                      <div className="legend-item-00309 absent-00309">
                        <div className="legend-color-00309 color-absent-00309"></div>
                        <div className="legend-details-00309">
                          <span className="legend-main-00309">Absent</span>
                          <span className="legend-sub-00309">B:{attendanceData.boys.absent} G:{attendanceData.girls.absent}</span>
                        </div>
                        <span className="legend-value-00309">{attendanceData.boys.absent + attendanceData.girls.absent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Recent Activity</h3>
                <span className="card-badge-00309">New</span>
              </div>
              <div className="card-content-00309">
                <div className="activity-list-00309">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item-00309">
                      <div className="activity-icon-00309">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-details-00309">
                        <span className="activity-text-00309">{activity.text}</span>
                        <span className="activity-time-00309">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Todo & Assignments */}
          <div className="column-00309">
            {/* To-Do Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>To-Do List</h3>
                <span className="card-badge-00309">{todos.filter(t => !t.completed).length}</span>
              </div>
              <div className="card-content-00309">
                <div className="todo-input-section-00309">
                  <input
                    type="text"
                    className="todo-input-00309"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder="New task..."
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  />
                  <button className="add-todo-btn-00309" onClick={addTodo}>+</button>
                </div>
                <div className="todo-items-00309">
                  {todos.map(todo => (
                    <div key={todo.id} className={`todo-item-00309 ${todo.completed ? 'completed-00309' : ''}`}>
                      <input
                        type="checkbox"
                        className="todo-checkbox-00309"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <span className="todo-text-00309">{todo.text}</span>
                      <button 
                        className="delete-todo-00309"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assignments Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Assignments</h3>
                <span className="card-badge-00309">{assignments.length}</span>
              </div>
              <div className="card-content-00309">
                <div className="assignment-input-section-00309">
                  <input
                    type="text"
                    className="assignment-input-00309"
                    value={assignmentInput.title}
                    onChange={(e) => setAssignmentInput({...assignmentInput, title: e.target.value})}
                    placeholder="Title"
                  />
                  <select
                    className="assignment-select-00309"
                    value={assignmentInput.class}
                    onChange={(e) => setAssignmentInput({...assignmentInput, class: e.target.value})}
                  >
                    <option value="10th">10th</option>
                    <option value="9th">9th</option>
                    <option value="8th">8th</option>
                  </select>
                  <button className="create-assignment-btn-00309" onClick={addAssignment}>
                    Add
                  </button>
                </div>
                <div className="assignments-list-00309">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="assignment-item-00309">
                      <div className="assignment-info-00309">
                        <span className="assignment-title-00309">{assignment.title}</span>
                        <span className="assignment-class-00309">{assignment.class}</span>
                      </div>
                      <span className="assignment-due-00309">{formatDate(assignment.dueDate)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Events, Performance, Quick Actions */}
          <div className="column-00309">
            {/* Events Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Upcoming Events</h3>
                <span className="card-badge-00309">{upcomingEvents.length}</span>
              </div>
              <div className="card-content-00309">
                <div className="events-list-00309">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="event-item-00309">
                      <div className="event-icon-00309">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="event-details-00309">
                        <span className="event-title-00309">{event.title}</span>
                        <span className="event-class-00309">{event.class}</span>
                      </div>
                      <div className="event-date-00309">
                        {formatDate(event.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Subject Performance</h3>
                <span className="card-badge-00309">Avg</span>
              </div>
              <div className="card-content-00309">
                <div className="performance-list-00309">
                  {performanceData.map((item) => (
                    <div key={item.subject} className="performance-item-00309">
                      <span className="subject-name-00309">{item.subject}</span>
                      <div className="performance-bar-container-00309">
                        <div 
                          className="performance-bar-00309"
                          style={{ width: `${item.average}%` }}
                        >
                          <span className="performance-percentage-00309">{item.average}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="dashboard-card-00309">
              <div className="card-header-00309">
                <h3>Quick Actions</h3>
              </div>
              <div className="card-content-00309">
                <div className="actions-grid-00309">
                  <button className="action-btn-00309" onClick={() => onPageChange('attendance-entry')}>
                    <span className="action-icon-00309">📝</span>
                    <span className="action-label-00309">Attendance</span>
                  </button>
                  <button className="action-btn-00309" onClick={() => onPageChange('exam-result')}>
                    <span className="action-icon-00309">📚</span>
                    <span className="action-label-00309">Enter Marks</span>
                  </button>
                  <button className="action-btn-00309" onClick={() => onPageChange('timetable')}>
                    <span className="action-icon-00309">⏰</span>
                    <span className="action-label-00309">Timetable</span>
                  </button>
                  <button className="action-btn-00309" onClick={() => onPageChange('class-subject')}>
                    <span className="action-icon-00309">🏫</span>
                    <span className="action-label-00309">My Classes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;