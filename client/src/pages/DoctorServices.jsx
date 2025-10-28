import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function DoctorServices() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Family Medicine Physician",
      rating: 4.8,
      reviews: 105,
      location: "Downtown Medical Center",
      address: "123 Medical Ave, Suite 405, Downtown",
      phone: "(555) 123-4567",
      email: "s.johnson@medicalcenter.com",
      education: "MD from Harvard Medical School",
      experience: "15 years",
      languages: ["English", "Spanish"],
      specialties: ["Family Medicine", "Preventive Care", "Chronic Disease Management"],
      available: true,
      consultationFee: "$150",
      about: "Dr. Sarah Johnson is a board-certified family medicine physician with over 15 years of experience providing comprehensive healthcare for patients of all ages. She believes in building long-term relationships with her patients and focuses on preventive care and chronic disease management.",
      established: "Practicing since 2008",
      teamSize: "Primary Care Physician",
      services: [
        "Annual Physical Exams",
        "Chronic Disease Management",
        "Preventive Care",
        "Vaccinations",
        "Health Screenings"
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.3,
      reviews: 88,
      location: "Heart & Vascular Institute",
      address: "456 Heart Street, Suite 210",
      phone: "(555) 234-5678",
      email: "m.chen@heartinstitute.com",
      education: "MD from Johns Hopkins University",
      experience: "12 years",
      languages: ["English", "Mandarin"],
      specialties: ["Cardiology", "Heart Surgery", "Preventive Cardiology"],
      available: true,
      consultationFee: "$200",
      about: "Dr. Michael Chen is a renowned cardiologist specializing in interventional cardiology and heart disease prevention. With extensive training from top medical institutions, he provides cutting-edge cardiac care tailored to each patient's needs.",
      established: "Practicing since 2011",
      teamSize: "Cardiology Specialist",
      services: [
        "Cardiac Consultation",
        "Echocardiography",
        "Stress Testing",
        "Heart Disease Prevention",
        "Interventional Procedures"
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      rating: 4.7,
      reviews: 248,
      location: "Skin Care Specialists",
      address: "789 Skin Care Blvd, Suite 101",
      phone: "(555) 345-6789",
      email: "e.rodriguez@skincare.com",
      education: "MD from Stanford University",
      experience: "10 years",
      languages: ["English", "Spanish", "French"],
      specialties: ["Dermatology", "Cosmetic Procedures", "Skin Cancer Screening"],
      available: true,
      consultationFee: "$180",
      about: "Dr. Emily Rodriguez is a board-certified dermatologist with expertise in medical, surgical, and cosmetic dermatology. She is passionate about helping patients achieve healthy skin through personalized treatment plans and advanced dermatological techniques.",
      established: "Practicing since 2013",
      teamSize: "Dermatology Specialist",
      services: [
        "Skin Cancer Screening",
        "Acne Treatment",
        "Cosmetic Dermatology",
        "Medical Dermatology",
        "Surgical Procedures"
      ]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      rating: 4.6,
      reviews: 244,
      location: "Sports Medicine Center",
      address: "321 Sports Lane, Suite 500",
      phone: "(555) 456-7890",
      email: "j.wilson@sportsmed.com",
      education: "MD from Mayo Medical School",
      experience: "18 years",
      languages: ["English"],
      specialties: ["Orthopedic Surgery", "Sports Medicine", "Joint Replacement"],
      available: false,
      consultationFee: "$250",
      about: "Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement surgeries. He has helped numerous athletes and active individuals return to their peak performance through minimally invasive surgical techniques.",
      established: "Practicing since 2005",
      teamSize: "Orthopedic Surgery Specialist",
      services: [
        "Joint Replacement",
        "Sports Injury Treatment",
        "Arthroscopic Surgery",
        "Fracture Care",
        "Physical Therapy Coordination"
      ]
    }
  ];

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowProfileModal(true);
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    setBookingForm({ date: '', time: '', reason: '' });
    setFormErrors({});
  };

  const handleFormChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!bookingForm.date) {
      errors.date = 'Date is required';
    }
    if (!bookingForm.time) {
      errors.time = 'Time is required';
    }
    if (!bookingForm.reason.trim()) {
      errors.reason = 'Reason for visit is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const confirmBooking = () => {
    if (!validateForm()) {
      return;
    }

    if (selectedDoctor) {
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const newBooking = {
        id: Date.now(),
        provider: selectedDoctor.name,
        providerId: selectedDoctor.id,
        service: selectedDoctor.specialty,
        date: bookingForm.date,
        time: bookingForm.time,
        reason: bookingForm.reason,
        status: 'pending',
        timestamp: new Date().toISOString(),
        type: 'upcoming'
      };
      bookings.push(newBooking);
      localStorage.setItem('userBookings', JSON.stringify(bookings));

      // Also update user appointments for UserDashboard2
      const userAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
      userAppointments.push({
        id: newBooking.id,
        providerName: selectedDoctor.name,
        service: selectedDoctor.specialty,
        date: bookingForm.date,
        time: bookingForm.time,
        location: selectedDoctor.address,
        status: 'pending',
        type: 'upcoming'
      });
      localStorage.setItem('userAppointments', JSON.stringify(userAppointments));

      // Save to provider requests
      const providerRequests = JSON.parse(localStorage.getItem('providerRequests') || '[]');
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      providerRequests.push({
        ...newBooking,
        userEmail: currentUser?.email || 'user@example.com',
        userPhone: currentUser?.phone || 'Not provided',
        userName: currentUser?.fullName || currentUser?.name || 'User'
      });
      localStorage.setItem('providerRequests', JSON.stringify(providerRequests));

      alert(`Appointment request sent to ${selectedDoctor.name}! You will receive a confirmation soon.`);
      setShowBookingModal(false);
      setSelectedDoctor(null);
      setBookingForm({ date: '', time: '', reason: '' });
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    navTabs: {
      display: "flex",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
      padding: "0 20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    tabButton: {
      textDecoration: "none",
      background: "none",
      border: "none",
      padding: "15px 25px",
      cursor: "pointer",
      fontWeight: 500,
      color: "#555",
      transition: "0.2s",
      fontSize: "16px",
    },
    activeTab: {
      borderBottom: "3px solid #2d866a",
      fontWeight: 600,
      color: "#2d866a",
    },
    mainContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    headerSection: {
      marginBottom: "30px",
    },
    backButton: {
      textDecoration: "none",
      color: "#2d866a",
      fontWeight: "500",
      marginBottom: "15px",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "10px 16px",
      border: "2px solid #2d866a",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    },
    pageTitle: {
      fontSize: "32px",
      fontWeight: "600",
      color: "#2d866a",
      margin: "0 0 10px 0",
    },
    pageSubtitle: {
      fontSize: "18px",
      color: "#666",
      margin: "0 0 30px 0",
    },
    searchSection: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },
    searchContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    searchInput: {
      flex: "1",
      minWidth: "300px",
      padding: "12px 15px",
      border: "1px solid #e1e6e9",
      borderRadius: "8px",
      fontSize: "16px",
    },
    resultsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },
    resultsTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2d866a",
      margin: 0,
    },
    resultsCount: {
      color: "#666",
      fontSize: "16px",
    },
    doctorsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    doctorCard: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    doctorHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    doctorInfo: {
      flex: "1",
    },
    doctorName: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#333",
      margin: "0 0 5px 0",
    },
    doctorSpecialty: {
      fontSize: "16px",
      color: "#666",
      margin: "0 0 5px 0",
    },
    doctorRating: {
      fontSize: "14px",
      color: "#ffa500",
      margin: "0 0 5px 0",
    },
    doctorLocation: {
      fontSize: "14px",
      color: "#666",
      margin: 0,
    },
    specialties: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      margin: "15px 0",
    },
    specialtyTag: {
      padding: "5px 12px",
      backgroundColor: "#e8f5e8",
      color: "#2d866a",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500",
    },
    actionButtons: {
      display: "flex",
      gap: "15px",
    },
    viewProfileBtn: {
      padding: "10px 20px",
      border: "1px solid #2d866a",
      borderRadius: "5px",
      background: "white",
      color: "#2d866a",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    bookNowBtn: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      background: "#2d866a",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    unavailableBtn: {
      padding: "10px 20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      background: "#f8f9fa",
      color: "#999",
      cursor: "not-allowed",
      fontSize: "14px",
      fontWeight: "500",
    },
    buttonHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "30px",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2d866a",
      margin: 0,
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#666",
    },
    doctorDetail: {
      marginBottom: "10px",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#333",
    },
    bookingForm: {
      marginTop: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
      color: "#333",
    },
    formInput: {
      width: "100%",
      padding: "10px",
      border: "1px solid #e1e6e9",
      borderRadius: "5px",
      fontSize: "14px",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "12px",
      marginTop: "5px",
    },
    confirmButton: {
      padding: "12px 30px",
      border: "none",
      borderRadius: "5px",
      background: "#2d866a",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.2s",
      marginTop: "10px",
      width: "100%",
    },

    // Profile Modal Styles
    profileSection: {
      marginBottom: "20px",
    },
    profileTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2d866a",
      marginBottom: "10px",
    },
    servicesList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    serviceItem: {
      padding: "8px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    contactInfo: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "10px",
    },

    loadMore: {
      textAlign: "center",
      marginTop: "40px",
    },
    loadMoreBtn: {
      padding: "12px 30px",
      border: "1px solid #2d866a",
      borderRadius: "5px",
      background: "white",
      color: "#2d866a",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    footer: {
      backgroundColor: "#fff",
      padding: "40px 20px",
      marginTop: "50px",
      borderTop: "1px solid #e1e6e9",
    },
    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "40px",
    },
    footerSection: {
      marginBottom: "20px",
    },
    footerTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2d866a",
      marginBottom: "15px",
    },
    footerLinks: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    footerLink: {
      marginBottom: "8px",
    },
    footerLinkA: {
      textDecoration: "none",
      color: "#666",
      transition: "color 0.2s",
    },
    footerBottom: {
      textAlign: "center",
      marginTop: "30px",
      paddingTop: "20px",
      borderTop: "1px solid #e1e6e9",
      color: "#666",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation Tabs - Only User Dashboard */}
      <nav style={styles.navTabs}>
        <Link
          to="/user-dashboard"
          style={{
            ...styles.tabButton,
            ...(location.pathname === "/user-dashboard" ? styles.activeTab : {}),
          }}
        >
          User Dashboard
        </Link>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <Link 
            to="/user-dashboard" 
            style={styles.backButton}
            onMouseEnter={(e) => {
              e.target.style.background = "#2d866a";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#2d866a";
            }}
          >
            ← Back to Services
          </Link>
          <h1 style={styles.pageTitle}>Doctor</h1>
          <p style={styles.pageSubtitle}>
            Find trusted medical professionals for your healthcare needs
          </p>
        </div>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>Available Doctors</h2>
            <span style={styles.resultsCount}>{filteredDoctors.length} providers found</span>
          </div>

          <div style={styles.doctorsGrid}>
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} style={styles.doctorCard}>
                <div style={styles.doctorHeader}>
                  <div style={styles.doctorInfo}>
                    <h3 style={styles.doctorName}>{doctor.name}</h3>
                    <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                    <p style={styles.doctorRating}>⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
                    <p style={styles.doctorLocation}>{doctor.location}</p>
                  </div>
                </div>

                <div style={styles.specialties}>
                  {doctor.specialties.map((specialty, index) => (
                    <span key={index} style={styles.specialtyTag}>{specialty}</span>
                  ))}
                </div>

                <div style={styles.actionButtons}>
                  {/* View Profile Button */}
                  <button 
                    style={styles.viewProfileBtn}
                    onClick={() => handleViewProfile(doctor)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    View Profile
                  </button>

                  {/* Book Now Button */}
                  <button 
                    style={doctor.available ? styles.bookNowBtn : styles.unavailableBtn}
                    onClick={() => handleBookAppointment(doctor)}
                    onMouseEnter={(e) => doctor.available && Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={(e) => doctor.available && (e.target.style.transform = "translateY(0)")}
                    disabled={!doctor.available}
                  >
                    {doctor.available ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.loadMore}>
            <button 
              style={styles.loadMoreBtn}
              onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              Load More Providers
            </button>
          </div>
        </section>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedDoctor && (
        <div style={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Doctor Profile</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowProfileModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>About</h3>
              <p>{selectedDoctor.about}</p>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Professional Information</h3>
              <div style={styles.doctorDetail}>
                <strong style={styles.detailLabel}>Education:</strong> {selectedDoctor.education}
              </div>
              <div style={styles.doctorDetail}>
                <strong style={styles.detailLabel}>Experience:</strong> {selectedDoctor.experience}
              </div>
              <div style={styles.doctorDetail}>
                <strong style={styles.detailLabel}>Languages:</strong> {selectedDoctor.languages.join(", ")}
              </div>
              <div style={styles.doctorDetail}>
                <strong style={styles.detailLabel}>Consultation Fee:</strong> {selectedDoctor.consultationFee}
              </div>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Services</h3>
              <ul style={styles.servicesList}>
                {selectedDoctor.services.map((service, index) => (
                  <li key={index} style={styles.serviceItem}>{service}</li>
                ))}
              </ul>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Contact Information</h3>
              <div style={styles.contactInfo}>
                <div style={styles.doctorDetail}>
                  <strong style={styles.detailLabel}>Location:</strong> {selectedDoctor.address}
                </div>
                <div style={styles.doctorDetail}>
                  <strong style={styles.detailLabel}>Phone:</strong> {selectedDoctor.phone}
                </div>
                <div style={styles.doctorDetail}>
                  <strong style={styles.detailLabel}>Email:</strong> {selectedDoctor.email}
                </div>
              </div>
            </div>
            
            <button 
              style={styles.bookNowBtn}
              onClick={() => {
                setShowProfileModal(false);
                setShowBookingModal(true);
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div style={styles.modalOverlay} onClick={() => setShowBookingModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Book Appointment</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.doctorDetail}>
              <strong>Doctor:</strong> {selectedDoctor.name}
            </div>
            <div style={styles.doctorDetail}>
              <strong>Specialty:</strong> {selectedDoctor.specialty}
            </div>
            
            <div style={styles.bookingForm}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Preferred Date *</label>
                <input 
                  type="date" 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.date && { borderColor: '#dc3545' })
                  }}
                  value={bookingForm.date}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                {formErrors.date && <div style={styles.errorText}>{formErrors.date}</div>}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Preferred Time *</label>
                <select 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.time && { borderColor: '#dc3545' })
                  }}
                  value={bookingForm.time}
                  onChange={(e) => handleFormChange('time', e.target.value)}
                >
                  <option value="">Select a time</option>
                  <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                  <option value="Afternoon (1PM - 5PM)">Afternoon (1PM - 5PM)</option>
                  <option value="Evening (6PM - 8PM)">Evening (6PM - 8PM)</option>
                </select>
                {formErrors.time && <div style={styles.errorText}>{formErrors.time}</div>}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Reason for Visit *</label>
                <textarea 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.reason && { borderColor: '#dc3545' })
                  }}
                  rows="3" 
                  placeholder="Briefly describe your symptoms or reason for appointment..."
                  value={bookingForm.reason}
                  onChange={(e) => handleFormChange('reason', e.target.value)}
                ></textarea>
                {formErrors.reason && <div style={styles.errorText}>{formErrors.reason}</div>}
              </div>
            </div>
            
            <button 
              style={styles.confirmButton}
              onClick={confirmBooking}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>APPOINTLY</h3>
            <p>Making appointment booking easier for everyone.</p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Services</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Medical Services</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Beauty & Hair</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Legal Services</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Mental Health</a></li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Company</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>About Us</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Contact</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Careers</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Privacy Policy</a></li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Support</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Help Center</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Terms of Service</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Provider Portal</a></li>
              <li style={styles.footerLink}><a href="#" style={styles.footerLinkA}>Download App</a></li>
            </ul>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>appointment booking website - appointment scheduling applications - appointment scheduling platforms - appointment scheduling website - appointment scheduling software</p>
        </div>
      </footer>
    </div>
  );
}