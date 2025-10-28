import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function LawyerServices() {
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

  // Lawyer providers data with enhanced profile information
  const lawyerProviders = [
    {
      id: 1,
      name: "Jennifer Adams",
      specialty: "Family Law Attorney",
      rating: 4.8,
      reviews: 214,
      firm: "Adams & Associates Law Firm",
      location: "123 Legal Avenue, Downtown",
      address: "123 Legal Avenue, Suite 500, Downtown",
      phone: "(555) 123-4567",
      email: "jennifer@adamslaw.com",
      experience: "12 years",
      education: "JD from Harvard Law School",
      languages: ["English", "Spanish"],
      services: ["Divorce Law", "Child Custody", "Adoption Services", "Family Mediation"],
      specialties: ["Family Law", "Child Custody", "Divorce Proceedings"],
      available: true,
      consultationFee: "$200",
      about: "Jennifer Adams is a dedicated family law attorney with over 12 years of experience helping families navigate complex legal matters. She is committed to providing compassionate yet strong legal representation.",
      established: "Established 2012",
      teamSize: "8 legal professionals",
      avatar: "JA",
      hours: "Mon-Fri: 9am-6pm, Sat: 10am-2pm"
    },
    {
      id: 2,
      name: "Robert Harrison",
      specialty: "Corporate Law Attorney",
      rating: 4.7,
      reviews: 230,
      firm: "Harrison Legal Group",
      location: "456 Corporate Plaza",
      address: "456 Corporate Plaza, Floor 15",
      phone: "(555) 234-5678",
      email: "robert@harrisonlegal.com",
      experience: "15 years",
      education: "JD from Stanford Law School",
      languages: ["English"],
      services: ["Business Law", "Contract Negotiation", "Mergers & Acquisitions", "Corporate Compliance"],
      specialties: ["Corporate Law", "Business Formation", "Contract Law"],
      available: true,
      consultationFee: "$300",
      about: "Robert Harrison specializes in corporate law and has successfully guided numerous businesses through complex legal landscapes. His expertise in mergers and acquisitions is particularly renowned.",
      established: "Established 2008",
      teamSize: "12 legal professionals",
      avatar: "RH",
      hours: "Mon-Fri: 8am-7pm"
    },
    {
      id: 3,
      name: "Lisa Morgan",
      specialty: "Personal Injury Lawyer",
      rating: 4.9,
      reviews: 309,
      firm: "Morgan & Partners",
      location: "789 Justice Street",
      address: "789 Justice Street, Suite 300",
      phone: "(555) 345-6789",
      email: "lisa@morganpartners.com",
      experience: "10 years",
      education: "JD from Columbia Law School",
      languages: ["English", "French"],
      services: ["Personal Injury", "Auto Accidents", "Medical Malpractice", "Workplace Injuries"],
      specialties: ["Personal Injury", "Accident Claims", "Medical Malpractice"],
      available: true,
      consultationFee: "$250",
      about: "Lisa Morgan is a passionate advocate for personal injury victims, having secured millions in settlements for her clients. She believes in fighting for justice for those who have been wrongfully injured.",
      established: "Established 2013",
      teamSize: "15 legal professionals",
      avatar: "LM",
      hours: "Mon-Thu: 8:30am-6pm, Fri: 8:30am-5pm"
    },
    {
      id: 4,
      name: "Thomas Baker",
      specialty: "Estate Planning Attorney",
      rating: 4.6,
      reviews: 107,
      firm: "Baker Law Office",
      location: "321 Estate Lane",
      address: "321 Estate Lane, Suite 150",
      phone: "(555) 456-7890",
      email: "thomas@bakerlawoffice.com",
      experience: "8 years",
      education: "JD from Yale Law School",
      languages: ["English", "German"],
      services: ["Estate Planning", "Wills & Trusts", "Probate Law", "Estate Administration"],
      specialties: ["Estate Planning", "Wills & Trusts", "Probate"],
      available: false,
      consultationFee: "$180",
      about: "Thomas Baker provides comprehensive estate planning services, helping families protect their assets and ensure their wishes are carried out. He takes a personalized approach to each client's unique situation.",
      established: "Established 2015",
      teamSize: "5 legal professionals",
      avatar: "TB",
      hours: "Mon-Fri: 9am-5pm"
    }
  ];

  // Filter providers based on search query
  const filteredProviders = lawyerProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      errors.reason = 'Legal matter details are required';
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
    providerFirm: {
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
          <h1 style={styles.pageTitle}>Lawyer</h1>
          <p style={styles.pageSubtitle}>
            Connect with experienced legal professionals
          </p>
        </div>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, specialty, or legal service..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>Available Lawyers</h2>
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
                    <p style={styles.providerFirm}>{provider.firm}</p>
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
                  <span style={styles.contactLabel}>Firm:</span> {selectedProvider.firm}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Experience:</span> {selectedProvider.experience}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Education:</span> {selectedProvider.education}
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>{selectedProvider.established}</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>{selectedProvider.teamSize}</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Consultation Fee:</span> {selectedProvider.consultationFee}
                </div>
              </div>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>Legal Services</h3>
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
                {selectedProvider.available ? "Book Consultation" : "Currently Unavailable"}
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
              <h2 style={styles.modalTitle}>Book Legal Consultation</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowBookingModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.providerDetail}>
              <strong>Lawyer:</strong> {selectedProvider.name}
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
                <label style={styles.formLabel}>Legal Matter Details *</label>
                <textarea 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.reason && { borderColor: '#dc3545' })
                  }}
                  rows="3" 
                  placeholder="Briefly describe your legal matter or consultation needs..."
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
              Book Consultation
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