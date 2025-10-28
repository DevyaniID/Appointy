import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UserDashboard2() {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [userData, setUserData] = useState({
    fullName: "Loading...",
    email: "Loading...",
    profilePhoto: null
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: ""
  });

  // Sample appointments data
  const sampleAppointments = [
    {
      id: 1,
      providerName: "Dr. Sarah Johnson",
      service: "Medical Consultation",
      date: "2024-12-20",
      time: "10:00 AM",
      location: "Downtown Medical Center",
      status: "confirmed",
      type: "upcoming",
      details: {
        duration: "45 minutes",
        price: "$150",
        notes: "Please bring your medical reports",
        contact: "+1 (555) 123-4567"
      }
    },
    {
      id: 2,
      providerName: "Studio Belle Salon",
      service: "Haircut & Styling",
      date: "2024-12-18",
      time: "2:30 PM",
      location: "Main Street Plaza",
      status: "confirmed",
      type: "upcoming",
      details: {
        duration: "1 hour",
        price: "$75",
        notes: "Hair wash and styling included",
        contact: "+1 (555) 987-6543"
      }
    },
    {
      id: 3,
      providerName: "Legal Solutions Firm",
      service: "Legal Consultation",
      date: "2024-12-15",
      time: "11:00 AM",
      location: "Business District",
      status: "completed",
      type: "past",
      details: {
        duration: "1 hour",
        price: "$200",
        notes: "Initial consultation completed",
        contact: "+1 (555) 456-7890"
      }
    },
    {
      id: 4,
      providerName: "Mindful Therapy Center",
      service: "Therapy Session",
      date: "2024-12-10",
      time: "3:00 PM",
      location: "Health Center",
      status: "completed",
      type: "past",
      details: {
        duration: "50 minutes",
        price: "$120",
        notes: "Follow-up session",
        contact: "+1 (555) 234-5678"
      }
    },
    {
      id: 5,
      providerName: "Dr. Mike Chen",
      service: "Dental Checkup",
      date: "2024-12-25",
      time: "9:00 AM",
      location: "Dental Care Center",
      status: "pending",
      type: "upcoming",
      details: {
        duration: "30 minutes",
        price: "$90",
        notes: "Regular dental checkup and cleaning",
        contact: "+1 (555) 345-6789"
      }
    },
    {
      id: 6,
      providerName: "Elite Salon",
      service: "Spa Treatment",
      date: "2024-12-05",
      time: "4:00 PM",
      location: "Mall Road",
      status: "cancelled",
      type: "past",
      details: {
        duration: "2 hours",
        price: "$180",
        notes: "Full body massage and facial",
        contact: "+1 (555) 876-5432"
      }
    }
  ];

  // Apply theme to entire website
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#f8f9fa";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#333333";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Helper function to ensure appointment has details
  const ensureAppointmentDetails = (appointment) => {
    return {
      ...appointment,
      details: appointment.details || {
        duration: "Not specified",
        price: "Not specified",
        notes: "No additional notes available for this appointment.",
        contact: "Contact information not available"
      }
    };
  };

  // Load user data and appointments - UPDATED TO SHOW CURRENT USER
  useEffect(() => {
    const loadUserData = () => {
      setIsLoading(true);
      
      // Get current logged-in user from localStorage
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        try {
          const parsed = JSON.parse(currentUser);
          setUserData({ 
            fullName: parsed.fullName || parsed.name || "User", 
            email: parsed.email || "No email",
            profilePhoto: parsed.profilePhoto || parsed.profilePic || null
          });
        } catch (error) {
          console.error("Error parsing currentUser:", error);
        }
      } else {
        // Fallback to userProfile if currentUser doesn't exist
        const userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
          try {
            const parsed = JSON.parse(userProfile);
            setUserData({ 
              fullName: parsed.fullName || "User", 
              email: parsed.email || "No email",
              profilePhoto: parsed.profilePhoto || parsed.profilePic || null
            });
          } catch (error) {
            console.error("Error parsing userProfile:", error);
          }
        }
      }

      // Load appointments from localStorage or use sample data
      const savedAppointments = localStorage.getItem("userAppointments");
      if (savedAppointments) {
        try {
          const parsedAppointments = JSON.parse(savedAppointments);
          // Ensure all appointments have details
          const appointmentsWithDetails = parsedAppointments.map(apt => 
            ensureAppointmentDetails(apt)
          );
          setAppointments(appointmentsWithDetails);
        } catch (error) {
          console.error("Error parsing appointments:", error);
          setAppointments(sampleAppointments);
        }
      } else {
        setAppointments(sampleAppointments);
        localStorage.setItem("userAppointments", JSON.stringify(sampleAppointments));
      }
      
      setIsLoading(false);

      // Check if logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        navigate("/login");
      }
    };

    loadUserData();
  }, [navigate]);

  const handleDeleteAccount = () => {
    const userEmail = userData.email;
    localStorage.removeItem("userProfile");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("theme");
    localStorage.removeItem("userAppointments");
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(user => user.email !== userEmail);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    navigate("/login");
  };

  const handleLogout = () => {
    // Only remove session data, keep profile data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleBackToAppointments = () => {
    navigate("/user-dashboard");
  };

  const handleAppointmentAction = (appointmentId, action) => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        if (action === 'cancel') {
          return { ...apt, status: 'cancelled' };
        } else if (action === 'confirm') {
          return { ...apt, status: 'confirmed' };
        }
      }
      return apt;
    });
    
    setAppointments(updatedAppointments);
    localStorage.setItem("userAppointments", JSON.stringify(updatedAppointments));
  };

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleForm({
      date: appointment.date,
      time: appointment.time
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = () => {
    if (!rescheduleForm.date || !rescheduleForm.time) {
      alert("Please select both date and time");
      return;
    }

    const updatedAppointments = appointments.map(apt => {
      if (apt.id === selectedAppointment.id) {
        return { 
          ...apt, 
          date: rescheduleForm.date,
          time: rescheduleForm.time,
          status: 'confirmed'
        };
      }
      return apt;
    });
    
    setAppointments(updatedAppointments);
    localStorage.setItem("userAppointments", JSON.stringify(updatedAppointments));
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    alert("Appointment rescheduled successfully!");
  };

  const handleViewDetails = (appointment) => {
    // Ensure the appointment has all required details
    const appointmentWithDetails = ensureAppointmentDetails(appointment);
    setSelectedAppointment(appointmentWithDetails);
    setShowDetailsModal(true);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (activeFilter === "upcoming") return apt.type === "upcoming";
    if (activeFilter === "past") return apt.type === "past";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#2d866a';
      case 'pending': return '#f39c12';
      case 'cancelled': return '#e74c3c';
      case 'completed': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const tabs = [
    { label: "Appointments", path: "/user-dashboard2" },
  ];

  // Theme colors
  const colors =
    theme === "dark"
      ? {
          containerBg: "#121212",
          cardBg: "#1e1e1e",
          text: "#ffffff",
          textSecondary: "#ccc",
          border: "#333",
          accent: "#2d866a",
          danger: "#e74c3c",
          dangerHover: "#c0392b",
        }
      : {
          containerBg: "#f8f9fa",
          cardBg: "#ffffff",
          text: "#333",
          textSecondary: "#666",
          border: "#ddd",
          accent: "#2d866a",
          danger: "#e74c3c",
          dangerHover: "#c0392b",
        };

  const styles = {
    container: { 
      fontFamily: "Arial, sans-serif", 
      padding: "20px", 
      backgroundColor: colors.containerBg, 
      minHeight: "100vh", 
      transition: "0.3s", 
      color: colors.text 
    },
    backButton: {
      padding: "10px 20px",
      background: colors.accent,
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "20px",
      textDecoration: "none",
      display: "inline-block",
      transition: "background-color 0.2s"
    },
    navTabs: { 
      display: "flex", 
      borderBottom: `1px solid ${colors.border}`, 
      marginBottom: "30px", 
      backgroundColor: colors.cardBg, 
      padding: "0 20px", 
      borderRadius: "8px", 
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
      alignItems: "center" 
    },
    tabButton: { 
      textDecoration: "none", 
      background: "none", 
      border: "none", 
      padding: "15px 25px", 
      cursor: "pointer", 
      fontWeight: 500, 
      color: colors.textSecondary, 
      transition: "0.2s", 
      fontSize: "16px" 
    },
    activeTab: { 
      borderBottom: `3px solid ${colors.accent}`, 
      fontWeight: 600, 
      color: colors.accent 
    },
    logoutButton: { 
      marginLeft: "auto", 
      padding: "8px 16px", 
      border: `1px solid ${colors.danger}`, 
      borderRadius: "5px", 
      background: "transparent", 
      color: colors.danger, 
      cursor: "pointer", 
      fontSize: "14px", 
      fontWeight: "500", 
      transition: "0.2s" 
    },
    dashboardContent: { 
      display: "flex", 
      flexWrap: "wrap", 
      gap: "30px", 
      maxWidth: "1200px", 
      margin: "0 auto" 
    },
    sidebar: { 
      flex: "0 0 300px", 
      minWidth: "250px", 
      background: colors.cardBg, 
      borderRadius: "15px", 
      padding: "25px", 
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
      height: "fit-content" 
    },
    mainContent: { 
      flex: "1", 
      minWidth: "300px", 
      background: colors.cardBg, 
      borderRadius: "15px", 
      padding: "25px", 
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
      overflowX: "auto" 
    },
    userProfile: { 
      display: "flex", 
      alignItems: "center", 
      marginBottom: "30px", 
      paddingBottom: "20px", 
      borderBottom: `1px solid ${colors.border}` 
    },
    userAvatar: { 
      width: "80px", 
      height: "80px", 
      backgroundColor: colors.accent, 
      borderRadius: "50%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      color: "white", 
      fontSize: "28px", 
      fontWeight: "bold", 
      marginRight: "20px", 
      overflow: "hidden", 
      position: "relative" 
    },
    profilePhoto: { 
      width: "100%", 
      height: "100%", 
      objectFit: "cover", 
      borderRadius: "50%" 
    },
    userName: { 
      fontSize: "22px", 
      fontWeight: "600", 
      marginBottom: "5px", 
      color: colors.text 
    },
    userEmail: { 
      fontSize: "14px", 
      color: colors.textSecondary 
    },
    sectionTitle: { 
      fontSize: "18px", 
      fontWeight: "600", 
      marginBottom: "15px", 
      color: colors.accent, 
      paddingBottom: "10px", 
      borderBottom: `2px solid ${colors.border}` 
    },
    appointmentsTitle: { 
      fontSize: "24px", 
      fontWeight: "600", 
      color: colors.accent,
      marginBottom: "20px"
    },
    filterContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "25px",
      flexWrap: "wrap"
    },
    filterButton: { 
      padding: "8px 16px", 
      border: `1px solid ${colors.border}`, 
      borderRadius: "5px", 
      background: colors.cardBg, 
      color: colors.textSecondary, 
      cursor: "pointer", 
      fontSize: "14px", 
      transition: "all 0.2s" 
    },
    filterButtonActive: { 
      background: colors.accent, 
      color: "#fff", 
      borderColor: colors.accent 
    },
    appointmentCard: { 
      border: `1px solid ${colors.border}`, 
      borderRadius: "12px", 
      padding: "20px", 
      marginBottom: "20px", 
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)", 
      backgroundColor: colors.cardBg 
    },
    appointmentHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "15px"
    },
    statusBadge: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500"
    },
    appointmentDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
      marginBottom: "15px"
    },
    detailItem: {
      display: "flex",
      flexDirection: "column"
    },
    detailLabel: {
      fontSize: "12px",
      color: colors.textSecondary,
      marginBottom: "4px"
    },
    detailValue: {
      fontSize: "14px",
      fontWeight: 500,
      color: colors.text
    },
    actionButtons: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      flexWrap: "wrap"
    },
    actionButton: { 
      padding: "8px 16px", 
      border: `1px solid ${colors.border}`, 
      borderRadius: "5px", 
      background: colors.cardBg, 
      color: colors.text, 
      cursor: "pointer", 
      fontSize: "14px", 
      transition: "0.2s"
    },
    primaryButton: { 
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      background: colors.accent,
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "0.2s"
    },
    dangerButton: { 
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      background: colors.danger,
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "0.2s"
    },
    cancelButton: { 
      padding: "10px 20px",
      border: `1px solid ${colors.border}`,
      borderRadius: "5px",
      background: "transparent",
      color: colors.text,
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "0.2s"
    },
    input: { 
      width: "100%", 
      padding: "10px", 
      borderRadius: "5px", 
      border: `1px solid ${colors.border}`, 
      backgroundColor: colors.cardBg, 
      color: colors.text, 
      marginBottom: "15px", 
      fontSize: "14px" 
    },
    label: { 
      display: "block", 
      marginBottom: "5px", 
      fontWeight: "500", 
      color: colors.text 
    },
    noAppointments: {
      textAlign: "center",
      padding: "40px",
      color: colors.textSecondary,
      fontSize: "16px"
    },
    modalOverlay: { 
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: "rgba(0,0,0,0.5)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      zIndex: 1000 
    },
    modalContent: { 
      background: colors.cardBg, 
      padding: "30px", 
      borderRadius: "15px", 
      maxWidth: "500px", 
      width: "90%", 
      maxHeight: "80vh",
      overflowY: "auto",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)" 
    },
    modalTitle: { 
      fontSize: "20px", 
      fontWeight: "600", 
      marginBottom: "15px", 
      color: colors.text 
    },
    modalText: { 
      marginBottom: "20px", 
      color: colors.textSecondary, 
      lineHeight: "1.5" 
    },
    modalActions: { 
      display: "flex", 
      justifyContent: "flex-end", 
      gap: "10px" 
    },
    loadingText: { 
      color: colors.textSecondary, 
      fontStyle: "italic" 
    },
    detailSection: {
      marginBottom: "20px"
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      padding: "8px 0",
      borderBottom: `1px solid ${colors.border}`
    },
    detailLabelModal: {
      fontWeight: "600",
      color: colors.text,
      minWidth: "120px"
    },
    detailValueModal: {
      color: colors.textSecondary,
      textAlign: "right",
      flex: 1
    },
    notesSection: {
      backgroundColor: theme === "dark" ? "#2a2a2a" : "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginTop: "10px"
    }
  };

  return (
    <div style={styles.container}>
      {/* Back to Appointments Button */}
      <button 
        onClick={handleBackToAppointments}
        style={styles.backButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = theme === "dark" ? "#256c54" : "#236c53"}
        onMouseLeave={(e) => e.target.style.backgroundColor = colors.accent}
      >
        ← Back to Appointments
      </button>

      {/* Navigation Tabs */}
      <nav style={styles.navTabs}>
        {tabs.map((tab, idx) => (
          <Link key={idx} to={tab.path} style={{ ...styles.tabButton, ...(location.pathname === tab.path ? styles.activeTab : {}) }}>
            {tab.label}
          </Link>
        ))}
        <button 
          onClick={handleLogout}
          style={styles.logoutButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.danger;
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = colors.danger;
          }}
        >
          Logout
        </button>
      </nav>

      <div style={styles.dashboardContent}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.userProfile}>
            <div style={styles.userAvatar}>
              {isLoading ? (
                <span style={styles.loadingText}>...</span>
              ) : userData.profilePhoto ? (
                <img 
                  src={userData.profilePhoto} 
                  alt="Profile" 
                  style={styles.profilePhoto} 
                />
              ) : (
                <span>
                  {userData.fullName && userData.fullName !== "Loading..." 
                    ? userData.fullName[0].toUpperCase() 
                    : 'U'
                  }
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {isLoading ? (
                <>
                  <div style={styles.userName}>Loading...</div>
                  <div style={styles.userEmail}>Loading...</div>
                </>
              ) : (
                <>
                  <div style={styles.userName}>{userData.fullName}</div>
                  <div style={styles.userEmail}>{userData.email}</div>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3 style={styles.sectionTitle}>Menu</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li 
                style={{ 
                  padding: "12px 0", 
                  borderBottom: `1px solid ${colors.border}`, 
                  cursor: "pointer",
                  color: location.pathname === "/user-profile" ? colors.accent : colors.text 
                }} 
                onClick={() => navigate("/user-profile")}
              >
                Profile
              </li>
              <li 
                style={{ 
                  padding: "12px 0", 
                  borderBottom: `1px solid ${colors.border}`, 
                  cursor: "pointer",
                  color: location.pathname === "/user-dashboard2/settings" ? colors.accent : colors.text 
                }} 
                onClick={() => navigate("/user-dashboard2/settings")}
              >
                Settings
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3 style={styles.sectionTitle}>Appointments</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li 
                style={{ 
                  padding: "12px 0", 
                  borderBottom: `1px solid ${colors.border}`, 
                  cursor: "pointer",
                  color: activeFilter === "upcoming" && location.pathname === "/user-dashboard2" ? colors.accent : colors.text 
                }} 
                onClick={() => {
                  navigate("/user-dashboard2");
                  setActiveFilter("upcoming");
                }}
              >
                Upcoming
              </li>
              <li 
                style={{ 
                  padding: "12px 0", 
                  borderBottom: `1px solid ${colors.border}`, 
                  cursor: "pointer",
                  color: activeFilter === "past" && location.pathname === "/user-dashboard2" ? colors.accent : colors.text 
                }} 
                onClick={() => {
                  navigate("/user-dashboard2");
                  setActiveFilter("past");
                }}
              >
                Past
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content - Appointments */}
        {location.pathname === "/user-dashboard2" && (
          <main style={styles.mainContent}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
              <h2 style={styles.appointmentsTitle}>
                {isLoading ? "Loading..." : `Welcome, ${userData.fullName.split(' ')[0]}!`}
              </h2>
              <div style={styles.filterContainer}>
                <button 
                  style={{ ...styles.filterButton, ...(activeFilter === "upcoming" ? styles.filterButtonActive : {}) }}
                  onClick={() => setActiveFilter("upcoming")}
                >
                  Upcoming
                </button>
                <button 
                  style={{ ...styles.filterButton, ...(activeFilter === "past" ? styles.filterButtonActive : {}) }}
                  onClick={() => setActiveFilter("past")}
                >
                  Past
                </button>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <div style={styles.noAppointments}>
                No {activeFilter} appointments found.
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} style={styles.appointmentCard}>
                  <div style={styles.appointmentHeader}>
                    <div>
                      <h3 style={{ margin: 0, color: colors.text }}>{appointment.providerName}</h3>
                      <div style={{ color: colors.accent, fontWeight: 500 }}>{appointment.service}</div>
                    </div>
                    <div style={{ 
                      ...styles.statusBadge, 
                      backgroundColor: `${getStatusColor(appointment.status)}20`,
                      color: getStatusColor(appointment.status)
                    }}>
                      {getStatusText(appointment.status)}
                    </div>
                  </div>
                  
                  <div style={styles.appointmentDetails}>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Date</span>
                      <span style={styles.detailValue}>{appointment.date}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Time</span>
                      <span style={styles.detailValue}>{appointment.time}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <span style={styles.detailLabel}>Location</span>
                      <span style={styles.detailValue}>{appointment.location}</span>
                    </div>
                  </div>
                  
                  <div style={styles.actionButtons}>
                    {appointment.type === "upcoming" && appointment.status === "pending" && (
                      <>
                        <button 
                          style={styles.primaryButton}
                          onClick={() => handleAppointmentAction(appointment.id, 'confirm')}
                        >
                          Confirm
                        </button>
                        <button 
                          style={styles.dangerButton}
                          onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {appointment.type === "upcoming" && appointment.status === "confirmed" && (
                      <>
                        <button 
                          style={{ ...styles.actionButton, borderColor: colors.accent, color: colors.accent }}
                          onClick={() => handleRescheduleClick(appointment)}
                        >
                          Reschedule
                        </button>
                        <button 
                          style={{ ...styles.actionButton, borderColor: colors.danger, color: colors.danger }}
                          onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.type === "past" && (
                      <button 
                        style={styles.actionButton}
                        onClick={() => handleViewDetails(appointment)}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>
        )}

        {/* Settings */}
        {location.pathname === "/user-dashboard2/settings" && (
          <main style={styles.mainContent}>
            <h2 style={styles.appointmentsTitle}>Settings</h2>

            {/* Theme Settings */}
            <section style={{ marginBottom: "30px" }}>
              <h3 style={styles.sectionTitle}>Language & Display</h3>
              <div style={{ marginBottom: "20px" }}>
                <label style={styles.label}>Theme:</label>
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)} 
                  style={styles.input}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label style={styles.label}>Language:</label>
                <select style={styles.input}>
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Hindi</option>
                </select>
              </div>
            </section>

            {/* Account Settings */}
            <section>
              <h3 style={styles.sectionTitle}>Account</h3>
              <button 
                style={styles.dangerButton}
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
              >
                Delete Account
              </button>
              <p style={{ fontSize: "14px", color: colors.textSecondary, marginTop: "10px" }}>
                Permanently delete your account and all associated data.
              </p>
            </section>
          </main>
        )}
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Delete Account</h3>
            <p style={styles.modalText}>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
            </p>
            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.dangerButton}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Reschedule Appointment</h3>
            <p style={styles.modalText}>
              Reschedule your appointment with {selectedAppointment.providerName}
            </p>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={styles.label}>New Date:</label>
              <input
                type="date"
                value={rescheduleForm.date}
                onChange={(e) => setRescheduleForm(prev => ({ ...prev, date: e.target.value }))}
                style={styles.input}
                min={new Date().toISOString().split('T')[0]}
              />
              
              <label style={styles.label}>New Time:</label>
              <input
                type="time"
                value={rescheduleForm.time}
                onChange={(e) => setRescheduleForm(prev => ({ ...prev, time: e.target.value }))}
                style={styles.input}
              />
            </div>

            <div style={styles.modalActions}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowRescheduleModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.primaryButton}
                onClick={handleRescheduleSubmit}
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Appointment Details</h3>
            
            <div style={styles.detailSection}>
              <h4 style={{ color: colors.accent, marginBottom: "15px" }}>Basic Information</h4>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Provider:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.providerName}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Service:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.service}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Date:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.date}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Time:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.time}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Location:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.location}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Status:</span>
                <span style={{ 
                  ...styles.detailValueModal, 
                  color: getStatusColor(selectedAppointment.status),
                  fontWeight: "600"
                }}>
                  {getStatusText(selectedAppointment.status)}
                </span>
              </div>
            </div>

            <div style={styles.detailSection}>
              <h4 style={{ color: colors.accent, marginBottom: "15px" }}>Service Details</h4>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Duration:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.details.duration}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Price:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.details.price}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabelModal}>Contact:</span>
                <span style={styles.detailValueModal}>{selectedAppointment.details.contact}</span>
              </div>
            </div>

            <div style={styles.detailSection}>
              <h4 style={{ color: colors.accent, marginBottom: "15px" }}>Additional Information</h4>
              <div style={styles.notesSection}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabelModal}>Notes:</span>
                </div>
                <p style={{ 
                  ...styles.detailValueModal, 
                  marginTop: "5px", 
                  fontStyle: "italic",
                  textAlign: "left"
                }}>
                  {selectedAppointment.details.notes}
                </p>
              </div>
            </div>

            <div style={styles.modalActions}>
              <button 
                style={styles.primaryButton}
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}