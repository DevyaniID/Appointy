import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SalonServices() {
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

  // Salon providers data
  const salonProviders = [
    {
      id: 1,
      name: "Maria Gonzalez",
      specialty: "Master Hair Stylist",
      rating: 4.9,
      reviews: 125,
      salon: "Studio Belle Salon",
      location: "456 Beauty Blvd, Main Street Plaza",
      address: "456 Beauty Blvd, Suite 201, Main Street Plaza",
      phone: "(555) 987-6543",
      email: "maria@studiobelle.com",
      experience: "8 years",
      education: "Certified Hair Stylist from Beauty Academy",
      languages: ["English", "Spanish"],
      services: ["Hair Cutting", "Color Treatment", "Hair Extensions", "Keratin Treatment"],
      specialties: ["Hair Styling", "Color Specialist", "Hair Treatments"],
      available: true,
      consultationFee: "$80",
      about: "Maria Gonzalez is a master hair stylist with over 8 years of experience in the beauty industry. She specializes in creative coloring, precision cutting, and advanced hair treatments. Maria is passionate about helping clients achieve their desired look while maintaining hair health and integrity.",
      established: "Professional since 2015",
      teamSize: "Senior Stylist",
      servicesList: ["Hair Cutting & Styling", "Color Treatment & Highlights", "Hair Extensions", "Keratin Treatment", "Hair Treatments", "Bridal Styling"]
    },
    {
      id: 2,
      name: "Ashley Thompson",
      specialty: "Nail Artist & Technician",
      rating: 4.8,
      reviews: 102,
      salon: "Glamour Nails Studio",
      location: "789 Nail Art Avenue",
      address: "789 Nail Art Avenue, Suite 105",
      phone: "(555) 234-5678",
      email: "ashley@glamournails.com",
      experience: "6 years",
      education: "Licensed Nail Technician",
      languages: ["English"],
      services: ["Manicure", "Pedicure", "Nail Art", "Gel Nails"],
      specialties: ["Nail Art", "Gel Manicures", "Spa Pedicures"],
      available: true,
      consultationFee: "$60",
      about: "Ashley Thompson is a creative nail artist known for her intricate designs and attention to detail. With 6 years of experience, she specializes in gel manicures, nail art, and therapeutic pedicures. Ashley stays updated with the latest nail trends and techniques to provide exceptional service.",
      established: "Professional since 2017",
      teamSize: "Lead Nail Technician",
      servicesList: ["Classic Manicure", "Spa Pedicure", "Gel Nails", "Nail Art Design", "Nail Extensions", "Nail Repair"]
    },
    {
      id: 3,
      name: "David Kim",
      specialty: "Barber & Men's Grooming",
      rating: 4.7,
      reviews: 61,
      salon: "Classic Cuts Barbershop",
      location: "321 Barber Street",
      address: "321 Barber Street, Downtown",
      phone: "(555) 345-6789",
      email: "david@classiccuts.com",
      experience: "10 years",
      education: "Master Barber Certification",
      languages: ["English", "Korean"],
      services: ["Men's Haircuts", "Beard Trimming", "Hot Towel Shave", "Hair Coloring"],
      specialties: ["Men's Grooming", "Beard Styling", "Classic Cuts"],
      available: true,
      consultationFee: "$45",
      about: "David Kim is a master barber with a decade of experience in men's grooming. He specializes in classic and modern haircuts, precision beard work, and traditional hot towel shaves. David takes pride in providing a relaxing barbershop experience with exceptional attention to detail.",
      established: "Professional since 2013",
      teamSize: "Master Barber",
      servicesList: ["Men's Haircuts", "Beard Trimming & Styling", "Hot Towel Shave", "Hair Coloring", "Scalp Treatments", "Face Massage"]
    },
    {
      id: 4,
      name: "Sophie Laurent",
      specialty: "Esthetician & Spa Therapist",
      rating: 4.9,
      reviews: 138,
      salon: "Serenity Day Spa",
      location: "654 Spa Lane",
      address: "654 Spa Lane, Wellness Center",
      phone: "(555) 456-7890",
      email: "sophie@serenityspa.com",
      experience: "7 years",
      education: "Licensed Esthetician",
      languages: ["English", "French"],
      services: ["Facials", "Skincare Treatments", "Massage Therapy", "Waxing"],
      specialties: ["Facials", "Skincare", "Relaxation Therapy"],
      available: false,
      consultationFee: "$95",
      about: "Sophie Laurent is a licensed esthetician and spa therapist with 7 years of experience in skincare and relaxation therapies. She specializes in customized facials, advanced skincare treatments, and therapeutic massage. Sophie is dedicated to helping clients achieve healthy, radiant skin through personalized treatment plans.",
      established: "Professional since 2016",
      teamSize: "Senior Esthetician",
      servicesList: ["Custom Facials", "Skincare Treatments", "Therapeutic Massage", "Waxing Services", "Chemical Peels", "Microdermabrasion"]
    }
  ];

  // Filter providers based on search query
  const filteredProviders = salonProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.salon.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      errors.reason = 'Service details are required';
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
    providerLocation: {
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
          <h1 style={styles.pageTitle}>Salon</h1>
          <p style={styles.pageSubtitle}>
            Book appointments for beauty, hair, and grooming services
          </p>
        </div>

        {/* Search Section */}
        <section style={styles.searchSection}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, specialty, or service..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>Available Salons</h2>
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
                    <p style={styles.providerLocation}>{provider.salon}</p>
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
        <div style={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Beauty Professional Profile</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowProfileModal(false)}
              >
                ×
              </button>
            </div>
            
            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>About</h3>
              <p>{selectedProvider.about}</p>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Professional Information</h3>
              <div style={styles.providerDetail}>
                <strong style={styles.detailLabel}>Education:</strong> {selectedProvider.education}
              </div>
              <div style={styles.providerDetail}>
                <strong style={styles.detailLabel}>Experience:</strong> {selectedProvider.experience}
              </div>
              <div style={styles.providerDetail}>
                <strong style={styles.detailLabel}>Languages:</strong> {selectedProvider.languages.join(", ")}
              </div>
              <div style={styles.providerDetail}>
                <strong style={styles.detailLabel}>Consultation Fee:</strong> {selectedProvider.consultationFee}
              </div>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Services</h3>
              <ul style={styles.servicesList}>
                {selectedProvider.servicesList.map((service, index) => (
                  <li key={index} style={styles.serviceItem}>{service}</li>
                ))}
              </ul>
            </div>

            <div style={styles.profileSection}>
              <h3 style={styles.profileTitle}>Contact Information</h3>
              <div style={styles.contactInfo}>
                <div style={styles.providerDetail}>
                  <strong style={styles.detailLabel}>Salon:</strong> {selectedProvider.salon}
                </div>
                <div style={styles.providerDetail}>
                  <strong style={styles.detailLabel}>Location:</strong> {selectedProvider.address}
                </div>
                <div style={styles.providerDetail}>
                  <strong style={styles.detailLabel}>Phone:</strong> {selectedProvider.phone}
                </div>
                <div style={styles.providerDetail}>
                  <strong style={styles.detailLabel}>Email:</strong> {selectedProvider.email}
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
      {showBookingModal && selectedProvider && (
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
            
            <div style={styles.providerDetail}>
              <strong>Provider:</strong> {selectedProvider.name}
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
                <label style={styles.formLabel}>Service Details *</label>
                <textarea 
                  style={{
                    ...styles.formInput,
                    ...(formErrors.reason && { borderColor: '#dc3545' })
                  }}
                  rows="3" 
                  placeholder="Describe the service you're looking for..."
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