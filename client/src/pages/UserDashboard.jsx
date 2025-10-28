import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// BookingModal Component (keep this as is)
const BookingModal = ({ provider, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  // Holidays and unavailable dates
  const holidays = ['2024-12-25', '2024-12-31'];
  const unavailableDates = ['2024-12-20', '2024-12-21'];

  const isDateAvailable = (date) => {
    const day = new Date(date).getDay();
    // Not available on Sundays
    if (day === 0) return false;
    if (holidays.includes(date)) return false;
    if (unavailableDates.includes(date)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime && selectedService) {
      if (!isDateAvailable(selectedDate)) {
        alert('Selected date is not available. Please choose another date.');
        return;
      }
      onConfirm({
        date: selectedDate,
        time: selectedTime,
        service: selectedService
      });
    } else {
      alert('Please fill all fields');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Next day
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  };

  return (
    <div style={bookingModalStyles.modalOverlay} onClick={onClose}>
      <div style={bookingModalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button style={bookingModalStyles.closeBtn} onClick={onClose}>×</button>
        
        <h2 style={bookingModalStyles.title}>Book Appointment with {provider.name}</h2>
        
        <form onSubmit={handleSubmit} style={bookingModalStyles.form}>
          <div style={bookingModalStyles.formGroup}>
            <label style={bookingModalStyles.label}>Select Service:</label>
            <select 
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
              style={bookingModalStyles.select}
              required
            >
              <option value="">Choose a service</option>
              {provider.services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div style={bookingModalStyles.formGroup}>
            <label style={bookingModalStyles.label}>Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              style={bookingModalStyles.input}
              required
            />
            {selectedDate && !isDateAvailable(selectedDate) && (
              <p style={bookingModalStyles.error}>Selected date is not available</p>
            )}
          </div>

          <div style={bookingModalStyles.formGroup}>
            <label style={bookingModalStyles.label}>Select Time Slot:</label>
            <div style={bookingModalStyles.timeSlots}>
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    ...bookingModalStyles.timeSlot,
                    ...(selectedTime === time ? bookingModalStyles.selectedTimeSlot : {})
                  }}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div style={bookingModalStyles.availabilityInfo}>
            <h4>📅 Availability Information:</h4>
            <p>🕒 Working Hours: {provider.contact.hours}</p>
            <p>🚫 Holidays: Christmas (Dec 25), New Year's Eve (Dec 31)</p>
            <p>❌ Closed on Sundays</p>
            <p>⏰ Slot Duration: 1 hour</p>
          </div>

          <div style={bookingModalStyles.formActions}>
            <button type="button" style={bookingModalStyles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              style={bookingModalStyles.confirmBtn}
              disabled={!selectedDate || !selectedTime || !selectedService || !isDateAvailable(selectedDate)}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Booking Modal Styles (keep this as is)
const bookingModalStyles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#2d866a',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: 'white'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  timeSlots: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  timeSlot: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '14px'
  },
  selectedTimeSlot: {
    backgroundColor: '#2d866a',
    color: 'white',
    borderColor: '#2d866a'
  },
  availabilityInfo: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #e9ecef',
    fontSize: '14px'
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
    margin: '5px 0 0 0'
  },
  formActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  cancelBtn: {
    padding: '10px 20px',
    border: '1px solid #6c757d',
    borderRadius: '4px',
    background: 'white',
    color: '#6c757d',
    cursor: 'pointer',
    fontSize: '14px'
  },
  confirmBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: '#28a745',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    opacity: 1,
    transition: 'opacity 0.2s'
  }
};

// Main UserDashboard Component
export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user data when component loads
    const userData = getCurrentUser();
    setCurrentUser(userData);
    
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  // Navigation tabs - UPDATED
  const tabs = [
    { label: "Book Appointments", path: "/user-dashboard" },
    { label: "My Appointments & Profile", path: "/user-dashboard2" },
  ];

  // Provider data with detailed information
  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      rating: "⭐ 4.8 (105 reviews)",
      details: "Family Medicine Physician",
      specialty: "Family Medicine",
      avatar: "DSJ",
      about: "Dr. Sarah Johnson is a board-certified family medicine physician with over 15 years of experience. She specializes in preventive care, chronic disease management, and comprehensive healthcare for patients of all ages.",
      experience: "15+ years",
      education: "Johns Hopkins University",
      languages: "English, Spanish",
      services: [
        "Family Medicine Consultation",
        "Preventive Care", 
        "Chronic Disease Management",
        "Health Checkups",
        "Vaccinations"
      ],
      contact: {
        address: "123 Medical Ave, Suite 405, Downtown",
        phone: "(555) 123-4567",
        email: "dr.johnson@medicalcenter.com",
        hours: "Mon-Fri: 8am-6pm"
      }
    },
    {
      id: 2,
      name: "Studio Belle Salon",
      rating: "⭐ 4.6 (89 reviews)",
      details: "Premium Beauty Salon", 
      specialty: "Hair & Beauty",
      avatar: "SBS",
      about: "Studio Belle is a premier beauty salon specializing in hair styling, coloring, and beauty treatments. Our team of experienced stylists is dedicated to providing personalized services to help you look and feel your best.",
      established: "Established 2010",
      teamSize: "12 professionals",
      services: [
        "Haircuts & Styling",
        "Hair Coloring",
        "Highlights & Balayage",
        "Keratin Treatments",
        "Manicures & Pedicures",
        "Facials & Skincare"
      ],
      contact: {
        address: "456 Beauty Blvd, Main Street Plaza",
        phone: "(555) 987-6543",
        email: "info@studiobelle.com",
        hours: "Tue-Sat: 9am-8pm, Sun: 10am-5pm"
      }
    },
    {
      id: 3,
      name: "Legal Solutions Firm",
      rating: "⭐ 4.7 (76 reviews)",
      details: "Corporate Law Specialists",
      specialty: "Corporate Law",
      avatar: "LSF",
      about: "Legal Solutions Firm is a full-service law practice specializing in corporate law, business formation, contracts, and intellectual property. Our team of experienced attorneys provides comprehensive legal solutions for businesses of all sizes.",
      founded: "Founded 2005",
      teamSize: "8 attorneys",
      services: [
        "Business Formation",
        "Contract Review",
        "Intellectual Property",
        "Mergers & Acquisitions",
        "Legal Consultation"
      ],
      contact: {
        address: "789 Justice St, Floor 12, Business District",
        phone: "(555) 456-7890",
        email: "contact@legalsolutions.com",
        hours: "Mon-Fri: 8:30am-6:30pm"
      }
    },
    {
      id: 4,
      name: "Mindful Therapy Center",
      rating: "⭐ 4.9 (92 reviews)",
      details: "Mental Health Specialists",
      specialty: "Therapy",
      avatar: "MTC",
      about: "Mindful Therapy Center provides compassionate mental health services with licensed therapists specializing in various therapeutic approaches to support your mental wellbeing.",
      established: "Established 2015",
      teamSize: "6 licensed therapists",
      services: [
        "Individual Therapy",
        "Couples Counseling",
        "Anxiety Treatment",
        "Depression Therapy",
        "Stress Management"
      ],
      contact: {
        address: "321 Wellness Ave, Health Center",
        phone: "(555) 234-5678",
        email: "therapy@mindfulcenter.com",
        hours: "Mon-Thu: 9am-7pm, Fri: 9am-5pm"
      }
    }
  ];

  // Services with respective paths
  const services = [
    { icon: "👩‍⚕️", name: "Doctor", desc: "Medical Services", path: "/doctor-services" },
    { icon: "✂️", name: "Salon", desc: "Beauty & Hair", path: "/salon-services" },
    { icon: "⚖️", name: "Lawyer", desc: "Legal Services", path: "/lawyer-services" },
    { icon: "❤️", name: "Therapist", desc: "Mental Health", path: "/therapist-services" },
  ];

  // Get current user data
  const getCurrentUser = () => {
    try {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        return JSON.parse(currentUser);
      }
      const userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        return JSON.parse(userProfile);
      }
      return null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  const userName = currentUser?.fullName || currentUser?.name || "User";
  const userEmail = currentUser?.email || "";
  const userPhone = currentUser?.phone || "";
  const userAvatar = currentUser?.fullName ? 
    currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 
    "U";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Handle view profile
  const handleViewProfile = (provider) => {
    setSelectedProvider(provider);
    setShowProfileModal(true);
  };

  // Handle book now
  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowProfileModal(false);
    setShowBookingModal(false);
    setSelectedProvider(null);
  };

  // Handle booking confirmation
  const handleBookingConfirm = (bookingData) => {
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const newBooking = {
      id: Date.now(),
      provider: selectedProvider.name,
      providerId: selectedProvider.id,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      timestamp: new Date().toISOString(),
      user: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      type: new Date(bookingData.date) > new Date() ? 'upcoming' : 'past'
    };
    bookings.push(newBooking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
    
    // Also update user appointments for UserDashboard2
    const userAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
    userAppointments.push({
      id: newBooking.id,
      providerName: selectedProvider.name,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      location: selectedProvider.contact.address,
      status: 'pending',
      type: 'upcoming',
      userEmail: userEmail
    });
    localStorage.setItem('userAppointments', JSON.stringify(userAppointments));
    
    // Save to provider requests
    const providerRequests = JSON.parse(localStorage.getItem('providerRequests') || '[]');
    providerRequests.push({
      ...newBooking,
      userEmail: userEmail,
      userPhone: userPhone || 'Not provided'
    });
    localStorage.setItem('providerRequests', JSON.stringify(providerRequests));
    
    alert(`✅ Request has been sent to ${selectedProvider.name}\n\nThey will respond within 24 hours. You can check the status in "My Appointments & Profile".`);
    handleCloseModal();
  };

  // Handle service card hover
  const handleServiceHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
    }
  };

  // Handle provider card hover
  const handleProviderHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    } else {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
    }
  };

  // Handle view profile button hover
  const handleViewProfileHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.backgroundColor = "#5a6268";
    } else {
      e.currentTarget.style.backgroundColor = "#6c757d";
    }
  };

  // Handle book now button hover
  const handleBookNowHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.backgroundColor = "#218838";
    } else {
      e.currentTarget.style.backgroundColor = "#28a745";
    }
  };

  // Handle close button hover
  const handleCloseBtnHover = (e, isHover) => {
    if (isHover) {
      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  // Handle service card click
  const handleServiceClick = (servicePath) => {
    navigate(servicePath);
  };

  // View User Profile
  const handleViewUserProfile = () => {
    navigate('/user-dashboard2');
  };

  // Styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    navTabs: {
      display: "flex",
      borderBottom: "1px solid #ddd",
      marginBottom: "30px",
      backgroundColor: "#fff",
      padding: "0 20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      justifyContent: "space-between",
      alignItems: "center",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
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
    logoutButton: {
      padding: "8px 16px",
      border: "1px solid #e74c3c",
      borderRadius: "5px",
      background: "transparent",
      color: "#e74c3c",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "0.2s",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      color: "#666",
      fontWeight: "500",
      cursor: "pointer",
    },
    userAvatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      backgroundColor: "#2d866a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "14px",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    heroSection: {
      backgroundColor: "#2d866a",
      color: "white",
      padding: "40px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    mainTitle: { fontSize: "32px", fontWeight: "bold", marginBottom: "15px" },
    subTitle: { fontSize: "18px", marginBottom: "25px", opacity: "0.9" },
    searchBarContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "50px",
      padding: "12px 20px",
      maxWidth: "600px",
      margin: "0 auto",
    },
    searchIcon: { marginRight: "10px", color: "#666", fontSize: "18px" },
    searchInput: { border: "none", outline: "none", flex: 1, fontSize: "16px", color: "#333" },
    contentRow: { display: "flex", gap: "30px", flexWrap: "wrap" },
    section: { 
      flex: 1, 
      minWidth: "300px", 
      background: "#fff", 
      padding: "25px", 
      borderRadius: "15px", 
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)" 
    },
    browseTitle: { fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#2d866a" },
    serviceGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
    serviceCard: {
      border: "1px solid #e1e6e9",
      borderRadius: "12px",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      display: "block",
      backgroundColor: "white",
    },
    serviceIcon: { fontSize: "32px", marginBottom: "12px" },
    serviceName: { fontSize: "18px", fontWeight: "600", marginBottom: "5px", color: "#333" },
    serviceDesc: { fontSize: "14px", color: "#666" },
    providersTitle: { fontSize: "22px", fontWeight: 600, marginBottom: "20px", color: "#2d866a" },
    providerList: { display: "flex", flexDirection: "column", gap: "20px" },
    providerCard: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #e1e6e9",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      transition: "transform 0.2s, box-shadow 0.2s",
      backgroundColor: "white",
    },
    providerImage: {
      width: "70px",
      height: "70px",
      backgroundColor: "#2d866a",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "20px",
      fontSize: "1.2rem",
      fontWeight: "bold"
    },
    providerInfo: { flex: 1 },
    providerName: { fontSize: "18px", fontWeight: "600", marginBottom: "5px", color: "#333" },
    providerRating: { fontSize: "14px", color: "#ffa500", marginBottom: "5px" },
    providerDetails: { fontSize: "14px", color: "#666", marginBottom: "10px" },
    providerSpecialties: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      margin: "10px 0"
    },
    specialtyTag: {
      padding: "4px 8px",
      backgroundColor: "#e9ecef",
      color: "#495057",
      borderRadius: "12px",
      fontSize: "12px"
    },
    providerActions: {
      display: "flex",
      gap: "10px",
      marginTop: "10px"
    },
    viewProfileBtn: {
      padding: "8px 16px",
      background: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    bookNowBtn: {
      padding: "8px 16px",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    
    // Modal Styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "15px",
      width: "100%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      position: "relative",
    },
    modalHeader: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "white",
      padding: "30px",
      borderRadius: "15px 15px 0 0",
      display: "flex",
      alignItems: "center",
    },
    modalAvatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "2.5rem",
      marginRight: "25px",
    },
    modalHeaderText: {
      flex: 1,
    },
    modalName: {
      fontSize: "2rem",
      marginBottom: "5px",
    },
    modalRating: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      fontSize: "1.1rem",
    },
    modalSpecialty: {
      fontSize: "1.2rem",
      opacity: "0.9",
    },
    modalBody: {
      padding: "30px",
    },
    modalSection: {
      marginBottom: "30px",
    },
    modalSectionTitle: {
      fontSize: "1.4rem",
      color: "#2c3e50",
      marginBottom: "15px",
      paddingBottom: "8px",
      borderBottom: "1px solid #ecf0f1",
    },
    modalDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "15px",
    },
    detailItem: {
      marginBottom: "15px",
    },
    detailLabel: {
      fontWeight: "600",
      color: "#7f8c8d",
      marginBottom: "5px",
    },
    detailValue: {
      color: "#2c3e50",
    },
    closeBtn: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
    },
    profileBio: {
      lineHeight: "1.7",
      color: "#555",
    },
    servicesList: {
      listStyleType: "none",
    },
    serviceListItem: {
      padding: "8px 0",
      borderBottom: "1px solid #ecf0f1",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation Tabs */}
      <nav style={styles.navTabs}>
        <div style={styles.leftSection}>
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              to={tab.path}
              style={{
                ...styles.tabButton,
                ...(location.pathname === tab.path ? styles.activeTab : {}),
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div style={styles.rightSection}>
          <div style={styles.userInfo} onClick={handleViewUserProfile}>
            <div style={styles.userAvatar}>
              {userAvatar}
            </div>
            <span>Welcome, {userName}</span>
          </div>
          <button 
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e74c3c";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#e74c3c";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <h1 style={styles.mainTitle}>Welcome back, {userName}!</h1>
          <p style={styles.subTitle}>
            Find and book appointments with trusted service providers
          </p>
          <div style={styles.searchBarContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search for services, providers, or locations..."
              style={styles.searchInput}
            />
          </div>
        </section>

        {/* Browse Services & Providers */}
        <div style={styles.contentRow}>
          {/* Browse Services */}
          <section style={styles.section}>
            <h2 style={styles.browseTitle}>Browse Services</h2>
            <div style={styles.serviceGrid}>
              {services.map((service, idx) => (
                <div 
                  key={idx}
                  style={styles.serviceCard}
                  onMouseEnter={(e) => handleServiceHover(e, true)}
                  onMouseLeave={(e) => handleServiceHover(e, false)}
                  onClick={() => handleServiceClick(service.path)}
                >
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDesc}>{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Providers Near You */}
          <section style={styles.section}>
            <h2 style={styles.providersTitle}>Providers Near You</h2>
            <div style={styles.providerList}>
              {providers.map((provider, idx) => (
                <div
                  key={provider.id}
                  style={styles.providerCard}
                  onMouseEnter={(e) => handleProviderHover(e, true)}
                  onMouseLeave={(e) => handleProviderHover(e, false)}
                >
                  <div style={styles.providerImage}>
                    {provider.avatar}
                  </div>
                  <div style={styles.providerInfo}>
                    <h3 style={styles.providerName}>{provider.name}</h3>
                    <p style={styles.providerRating}>{provider.rating}</p>
                    <p style={styles.providerDetails}>{provider.details}</p>
                    <div style={styles.providerSpecialties}>
                      {provider.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} style={styles.specialtyTag}>{service}</span>
                      ))}
                    </div>
                    <div style={styles.providerActions}>
                      <button 
                        style={styles.viewProfileBtn}
                        onMouseEnter={(e) => handleViewProfileHover(e, true)}
                        onMouseLeave={(e) => handleViewProfileHover(e, false)}
                        onClick={() => handleViewProfile(provider)}
                      >
                        View Profile
                      </button>
                      <button 
                        style={styles.bookNowBtn}
                        onMouseEnter={(e) => handleBookNowHover(e, true)}
                        onMouseLeave={(e) => handleBookNowHover(e, false)}
                        onClick={() => handleBookNow(provider)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedProvider && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeBtn}
              onClick={handleCloseModal}
              onMouseEnter={(e) => handleCloseBtnHover(e, true)}
              onMouseLeave={(e) => handleCloseBtnHover(e, false)}
            >
              &times;
            </button>
            
            <div style={styles.modalHeader}>
              <div style={styles.modalAvatar}>
                {selectedProvider.avatar}
              </div>
              <div style={styles.modalHeaderText}>
                <h2 style={styles.modalName}>{selectedProvider.name}</h2>
                <div style={styles.modalRating}>
                  <span>{selectedProvider.rating}</span>
                </div>
                <p style={styles.modalSpecialty}>{selectedProvider.details}</p>
              </div>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>About</h3>
                <p style={styles.profileBio}>{selectedProvider.about}</p>
              </div>
              
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Details</h3>
                <div style={styles.modalDetails}>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Specialty</div>
                    <div style={styles.detailValue}>{selectedProvider.specialty}</div>
                  </div>
                  {selectedProvider.experience && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Experience</div>
                      <div style={styles.detailValue}>{selectedProvider.experience}</div>
                    </div>
                  )}
                  {selectedProvider.education && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Education</div>
                      <div style={styles.detailValue}>{selectedProvider.education}</div>
                    </div>
                  )}
                  {selectedProvider.languages && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Languages</div>
                      <div style={styles.detailValue}>{selectedProvider.languages}</div>
                    </div>
                  )}
                  {selectedProvider.established && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Established</div>
                      <div style={styles.detailValue}>{selectedProvider.established}</div>
                    </div>
                  )}
                  {selectedProvider.founded && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Founded</div>
                      <div style={styles.detailValue}>{selectedProvider.founded}</div>
                    </div>
                  )}
                  {selectedProvider.teamSize && (
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Team Size</div>
                      <div style={styles.detailValue}>{selectedProvider.teamSize}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Services</h3>
                <ul style={styles.servicesList}>
                  {selectedProvider.services.map((service, index) => (
                    <li key={index} style={styles.serviceListItem}>{service}</li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Contact</h3>
                <div style={styles.modalDetails}>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Address</div>
                    <div style={styles.detailValue}>{selectedProvider.contact.address}</div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Phone</div>
                    <div style={styles.detailValue}>{selectedProvider.contact.phone}</div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Email</div>
                    <div style={styles.detailValue}>{selectedProvider.contact.email}</div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>Hours</div>
                    <div style={styles.detailValue}>{selectedProvider.contact.hours}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedProvider && (
        <BookingModal 
          provider={selectedProvider}
          onClose={handleCloseModal}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}