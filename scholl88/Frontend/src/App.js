import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// 🏫 Admin Module Imports
import Sidebar from "./Components/Admin/Sidebar";
import DashboardPage from "./Components/Admin/Dashboard";
import StudentsPage from "./Components/Admin/Student";
import TeachersPage from "./Components/Admin/Teachers";
import AttendancePage from "./Components/Admin/Attendance";
import ExamPage from "./Components/Admin/ExamResultPage";
import ReportsPage from "./Components/Admin/ReportsAnaly";
import TimetablePage from "./Components/Admin/TimeTablePage";
import FeePage from "./Components/Admin/FeePayment";

// 👨‍🏫 Staff Module Imports
import Sidebar2 from "./Components/Staff/sidebar001";
import Header from "./Components/Staff/header002";
import DashboardPage2 from "./Components/Staff/dashboard003";
import AttendanceStaffPage from "./Components/Staff/attendancereport005";
import ExamReportPage from "./Components/Staff/examreport009";
import ClassSubjectPage from "./Components/Staff/class-subject007";
import TimetableStaffPage from "./Components/Staff/timetable006";
import SchoolInfoPage from "./Components/Staff/schoolinformation10";

// 👨‍👩‍👧‍👦 Parent Module Imports
import ParentLayout from "./Components/ParentMadule/MainLayout";
import ParentDashboard from "./Components/ParentMadule/ParentDashboard";
import ExamsAndResults from "./Components/ParentMadule/ExamsAndResults";
import FeeManagement from "./Components/ParentMadule/FeeManagement";
import AttendanceReport from "./Components/ParentMadule/AttendanceReport";
import ExamReports from "./Components/ParentMadule/ExamReports";
import Timetable from "./Components/ParentMadule/Timetable";
import StudentProfile from "./Components/ParentMadule/StudentProfile";
import ExamReportDetail from "./Components/ParentMadule/ExamReportDetail";
import SchoolInformation from "./Components/ParentMadule/SchoolInformation";

import "./App.css";

// Profile Context for sharing profile data across components
const ProfileContext = React.createContext();

function AppContent() {
  const [currentMode, setCurrentMode] = useState("admin"); // "admin", "staff", "parent"
  const [profileData, setProfileData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch profile data from database/API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Simulate API call - replace with actual database call
        const profile = await getProfileData(currentMode);
        setProfileData(profile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Set default profile data
        setProfileData(getDefaultProfile(currentMode));
      }
    };

    fetchProfileData();
  }, [currentMode]);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      <div className="App">
        {currentMode === "admin" && <AdminModule setCurrentMode={setCurrentMode} isMobile={isMobile} />}
        {currentMode === "staff" && <StaffModule setCurrentMode={setCurrentMode} isMobile={isMobile} />}
        {currentMode === "parent" && <ParentModule setCurrentMode={setCurrentMode} isMobile={isMobile} />}
      </div>
    </ProfileContext.Provider>
  );
}

// Simulated database functions - replace with actual API calls
const getProfileData = async (mode) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const profiles = {
    admin: {
      name: "Admin User",
      email: "admin@littlerise.edu",
      phone: "+1 (555) 123-4567",
      role: "Administrator",
      department: "Administration",
      employeeId: "LRS-A-001",
      joinDate: "January 10, 2020",
      experience: "4 years",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    staff: {
      name: "John Doe",
      email: "john.doe@littlerise.edu",
      phone: "+1 (555) 123-4567",
      qualification: "M.Ed in Mathematics",
      address: "123 School Street, Education City, EC 12345",
      department: "Mathematics",
      experience: "8 years",
      joinDate: "January 15, 2016",
      employeeId: "LRS-T-042",
      dateOfBirth: "March 15, 1985",
      bloodGroup: "O+",
      emergencyContact: "+1 (555) 987-6543",
      subjects: ["Mathematics", "Advanced Calculus", "Statistics"],
      classTeacher: "Grade 10-A",
      workingHours: "8:00 AM - 3:00 PM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    parent: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 234-5678",
      studentName: "Emily Johnson",
      studentGrade: "Grade 5-B",
      relationship: "Mother",
      address: "456 Parent Avenue, Cityville, CV 54321",
      emergencyContact: "+1 (555) 345-6789",
      occupation: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  };

  return profiles[mode] || getDefaultProfile(mode);
};

const getDefaultProfile = (mode) => {
  const baseProfile = {
    name: "User",
    email: "user@littlerise.edu",
    phone: "+1 (555) 000-0000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  if (mode === "admin") {
    return { ...baseProfile, role: "Administrator", department: "Administration" };
  } else if (mode === "staff") {
    return { ...baseProfile, department: "Teaching", role: "Teacher" };
  } else {
    return { ...baseProfile, role: "Parent", studentName: "Student" };
  }
};

// Admin Module Component
function AdminModule({ setCurrentMode, isMobile }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="admin-layout">
      <div className="admin-container">
        {/* Fixed Sidebar */}
        <div className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile && !isMobileMenuOpen ? 'mobile-hidden' : ''}`}>
          <Sidebar onToggle={handleSidebarToggle} isCollapsed={isSidebarCollapsed} />
        </div>
        
        {/* Main Content Area with Header */}
        <div className={`admin-main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
          {/* Header for Admin */}
          <Header onMenuToggle={handleMobileMenuToggle} isMobile={isMobile} />
          
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage isSidebarCollapsed={isSidebarCollapsed} />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/fees" element={<FeePage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>

      {/* Mode Switch Buttons */}
      <div className="mode-switch-buttons">
        <button className="switch-btn staff" onClick={() => setCurrentMode("staff")}>
          👨‍🏫 Switch to Staff Portal
        </button>
        <button className="switch-btn parent" onClick={() => setCurrentMode("parent")}>
          👨‍👩‍👧‍👦 Switch to Parent Portal
        </button>
      </div>
    </div>
  );
}

// Staff Module Component
function StaffModule({ setCurrentMode, isMobile }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="staff-layout">
      <div className="staff-container">
        {/* Fixed Sidebar */}
        <div className={`staff-sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile && !isMobileMenuOpen ? 'mobile-hidden' : ''}`}>
          <Sidebar2 onToggle={handleSidebarToggle} isCollapsed={isSidebarCollapsed} />
        </div>
        
        {/* Main Content Area with Header */}
        <div className={`staff-main ${isSidebarCollapsed ? 'expanded' : ''}`}>
          {/* Header for Staff */}
          <Header onMenuToggle={handleMobileMenuToggle} isMobile={isMobile} />
          
          <div className="staff-content">
            <Routes>
              <Route path="/staff/dashboard" element={<DashboardPage2 />} />
              <Route path="/staff/attendance" element={<AttendanceStaffPage />} />
              <Route path="/staff/exam-report" element={<ExamReportPage />} />
              <Route path="/staff/class-subject" element={<ClassSubjectPage />} />
              <Route path="/staff/timetable" element={<TimetableStaffPage />} />
              <Route path="/staff/school-info" element={<SchoolInfoPage />} />
              <Route path="*" element={<Navigate to="/staff/dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Mode Switch Buttons */}
      <div className="mode-switch-buttons">
        <button className="switch-btn back" onClick={() => setCurrentMode("admin")}>
          🧑‍💼 Back to Admin Dashboard
        </button>
        <button className="switch-btn parent" onClick={() => setCurrentMode("parent")}>
          👨‍👩‍👧‍👦 Switch to Parent Portal
        </button>
      </div>
    </div>
  );
}

// Parent Module Component
function ParentModule({ setCurrentMode, isMobile }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="parent-layout">
      <div className="parent-container">
        <Routes>
          <Route element={<ParentLayout onToggle={handleSidebarToggle} isCollapsed={isSidebarCollapsed} onMenuToggle={handleMobileMenuToggle} isMobile={isMobile} />}>
            <Route path="/" element={<ParentDashboard />} />
            <Route path="/student" element={<StudentProfile />} />
            <Route path="/student-management" element={<StudentProfile />} />
            <Route path="/exams-and-results" element={<ExamsAndResults />} />
            <Route path="/fee-management" element={<FeeManagement />} />
            <Route path="/attendance-report" element={<AttendanceReport />} />
            <Route path="/exam-reports" element={<ExamReports />} />
            <Route path="/exam-report-detail" element={<ExamReportDetail />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/school-information" element={<SchoolInformation />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>

      {/* Mode Switch Buttons */}
      <div className="mode-switch-buttons">
        <button className="switch-btn back" onClick={() => setCurrentMode("admin")}>
          🧑‍💼 Back to Admin Dashboard
        </button>
        <button className="switch-btn staff" onClick={() => setCurrentMode("staff")}>
          👨‍🏫 Switch to Staff Portal
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Export the context for use in other components
export { ProfileContext };