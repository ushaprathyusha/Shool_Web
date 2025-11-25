import React from "react";
import { motion } from "framer-motion";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaSchool, 
  FaWallet, 
  FaExclamationCircle,
  FaCalendarAlt,
  FaBell,
  FaSearch,
  FaCog,
  FaUserCircle,
  FaUsers,
  FaBook,
  FaMoneyBillWave,
  FaClipboardCheck
} from "react-icons/fa";
import { 
  GiTeacher,
  GiMoneyStack,
  GiPayMoney
} from "react-icons/gi";
import { 
  MdSchool,
  MdAttendancerequired
} from "react-icons/md";
import "./DashboardCards.css";

const Dashboard = ({ isSidebarCollapsed }) => {
  const stats = [
    { 
      title: "TOTAL STUDENTS", 
      count: 1245, 
      icon: <FaUserGraduate />, 
      color: "#6A5BE2", 
      trend: "+5.2%",
      iconColor: "#FF6B6B"
    },
    { 
      title: "TEACHERS", 
      count: 68, 
      icon: <GiTeacher />, 
      color: "#10B981", 
      trend: "+2.3%",
      iconColor: "#4ECDC4"
    },
    { 
      title: "CLASSES", 
      count: 42, 
      icon: <MdSchool />, 
      color: "#3B82F6", 
      trend: "0%",
      iconColor: "#45B7D1"
    },
    { 
      title: "FEES COLLECTED", 
      count: "₹9.8L", 
      icon: <GiMoneyStack />, 
      color: "#F59E0B", 
      trend: "+12.1%",
      iconColor: "#FFA07A"
    },
    { 
      title: "PENDING FEES", 
      count: "₹1.2L", 
      icon: <GiPayMoney />, 
      color: "#EF4444", 
      trend: "-3.4%",
      iconColor: "#BA68C8"
    },
  ];

  const events = [
    { id: 1, title: "PT Meeting", date: "25 Oct 2023", type: "Meeting" },
    { id: 2, title: "Science Fair", date: "28 Oct 2023", type: "Event" },
    { id: 3, title: "Sports Day", date: "02 Nov 2023", type: "Event" }
  ];

  const todos = [
    { id: 1, text: "Review monthly reports", completed: false },
    { id: 2, text: "Meet with principal", completed: true },
    { id: 3, text: "Update fee structure", completed: false }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            {/* <p className="dashboard-subtitle">Welcome back! Here's your overview.</p> */}
          </div>
          <div className="header-right">
          
        

            <div className="header-actions">
              <button className="icon-btn">
                <FaBell />
                <span className="notification-badge">3</span>
              </button>
              <button className="icon-btn">
                <FaCog />
              </button>
              <div className="user-profile">
                <FaUserCircle />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="stats-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            style={{ borderLeft: `4px solid ${stat.color}` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
            }}
          >
            <div className="stat-content">
              <div className="stat-icon" style={{ 
                '--card-color': stat.color, 
                '--card-color-dark': stat.color,
                '--icon-gradient': `linear-gradient(135deg, ${stat.iconColor}, ${stat.iconColor}CC)`,
                '--icon-shadow': `${stat.iconColor}40`,
                '--icon-shadow-hover': `${stat.iconColor}60`
              }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3 className="stat-value">{stat.count}</h3>
                <p className="stat-title">{stat.title}</p>
                <span className={`stat-trend ${stat.trend.startsWith('-') ? 'negative' : ''}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Left Column - Main Content */}
        <div className="content-left">
          {/* Attendance Overview */}
          <motion.div 
            className="content-card attendance-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="card-header">
              <h3>Today's Attendance</h3>
              <span className="attendance-percentage">91.7%</span>
            </div>
            <div className="attendance-stats">
              <div className="attendance-item">
                <span className="label">Present</span>
                <span className="value">1,142</span>
              </div>
              <div className="attendance-item">
                <span className="label">Absent</span>
                <span className="value">103</span>
              </div>
            </div>
            <div className="attendance-chart">
              <div className="attendance-bar present-bar" style={{ width: '91.7%' }}></div>
              <div className="attendance-bar absent-bar" style={{ width: '8.3%' }}></div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="content-card quick-actions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-btn" style={{background: 'linear-gradient(135deg, #87449aff, #4b0e6bff)'}}>
                <FaUserGraduate />
                <span> Student</span>
              </button>
              <button className="action-btn" style={{background: 'linear-gradient(135deg,  #87449aff, #4b0e6bff)'}}>
                <GiTeacher />
                <span> Teacher</span>
              </button>
              <button className="action-btn" style={{background: 'linear-gradient(135deg,  #87449aff, #4b0e6bff)'}}>
                <GiMoneyStack />
                <span>Collect Fee</span>
              </button>
              <button className="action-btn" style={{background: 'linear-gradient(135deg,  #66449aff, #4b0e6bff)'}}>
                <FaCalendarAlt />
                <span>Schedule Event</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="content-right">
          {/* Upcoming Events */}
          <motion.div 
            className="content-card events-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="card-header">
              <h3>Upcoming Events</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="events-list">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  className="event-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <div className="event-indicator"></div>
                  <div className="event-info">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-date">{event.date}</p>
                  </div>
                  <span className="event-type">{event.type}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* To-Do List */}
          <motion.div 
            className="content-card todo-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="card-header">
              <h3>To-Do List</h3>
              <span className="todo-count">{todos.filter(t => !t.completed).length}</span>
            </div>
            <div className="todo-list">
              {todos.map((todo, index) => (
                <motion.div 
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => {}}
                  />
                  <span className="todo-text">{todo.text}</span>
                </motion.div>
              ))}
              <div className="add-todo">
                <input type="text" placeholder="Add new task..." />
                <button>+</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;