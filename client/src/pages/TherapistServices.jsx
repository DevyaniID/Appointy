import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function TherapistServices() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Therapist providers data with enhanced profile information
  const therapistProviders = [
    {
      id: 1,
      name: "Dr. Rachel Green",
      specialty: "Licensed Clinical Psychologist",
      rating: 4.9,
      reviews: 121,
      practice: "Mindful Wellness Center",
      location: "123 Wellness Avenue",
      address: "123 Wellness Avenue, Suite 201, Health Center",
      phone: "(555) 123-4567",
      email: "rachel@mindfulwellness.com",
      experience: "10 years",
      education: "PhD in Clinical Psychology",
      languages: ["English", "Spanish"],
      services: ["Anxiety Treatment", "Depression Therapy", "Cognitive Behavioral Therapy", "Stress Management"],
      specialties: ["Anxiety Disorders", "Depression", "Cognitive Behavioral Therapy"],
      available: true,
      consultationFee: "$150",
      about: "Dr. Rachel Green specializes in evidence-based therapies for anxiety and depression. She creates a warm, non-judgmental space where clients can explore their thoughts and feelings while developing practical coping strategies.",
      established: "Established 2015",
      teamSize: "8 licensed therapists",
      avatar: "RG",
      hours: "Mon-Thu: 9am-7pm, Fri: 9am-5pm",
      approach: "Cognitive Behavioral Therapy, Mindfulness-Based Therapy"
    },
    {
      id: 2,
      name: "Mark Thompson",
      specialty: "Marriage & Family Therapist",
      rating: 4.8,
      reviews: 110,
      practice: "Harmony Counseling Services",
      location: "456 Harmony Lane",
      address: "456 Harmony Lane, Suite 105",
      phone: "(555) 234-5678",
      email: "mark@harmonycounseling.com",
      experience: "8 years",
      education: "LMFT Licensed Marriage and Family Therapist",
      languages: ["English"],
      services: ["Couples Therapy", "Family Counseling", "Relationship Issues", "Marriage Counseling"],
      specialties: ["Couples Therapy", "Family Systems", "Relationship Counseling"],
      available: true,
      consultationFee: "$120",
      about: "Mark Thompson helps couples and families navigate relationship challenges and improve communication. His systemic approach focuses on understanding patterns and creating positive change within relationships.",
      established: "Established 2016",
      teamSize: "6 relationship specialists",
      avatar: "MT",
      hours: "Mon-Wed: 10am-8pm, Thu-Fri: 10am-6pm",
      approach: "Family Systems Therapy, Gottman Method"
    },
    {
      id: 3,
      name: "Dr. Amanda Foster",
      specialty: "Child & Adolescent Therapist",
      rating: 4.7,
      reviews: 75,
      practice: "Growing Minds Therapy",
      location: "789 Child Development Center",
      address: "789 Child Development Center, Suite 300",
      phone: "(555) 345-6789",
      email: "amanda@growingminds.com",
      experience: "6 years",
      education: "PsyD in Child Psychology",
      languages: ["English", "French"],
      services: ["Child Psychology", "Teen Counseling", "ADHD Treatment", "Play Therapy"],
      specialties: ["Child Therapy", "Adolescent Counseling", "ADHD", "Behavioral Issues"],
      available: true,
      consultationFee: "$130",
      about: "Dr. Amanda Foster specializes in working with children and adolescents, using age-appropriate therapeutic techniques to help young clients express themselves and develop healthy coping skills.",
      established: "Established 2018",
      teamSize: "5 child specialists",
      avatar: "AF",
      hours: "Mon-Fri: 8am-6pm, Sat: 9am-1pm",
      approach: "Play Therapy, Cognitive Behavioral Therapy, Family Therapy"
    },
    {
      id: 4,
      name: "Dr. Carlos Rodriguez",
      specialty: "Trauma Specialist",
      rating: 4.8,
      reviews: 75,
      practice: "Healing Hearts Therapy",
      location: "321 Recovery Road",
      address: "321 Recovery Road, Suite 150",
      phone: "(555) 456-7890",
      email: "carlos@healinghearts.com",
      experience: "9 years",
      education: "PhD in Trauma Psychology",
      languages: ["English", "Spanish", "Portuguese"],
      services: ["PTSD Treatment", "Trauma Recovery", "EMDR Therapy", "Grief Counseling"],
      specialties: ["Trauma Therapy", "PTSD", "EMDR", "Grief and Loss"],
      available: false,
      consultationFee: "$160",
      about: "Dr. Carlos Rodriguez provides specialized trauma therapy using evidence-based approaches. He creates a safe, supportive environment for clients to process traumatic experiences and move toward healing.",
      established: "Established 2014",
      teamSize: "4 trauma specialists",
      avatar: "CR",
      hours: "Mon-Thu: 9am-7pm",
      approach: "EMDR, Trauma-Focused CBT, Somatic Therapy"
    }
  ];

  // Filter providers based on search query
  const filteredProviders = therapistProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.practice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.services.some(service => 
      service.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleViewProfile = (provider) => {
    setSelectedProvider(provider);
    setShowProfileModal(true);
  };

  const handleBookAppointment = (provider) => {
    setSelectedProvider(provider);
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
      errors.reason = 'Please describe what you would like to discuss';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const confirmBooking = () => {
    if (!validateForm()) {
      return;
    }

    if (selectedProvider) {
      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const newBooking = {
        id: Date.now(),
        provider: selectedProvider.name,
        providerId: selectedProvider.id,
        service: selectedProvider.specialty,
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
        providerName: selectedProvider.name,
        service: selectedProvider.specialty,
        date: bookingForm.date,
        time: bookingForm.time,
        location: selectedProvider.address,
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

      alert(`Appointment request sent to ${selectedProvider.name}! You will receive a confirmation soon.`);
      setShowBookingModal(false);
      setSelectedProvider(null);
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
    providersGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    providerCard: {
      backgroundColor: "#fff",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    providerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    providerInfo: {
      flex: "1",
    },
    providerName: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#333",
      margin: "0 0 5px 0",
    },
    providerSpecialty: {
      fontSize: "16px",
      color: "#666",
      margin: "0 0 5px 0",
    },
    providerRating: {
      fontSize: "14px",
      color: "#ffa500",
      margin: "0 0 5px 0",
    },
    providerPractice: {
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
    
    // Profile Modal Styles
    profileModalOverlay: {
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
    profileModalContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "30px",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    profileAvatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#2d866a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: "bold",
      marginRight: "20px",
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#2d866a",
      margin: "0 0 5px 0",
    },
    profileSpecialty: {
      fontSize: "16px",
      color: "#666",
      margin: "0 0 5px 0",
    },
    profileRating: {
      fontSize: "14px",
      color: "#ffa500",
      margin: 0,
    },
    profileSection: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#2d866a",
      marginBottom: "10px",
    },
    aboutText: {
      lineHeight: "1.6",
      color: "#555",
    },
    servicesList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    serviceTag: {
      padding: "8px 15px",
      backgroundColor: "#e8f5e8",
      color: "#2d866a",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
    },
    contactInfo: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "10px",
    },
    contactItem: {
      marginBottom: "8px",
    },
    contactLabel: {
      fontWeight: "600",
      color: "#333",
    },
    modalActions: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
    },
    
    // Booking Modal Styles
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
      maxWidth: "500px",
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
    providerDetail: {
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
          <h1 style={styles.pageTitle}>Therapist</h1>
          <p style={styles.pageSubtitle}>
            Find mental health professionals to support your wellbeing
          </p>
        </div>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, specialty, or therapy type..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>Available Therapists</h2>
            <span style={styles.resultsCount}>{filteredProviders.length} providers found</span>
          </div>

          <div style={styles.providersGrid}>
            {filteredProviders.map((provider) => (
              <div key={provider.id} style={styles.providerCard}>
                <div style={styles.providerHeader}>
                  <div style={styles.providerInfo}>
                    <h3 style={styles.providerName}>{provider.name}</h3>
                    <p style={styles.providerSpecialty}>{provider.specialty}</p>
                    <p style={styles.providerRating}>⭐ {provider.rating} ({provider.reviews} reviews)</p>
                    <p style={styles.providerPractice}>{provider.practice}</p>
                  </div>
                </div>

                <div style={styles.specialties}>
                  {provider.services.slice(0, 3).map((service, index) => (
                    <span key={index} style={styles.specialtyTag}>{service}</span>
                  ))}
                  {provider.services.length > 3 && (
                    <span style={styles.specialtyTag}>+{provider.services.length - 3} more</span>
                  )}
                </div>

                <div style={styles.actionButtons}>
                  {/* View Profile Button */}
                  <button 
                    style={styles.viewProfileBtn}
                    onClick={() => handleViewProfile(provider)}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    View Profile
                  </button>

                  {/* Book Now Button */}
                  <button 
                    style={provider.available ? styles.bookNowBtn : styles.unavailableBtn}
                    onClick={() => handleBookAppointment(provider)}
                    onMouseEnter={(e) => provider.available && Object.assign(e.target.style, styles.buttonHover)}
                    onMouseLeave={(e) => provider.available && (e.target.style.transform = "translateY(0)")}
                    disabled={!provider.available}
                  >
                    {provider.available ? "Book Now" : "Unavailable"}
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
      {showProfileModal && selectedProvider && (
        <div style={styles.profileModalOverlay} onClick={() => setShowProfileModal(false)}>
          <div style={styles.profileModalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.profileHeader}>
              <div style={styles.profileAvatar}>
                {selectedProvider.avatar}
              </div>
              <div style={styles.profileInfo}>
                <h2 style={styles.profileName}>{selectedProvider.name}</h2>
                <p style={styles.profileSpecialty}>{selectedProvider.specialty}</p>
                <p style={styles.profileRating}>⭐ {selectedProvider.rating} ({selectedProvider.reviews} reviews)</p>
              </div>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>About</h3>
              <p style={styles.aboutText}>{selectedProvider.about}</p>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>Practice Information</h3>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Practice:</span> {selectedProvider.practice}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Experience:</span> {selectedProvider.experience}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Education:</span> {selectedProvider.education}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Therapeutic Approach:</span> {selectedProvider.approach}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>{selectedProvider.established}</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>{selectedProvider.teamSize}</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Session Fee:</span> {selectedProvider.consultationFee}
                </div>
              </div>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>Therapy Services</h3>
              <div style={styles.servicesList}>
                {selectedProvider.services.map((service, index) => (
                  <span key={index} style={styles.serviceTag}>{service}</span>
                ))}
              </div>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>Contact Information</h3>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Address:</span> {selectedProvider.address}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Phone:</span> {selectedProvider.phone}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Email:</span> {selectedProvider.email}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Languages:</span> {selectedProvider.languages.join(", ")}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Office Hours:</span> {selectedProvider.hours}
                </div>
              </div>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={styles.viewProfileBtn}
                onClick={() => setShowProfileModal(false)}
              >
                Close
              </button>
              <button 
                style={selectedProvider.available ? styles.bookNowBtn : styles.unavailableBtn}
                onClick={() => {
                  setShowProfileModal(false);
                  handleBookAppointment(selectedProvider);
                }}
                disabled={!selectedProvider.available}
              >
                {selectedProvider.available ? "Book Session" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <div style={styles.modalOverlay} onClick={() => setShowBookingModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Book Therapy Session</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.providerDetail}>
              <strong>Therapist:</strong> {selectedProvider.name}
            </div>
            <div style={styles.providerDetail}>
              <strong>Specialty:</strong> {selectedProvider.specialty}
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
                <label style={styles.formLabel}>What would you like to discuss? *</label>
                <textarea 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.reason && { borderColor: '#dc3545' })
                  }}
                  rows="3" 
                  placeholder="Briefly describe what you'd like to work on in therapy..."
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
              Book Therapy Session
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