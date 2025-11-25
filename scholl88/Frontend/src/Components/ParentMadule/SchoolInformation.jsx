import React, { useState } from 'react';
import './SchoolInformation.css';

const SchoolInformation = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // School Basic Information
    const schoolInfo = {
        basic: {
            name: "Little Rise School",
            motto: "Empowering Minds, Building Futures",
            established: "1995",
            type: "Private Co-educational",
            accreditation: "CBSE Affiliated",
            grades: "Pre-primary to 12th Grade",
            campusArea: "5 acres",
            studentStrength: "1200+",
            teacherStudentRatio: "1:25"
        },
        contact: {
            address: "123 Education Lane, Knowledge City, State - 560001",
            phone: ["+91-80-12345678", "+91-80-87654321"],
            email: ["info@littlerise.edu.in", "admissions@littlerise.edu.in"],
            emergency: "+91-9876543210",
            coordinates: { lat: 12.9716, lng: 77.5946 }
        },
        timings: {
            school: "8:30 AM - 3:30 PM",
            office: "8:00 AM - 5:00 PM",
            library: "8:00 AM - 4:30 PM"
        }
    };

    // Academic Information
    const academicInfo = {
        curriculum: "CBSE (Central Board of Secondary Education)",
        subjects: {
            primary: ["English", "Mathematics", "Environmental Science", "Hindi", "Computer Science", "Art", "Music", "Physical Education"],
            middle: ["English", "Mathematics", "Science", "Social Science", "Hindi", "Sanskrit", "Computer Science", "Art", "Music", "Physical Education"],
            secondary: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Economics", "Business Studies", "Accountancy", "Physical Education"]
        },
        grading: "Continuous and Comprehensive Evaluation (CCE) System",
        assessment: "Unit Tests, Terminal Exams, Practical Assessments, Projects"
    };

    // Infrastructure Details
    const infrastructure = {
        classrooms: {
            count: 45,
            features: ["Smart Boards", "Projectors", "Air Conditioned", "Digital Learning Tools"],
            capacity: "40 students per class"
        },
        laboratories: [
            { name: "Physics Lab", equipment: "Advanced experimental setups", capacity: "30 students" },
            { name: "Chemistry Lab", equipment: "Modern chemical apparatus", capacity: "30 students" },
            { name: "Biology Lab", equipment: "Microscopes and specimens", capacity: "30 students" },
            { name: "Computer Lab", equipment: "50 computers with latest software", capacity: "50 students" },
            { name: "Language Lab", equipment: "Audio-visual learning systems", capacity: "25 students" }
        ],
        library: {
            books: "25,000+",
            digitalResources: "E-books, Online Journals",
            sections: ["Reference", "Fiction", "Non-Fiction", "Periodicals", "Children's Section"]
        },
        sports: {
            indoor: ["Table Tennis", "Chess", "Carrom", "Gymnastics"],
            outdoor: ["Basketball Court", "Football Ground", "Cricket Pitch", "Athletics Track", "Swimming Pool"],
            equipment: "Professional sports equipment"
        }
    };

    // Quick Stats Data
    const quickStats = [
        { number: "45+", label: "Smart Classrooms", icon: "🏫" },
        { number: "25K+", label: "Library Books", icon: "📚" },
        { number: "5", label: "Science Labs", icon: "🔬" },
        { number: "1,200+", label: "Students", icon: "👨‍🎓" },
        { number: "75+", label: "Teaching Staff", icon: "👩‍🏫" },
        { number: "15", label: "School Buses", icon: "🚌" }
    ];

    // Facilities Highlights
    const facilitiesHighlights = [
        { name: "Digital Classrooms", description: "Smart boards and digital learning tools", icon: "💻" },
        { name: "Sports Complex", description: "Indoor and outdoor sports facilities", icon: "⚽" },
        { name: "Science Labs", description: "Well-equipped labs for practical learning", icon: "🧪" },
        { name: "Library", description: "25,000+ books and digital resources", icon: "📖" }
    ];

    return (
        <div className="school-information-page88">
            {/* Header Section */}
            <div className="school-header88">
                <div className="header-content88">
                    <div className="school-brand-main88">
                        <div className="school-logo-main88">
                            <span>🏫</span>
                        </div>
                        <div className="school-info-main88">
                            <h1 className="school-name88">{schoolInfo.basic.name}</h1>
                            <p className="school-motto88">{schoolInfo.basic.motto}</p>
                        </div>
                    </div>
                    <div className="school-badges88">
                        <span className="badge88 established88">Est. {schoolInfo.basic.established}</span>
                        <span className="badge88 accredited88">{schoolInfo.basic.accreditation}</span>
                        <span className="badge88 type88">{schoolInfo.basic.type}</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Only Overview and Academics */}
            <div className="info-navigation88">
                <button className={`nav-btn88 ${activeTab === 'overview' ? 'active88' : ''}`} onClick={() => setActiveTab('overview')}>
                    📊 Overview
                </button>
                <button className={`nav-btn88 ${activeTab === 'academics' ? 'active88' : ''}`} onClick={() => setActiveTab('academics')}>
                    📚 Academics
                </button>
            </div>

            {/* Main Content */}
            <div className="info-content88">
                {activeTab === 'overview' && (
                    <div className="overview-tab88">
                        {/* Quick Stats Grid */}
                        <div className="info-section88">
                            <h2>📈 School At a Glance</h2>
                            <div className="stats-grid88">
                                {quickStats.map((stat, index) => (
                                    <div key={index} className="stat-card88">
                                        <div className="stat-icon88">{stat.icon}</div>
                                        <div className="stat-number88">{stat.number}</div>
                                        <div className="stat-label88">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="info-section88">
                            <h2>🏛️ About Our School</h2>
                            <div className="basic-info-grid88">
                                <div className="info-card88">
                                    <h3>📋 School Profile</h3>
                                    <div className="info-list88">
                                        <div className="info-item88">
                                            <strong>Established:</strong> 
                                            <span className="info-value88">{schoolInfo.basic.established}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>School Type:</strong>
                                            <span className="info-value88">{schoolInfo.basic.type}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Accreditation:</strong>
                                            <span className="info-value88">{schoolInfo.basic.accreditation}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Grades:</strong>
                                            <span className="info-value88">{schoolInfo.basic.grades}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Campus Area:</strong>
                                            <span className="info-value88">{schoolInfo.basic.campusArea}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Student Strength:</strong>
                                            <span className="info-value88 highlight-number88">{schoolInfo.basic.studentStrength}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Teacher-Student Ratio:</strong>
                                            <span className="info-value88 highlight-number88">{schoolInfo.basic.teacherStudentRatio}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card88">
                                    <h3>📞 Contact Information</h3>
                                    <div className="info-list88">
                                        <div className="info-item88">
                                            <strong>Address:</strong>
                                            <span className="info-value88">{schoolInfo.contact.address}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Phone:</strong>
                                            <span className="info-value88">{schoolInfo.contact.phone.join(', ')}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Email:</strong>
                                            <span className="info-value88">{schoolInfo.contact.email.join(', ')}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Emergency:</strong>
                                            <span className="info-value88 highlight-number88">{schoolInfo.contact.emergency}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>School Hours:</strong>
                                            <span className="info-value88">{schoolInfo.timings.school}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Office Hours:</strong>
                                            <span className="info-value88">{schoolInfo.timings.office}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vision & Mission */}
                        <div className="info-section88">
                            <h2>🎯 Our Vision & Mission</h2>
                            <div className="vision-mission-grid88">
                                <div className="vision-card88">
                                    <div className="card-icon88">👁️</div>
                                    <h3>Vision</h3>
                                    <p>To create a nurturing environment that fosters academic excellence, character building, and holistic development, preparing students to become responsible global citizens and lifelong learners.</p>
                                </div>
                                <div className="mission-card88">
                                    <div className="card-icon88">🎯</div>
                                    <h3>Mission</h3>
                                    <p>To provide quality education through innovative teaching methodologies, state-of-the-art infrastructure, and a values-based curriculum that empowers students to achieve their full potential and make meaningful contributions to society.</p>
                                </div>
                            </div>
                        </div>

                        {/* Facilities Highlights */}
                        <div className="info-section88">
                            <h2>🏢 Key Facilities</h2>
                            <div className="facilities-grid88">
                                {facilitiesHighlights.map((facility, index) => (
                                    <div key={index} className="facility-card88">
                                        <div className="facility-icon88">{facility.icon}</div>
                                        <h4>{facility.name}</h4>
                                        <p>{facility.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'academics' && (
                    <div className="academics-tab88">
                        {/* Curriculum Information */}
                        <div className="info-section88">
                            <h2>📘 Academic Curriculum</h2>
                            <div className="curriculum-info88">
                                <div className="info-card88">
                                    <h3>🎓 Curriculum Details</h3>
                                    <div className="info-list88">
                                        <div className="info-item88">
                                            <strong>Board:</strong>
                                            <span className="info-value88">{academicInfo.curriculum}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Grading System:</strong>
                                            <span className="info-value88">{academicInfo.grading}</span>
                                        </div>
                                        <div className="info-item88">
                                            <strong>Assessment Pattern:</strong>
                                            <span className="info-value88">{academicInfo.assessment}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="subjects-section88">
                                    <h3>📖 Subjects by Level</h3>
                                    <div className="subjects-grid88">
                                        <div className="subject-level88">
                                            <h4>👶 Primary (1-5)</h4>
                                            <div className="subject-list88">
                                                {academicInfo.subjects.primary.map((subject, index) => (
                                                    <span key={index} className="subject-tag88">{subject}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="subject-level88">
                                            <h4>👧 Middle (6-8)</h4>
                                            <div className="subject-list88">
                                                {academicInfo.subjects.middle.map((subject, index) => (
                                                    <span key={index} className="subject-tag88">{subject}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="subject-level88">
                                            <h4>👩‍🎓 Secondary (9-12)</h4>
                                            <div className="subject-list88">
                                                {academicInfo.subjects.secondary.map((subject, index) => (
                                                    <span key={index} className="subject-tag88">{subject}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Infrastructure Highlights */}
                        <div className="info-section88">
                            <h2>🔬 Learning Infrastructure</h2>
                            <div className="infrastructure-grid88">
                                <div className="infrastructure-card88">
                                    <div className="infra-icon88">🏫</div>
                                    <h4>Smart Classrooms</h4>
                                    <div className="infra-stats88">
                                        <span className="infra-number88">{infrastructure.classrooms.count}+</span>
                                        <span className="infra-label88">Classrooms</span>
                                    </div>
                                    <div className="infra-features88">
                                        {infrastructure.classrooms.features.map((feature, index) => (
                                            <span key={index} className="feature-tag88">{feature}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="infrastructure-card88">
                                    <div className="infra-icon88">🧪</div>
                                    <h4>Science Laboratories</h4>
                                    <div className="infra-stats88">
                                        <span className="infra-number88">{infrastructure.laboratories.length}</span>
                                        <span className="infra-label88">Specialized Labs</span>
                                    </div>
                                    <div className="infra-features88">
                                        {infrastructure.laboratories.map((lab, index) => (
                                            <span key={index} className="feature-tag88">{lab.name}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="infrastructure-card88">
                                    <div className="infra-icon88">📚</div>
                                    <h4>Library Resources</h4>
                                    <div className="infra-stats88">
                                        <span className="infra-number88 highlight-number88">{infrastructure.library.books}</span>
                                        <span className="infra-label88">Books</span>
                                    </div>
                                    <div className="infra-features88">
                                        {infrastructure.library.sections.map((section, index) => (
                                            <span key={index} className="feature-tag88">{section}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchoolInformation;