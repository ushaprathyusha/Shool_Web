import React, { useState } from 'react';
import './schoolinformation10.css';

const SchoolInformation = ({ onPageChange }) => {
    const [activeTab, setActiveTab] = useState('overview');

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
            address: "123 Education Lane, Knowledge City",
            phone: ["+91-80-12345678"],
            email: ["info@littlerise.edu.in"],
            emergency: "+91-9876543210"
        },
        timings: {
            school: "8:30 AM - 3:30 PM",
            office: "8:00 AM - 5:00 PM"
        }
    };

    const academicInfo = {
        curriculum: "CBSE",
        subjects: {
            primary: ["English", "Maths", "EVS", "Hindi", "Computer", "Art", "Music", "PE"],
            middle: ["English", "Maths", "Science", "Social", "Hindi", "Sanskrit", "Computer", "Art"],
            secondary: ["English", "Maths", "Physics", "Chemistry", "Biology", "Computer", "Economics"]
        }
    };

    const infrastructure = {
        classrooms: {
            count: 45,
            features: ["Smart Boards", "Projectors", "AC", "Digital Tools"]
        },
        laboratories: [
            { name: "Physics Lab" },
            { name: "Chemistry Lab" },
            { name: "Biology Lab" },
            { name: "Computer Lab" }
        ],
        library: {
            books: "25,000+",
            sections: ["Reference", "Fiction", "Non-Fiction"]
        }
    };

    const quickStats = [
        { number: "45+", label: "Classrooms", icon: "🏫" },
        { number: "25K+", label: "Books", icon: "📚" },
        { number: "5", label: "Labs", icon: "🔬" },
        { number: "1.2K", label: "Students", icon: "👨‍🎓" },
        { number: "75+", label: "Teachers", icon: "👩‍🏫" },
        { number: "15", label: "Buses", icon: "🚌" }
    ];

    const facilitiesHighlights = [
        { name: "Digital Classes", description: "Smart boards", icon: "💻" },
        { name: "Sports Complex", description: "Indoor/outdoor", icon: "⚽" },
        { name: "Science Labs", description: "Well-equipped", icon: "🧪" },
        { name: "Library", description: "25K+ books", icon: "📖" }
    ];

    return (
        <div className="school-information-page09">
            <div className="page-container09">
                <div className="page-header09">
                    <h1 className="page-title09">School Information</h1>
                    <p className="page-subtitle09">Complete school profile and details</p>
                </div>

                <div className="stats-row09">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="stat-card09">
                            <div className="stat-icon09">{stat.icon}</div>
                            <div className="stat-info09">
                                <div className="stat-number09">{stat.number}</div>
                                <div className="stat-label09">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="main-grid09">
                    {/* Left Column */}
                    <div className="column09">
                        <div className="dashboard-card09">
                            <div className="school-header09">
                                <div className="header-content09">
                                    <div className="school-logo-main09">🏫</div>
                                    <div className="school-info-main09">
                                        <div className="school-name09">{schoolInfo.basic.name}</div>
                                        <div className="school-motto09">{schoolInfo.basic.motto}</div>
                                    </div>
                                    <div className="school-badges09">
                                        <span className="badge09 established09">Est. {schoolInfo.basic.established}</span>
                                        <span className="badge09 accredited09">{schoolInfo.basic.accreditation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card09">
                            <div className="card-header09">
                                <h3>Navigation</h3>
                            </div>
                            <div className="card-content09">
                                <div className="info-navigation09">
                                    <button className={`nav-btn09 ${activeTab === 'overview' ? 'active09' : ''}`} 
                                            onClick={() => setActiveTab('overview')}>📊 Overview</button>
                                    <button className={`nav-btn09 ${activeTab === 'academics' ? 'active09' : ''}`} 
                                            onClick={() => setActiveTab('academics')}>📚 Academics</button>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card09">
                            <div className="card-header09">
                                <h3>📞 Contact Info</h3>
                            </div>
                            <div className="card-content09">
                                <div className="info-list09">
                                    <div className="info-item09">
                                        <strong>Address:</strong>
                                        <span className="info-value09">{schoolInfo.contact.address}</span>
                                    </div>
                                    <div className="info-item09">
                                        <strong>Phone:</strong>
                                        <span className="info-value09">{schoolInfo.contact.phone[0]}</span>
                                    </div>
                                    <div className="info-item09">
                                        <strong>Email:</strong>
                                        <span className="info-value09">{schoolInfo.contact.email[0]}</span>
                                    </div>
                                    <div className="info-item09">
                                        <strong>Emergency:</strong>
                                        <span className="info-value09 highlight-number09">{schoolInfo.contact.emergency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="column09">
                        <div className="info-content09">
                            {activeTab === 'overview' && (
                                <>
                                    <div className="info-section09">
                                        <h2>🏛️ School Profile</h2>
                                        <div className="basic-info-grid09">
                                            <div className="info-card09">
                                                <h3>📋 Basic Info</h3>
                                                <div className="info-list09">
                                                    <div className="info-item09">
                                                        <strong>Established:</strong> 
                                                        <span className="info-value09">{schoolInfo.basic.established}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Type:</strong>
                                                        <span className="info-value09">{schoolInfo.basic.type}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Board:</strong>
                                                        <span className="info-value09">{schoolInfo.basic.accreditation}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Grades:</strong>
                                                        <span className="info-value09">{schoolInfo.basic.grades}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Campus:</strong>
                                                        <span className="info-value09">{schoolInfo.basic.campusArea}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Students:</strong>
                                                        <span className="info-value09 highlight-number09">{schoolInfo.basic.studentStrength}</span>
                                                    </div>
                                                    <div className="info-item09">
                                                        <strong>Ratio:</strong>
                                                        <span className="info-value09 highlight-number09">{schoolInfo.basic.teacherStudentRatio}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info-card09">
                                                <h3>🎯 Vision & Mission</h3>
                                                <div className="vision-mission-content09">
                                                    <div className="vision-item09">
                                                        <h4>👁️ Vision</h4>
                                                        <p>To create a nurturing environment that fosters academic excellence and holistic development.</p>
                                                    </div>
                                                    <div className="mission-item09">
                                                        <h4>🎯 Mission</h4>
                                                        <p>To provide quality education through innovative teaching and state-of-the-art infrastructure.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-section09">
                                        <h2>🔬 Infrastructure</h2>
                                        <div className="infrastructure-grid09">
                                            <div className="infrastructure-card09">
                                                <div className="infra-icon09">🏫</div>
                                                <h4>Classrooms</h4>
                                                <div className="infra-stats09">
                                                    <span className="infra-number09">{infrastructure.classrooms.count}+</span>
                                                    <span className="infra-label09">Rooms</span>
                                                </div>
                                                <div className="infra-features09">
                                                    {infrastructure.classrooms.features.map((feature, index) => (
                                                        <span key={index} className="feature-tag09">{feature}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="infrastructure-card09">
                                                <div className="infra-icon09">🧪</div>
                                                <h4>Labs</h4>
                                                <div className="infra-stats09">
                                                    <span className="infra-number09">{infrastructure.laboratories.length}</span>
                                                    <span className="infra-label09">Labs</span>
                                                </div>
                                                <div className="infra-features09">
                                                    {infrastructure.laboratories.slice(0, 2).map((lab, index) => (
                                                        <span key={index} className="feature-tag09">{lab.name}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="infrastructure-card09">
                                                <div className="infra-icon09">📚</div>
                                                <h4>Library</h4>
                                                <div className="infra-stats09">
                                                    <span className="infra-number09">{infrastructure.library.books}</span>
                                                    <span className="infra-label09">Books</span>
                                                </div>
                                                <div className="infra-features09">
                                                    {infrastructure.library.sections.slice(0, 2).map((section, index) => (
                                                        <span key={index} className="feature-tag09">{section}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'academics' && (
                                <>
                                    <div className="info-section09">
                                        <h2>📘 Curriculum</h2>
                                        <div className="info-card09">
                                            <h3>🎓 Board & System</h3>
                                            <div className="info-list09">
                                                <div className="info-item09">
                                                    <strong>Board:</strong>
                                                    <span className="info-value09">{academicInfo.curriculum}</span>
                                                </div>
                                                <div className="info-item09">
                                                    <strong>Grading:</strong>
                                                    <span className="info-value09">CCE System</span>
                                                </div>
                                                <div className="info-item09">
                                                    <strong>Assessment:</strong>
                                                    <span className="info-value09">Unit Tests, Exams</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-section09">
                                        <h2>📖 Subjects</h2>
                                        <div className="subjects-grid09">
                                            <div className="subject-level09">
                                                <h4>👶 Primary</h4>
                                                <div className="subject-list09">
                                                    {academicInfo.subjects.primary.slice(0, 6).map((subject, index) => (
                                                        <span key={index} className="subject-tag09">{subject}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="subject-level09">
                                                <h4>👧 Middle</h4>
                                                <div className="subject-list09">
                                                    {academicInfo.subjects.middle.slice(0, 6).map((subject, index) => (
                                                        <span key={index} className="subject-tag09">{subject}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="subject-level09">
                                                <h4>👩‍🎓 Secondary</h4>
                                                <div className="subject-list09">
                                                    {academicInfo.subjects.secondary.slice(0, 6).map((subject, index) => (
                                                        <span key={index} className="subject-tag09">{subject}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="column09">
                        <div className="dashboard-card09">
                            <div className="card-header09">
                                <h3>🏢 Facilities</h3>
                                <span className="card-badge09">{facilitiesHighlights.length}</span>
                            </div>
                            <div className="card-content09">
                                <div className="facilities-grid09">
                                    {facilitiesHighlights.map((facility, index) => (
                                        <div key={index} className="facility-card09">
                                            <div className="facility-icon09">{facility.icon}</div>
                                            <h4>{facility.name}</h4>
                                            <p>{facility.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-card09">
                            <div className="card-header09">
                                <h3>⚽ Sports</h3>
                                <span className="card-badge09">9</span>
                            </div>
                            <div className="card-content09">
                                <div className="sports-grid09">
                                    <div className="sports-type09">
                                        <h4>🏠 Indoor</h4>
                                        <div className="sports-list09">
                                            <span className="sport-tag09">Table Tennis</span>
                                            <span className="sport-tag09">Chess</span>
                                            <span className="sport-tag09">Carrom</span>
                                            <span className="sport-tag09">Gymnastics</span>
                                        </div>
                                    </div>
                                    <div className="sports-type09">
                                        <h4>🌳 Outdoor</h4>
                                        <div className="sports-list09">
                                            <span className="sport-tag09">Basketball</span>
                                            <span className="sport-tag09">Football</span>
                                            <span className="sport-tag09">Cricket</span>
                                            <span className="sport-tag09">Athletics</span>
                                            <span className="sport-tag09">Swimming</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolInformation;