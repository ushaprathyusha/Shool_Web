const API_BASE_URL = 'http://localhost:8000';

export const parentDashboardAPI = {
  // Get quick stats
  getQuickStats: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/${studentId}/quick-stats`);
    if (!response.ok) throw new Error('Failed to fetch quick stats');
    return await response.json();
  },

  // Get attendance trend
  getAttendanceTrend: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/${studentId}/attendance-trend`);
    if (!response.ok) throw new Error('Failed to fetch attendance trend');
    return await response.json();
  },

  // Get subject performance
  getSubjectPerformance: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/${studentId}/subject-performance`);
    if (!response.ok) throw new Error('Failed to fetch subject performance');
    return await response.json();
  },

  // Get fees status
  getFeesStatus: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/${studentId}/fees-status`);
    if (!response.ok) throw new Error('Failed to fetch fees status');
    return await response.json();
  },

  // Get announcements
  getAnnouncements: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/api/parent/${studentId}/announcements`);
    if (!response.ok) throw new Error('Failed to fetch announcements');
    return await response.json();
  }
};