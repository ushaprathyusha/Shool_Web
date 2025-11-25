import React, { useState } from 'react';
import './exam&result008.css';

const ExamResultPage = ({ onPageChange }) => {
  const [filters, setFilters] = useState({
    exam: 'Unit Test 1',
    class: '10th',
    section: 'A',
    student: ''
  });

  const [marksData, setMarksData] = useState({
    subject: 'Maths',
    marks: ''
  });

  const [enteredMarks, setEnteredMarks] = useState([]);

  const studentsData = [
    { id: 1, name: 'Mel Parker', class: '10th', section: 'A' },
    { id: 2, name: 'Lucas Johnson', class: '10th', section: 'A' },
    { id: 3, name: 'Rama', class: '10th', section: 'A' },
    { id: 4, name: 'Johnson', class: '10th', section: 'A' },
    { id: 5, name: 'Alden', class: '10th', section: 'A' },
    { id: 6, name: 'Sophia', class: '10th', section: 'A' }
  ];

  const subjects = ['Maths', 'English', 'Science', 'Social Studies', 'Physics', 'Chemistry'];
  const exams = ['Unit Test 1', 'Unit Test 2', 'Quarterly Exam', 'Half Yearly', 'Final Exam'];
  const classes = ['10th', '9th', '8th', '7th', '6th'];
  const sections = ['A', 'B', 'C'];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMarksChange = (field, value) => {
    setMarksData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveMarks = () => {
    if (marksData.marks && marksData.subject) {
      const newMark = {
        id: Date.now(),
        studentName: filters.student || 'Selected Student',
        class: filters.class,
        section: filters.section,
        subject: marksData.subject,
        marks: marksData.marks,
        exam: filters.exam,
        date: new Date().toLocaleDateString()
      };
      setEnteredMarks(prev => [...prev, newMark]);
      setMarksData({ subject: 'Maths', marks: '' });
      alert('Marks saved successfully!');
    } else {
      alert('Please select subject and enter marks');
    }
  };

  const handleExport = (format) => {
    alert(`Exporting results to ${format}...`);
  };

  const getGrade = (marks) => {
    const marksNum = parseInt(marks);
    if (marksNum >= 90) return { grade: 'A+', color: '#28a745' };
    if (marksNum >= 80) return { grade: 'A', color: '#28a745' };
    if (marksNum >= 70) return { grade: 'B+', color: '#ffc107' };
    if (marksNum >= 60) return { grade: 'B', color: '#ffc107' };
    if (marksNum >= 50) return { grade: 'C', color: '#fd7e14' };
    if (marksNum >= 40) return { grade: 'D', color: '#fd7e14' };
    return { grade: 'F', color: '#dc3545' };
  };

  return (
    <div className="exam-result-page09">
      <div className="page-container09">
        <div className="page-header09">
          <h1 className="page-title09">Exam & Result Management</h1>
        </div>

        <div className="content-card09">
          {/* Filters Section */}
          <div className="filters-section09">
            <div className="filters-grid09">
              <div className="filter-group09">
                <label>Select Exam</label>
                <select 
                  className="filter-input09"
                  value={filters.exam}
                  onChange={(e) => handleFilterChange('exam', e.target.value)}
                >
                  {exams.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group09">
                <label>Select Class</label>
                <select 
                  className="filter-input09"
                  value={filters.class}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group09">
                <label>Select Section</label>
                <select 
                  className="filter-input09"
                  value={filters.section}
                  onChange={(e) => handleFilterChange('section', e.target.value)}
                >
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group09">
                <label>Select Student</label>
                <select 
                  className="filter-input09"
                  value={filters.student}
                  onChange={(e) => handleFilterChange('student', e.target.value)}
                >
                  <option value="">All Students</option>
                  {studentsData.map(student => (
                    <option key={student.id} value={student.name}>{student.name}</option>
                  ))}
                </select>
              </div>
              
              <button className="filter-btn09">
                🔍 Filter
              </button>
            </div>
          </div>

          {/* Main Content - Two Tables Side by Side */}
          <div className="main-content-section09">
            {/* Left Side - Enter Marks */}
            <div className="left-section09">
              <div className="section-header09">
                <h3>Enter Student Marks</h3>
              </div>
              
              <div className="marks-input-section09">
                <div className="input-group09">
                  <label>Select Subject</label>
                  <select 
                    className="input-field09"
                    value={marksData.subject}
                    onChange={(e) => handleMarksChange('subject', e.target.value)}
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group09">
                  <label>Enter Marks (Out of 100)</label>
                  <input 
                    type="number"
                    className="input-field09"
                    value={marksData.marks}
                    onChange={(e) => handleMarksChange('marks', e.target.value)}
                    placeholder="Enter marks..."
                    min="0"
                    max="100"
                  />
                </div>

                <button 
                  className="save-btn09"
                  onClick={handleSaveMarks}
                  disabled={!marksData.marks}
                >
                  💾 Save Marks
                </button>
              </div>

              <div className="students-table-section09">
                <div className="table-container09">
                  <table className="students-table09">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Section</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData.map(student => (
                        <tr key={student.id} className="student-row09">
                          <td className="student-name09">{student.name}</td>
                          <td className="student-class09">{student.class}</td>
                          <td className="student-section09">{student.section}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Side - Entered Marks List */}
            <div className="right-section09">
              <div className="section-header09">
                <h3>Entered Marks</h3>
                <div className="marks-count09">
                  Total: {enteredMarks.length}
                </div>
              </div>
              
              <div className="marks-table-section09">
                <div className="table-container09">
                  <table className="marks-table09">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enteredMarks.length > 0 ? (
                        enteredMarks.map(mark => {
                          const gradeInfo = getGrade(mark.marks);
                          return (
                            <tr key={mark.id} className="mark-row09">
                              <td className="mark-name09">{mark.studentName}</td>
                              <td className="mark-class09">{mark.class}</td>
                              <td className="mark-section09">{mark.section}</td>
                              <td className="mark-subject09">{mark.subject}</td>
                              <td className="mark-value09">{mark.marks}/100</td>
                              <td className="mark-grade09">
                                <span 
                                  className="grade-badge09"
                                  style={{ backgroundColor: gradeInfo.color }}
                                >
                                  {gradeInfo.grade}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="no-data09">
                            No marks entered yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="export-section09">
            <button 
              className="export-btn09 excel09"
              onClick={() => handleExport('Excel')}
            >
              📊 Export to Excel
            </button>
            <button 
              className="export-btn09 pdf09"
              onClick={() => handleExport('PDF')}
            >
              📄 Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultPage;