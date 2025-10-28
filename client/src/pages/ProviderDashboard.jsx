import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [providerInfo, setProviderInfo] = useState({
    name: "Loading...",
    title: "",
    photo: "👨‍⚕️",
  });

  const [bookings, setBookings] = useState([]);
  const [showAllRequests, setShowAllRequests] = useState(false);

  const [stats, setStats] = useState({
    todayAppointments: 0,
    pendingRequests: 0,
  });

  const [calendarDays, setCalendarDays] = useState([]);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load provider data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser && currentUser.name) {
      setProviderInfo({
        name: currentUser.name,
        title: currentUser.providerInfo?.designation || "Service Provider",
        photo: currentUser.photo || "👨‍⚕️",
      });
    }
    loadBookings();
  }, []);

  // Load bookings
  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem("providerBookings") || "[]");
    setBookings(storedBookings);
  };

  // Calculate stats
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = bookings.filter(
      (b) => b.status === "accepted" && b.date === today
    ).length;
    const pendingRequests = bookings.filter((b) => b.status === "pending").length;

    setStats({
      todayAppointments,
      pendingRequests,
    });

    // Calendar data
    const newCalendar = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      appointments: bookings.filter(
        (b) => b.status === "accepted" && b.date && parseInt(b.date.split("-")[2]) === i + 1
      ).length,
    }));
    setCalendarDays(newCalendar);
  }, [bookings]);

  // Handle booking actions
  const handleBookingAction = (id, action) => {
    const updatedBookings = bookings.map((b) =>
      b.id === id ? { ...b, status: action === "accept" ? "accepted" : "declined" } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("providerBookings", JSON.stringify(updatedBookings));

    if (action === "accept") {
      alert("✅ Booking Accepted!");
    } else {
      alert("❌ Booking Declined.");
    }
  };

  // Add test booking with different dates
  const addTestBooking = () => {
    const dates = [
      "2025-10-15", "2025-10-16", "2025-10-17", "2025-10-18", "2025-10-19",
      "2025-10-22", "2025-10-23", "2025-10-24", "2025-10-25", "2025-10-26"
    ];
    const times = ["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM", "04:45 PM"];
    
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    
    const newBooking = {
      id: Date.now(),
      clientName: `Client ${Math.floor(Math.random() * 1000)}`,
      serviceName: "Medical Consultation",
      date: randomDate,
      time: randomTime,
      email: `client${Math.floor(Math.random() * 1000)}@email.com`,
      phone: `555-${Math.floor(100 + Math.random() * 900)}`,
      notes: "This is a test appointment request with random date",
      status: "pending"
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("providerBookings", JSON.stringify(updatedBookings));
    alert(`Test booking added for ${randomDate} at ${randomTime}!`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const displayedBookings = showAllRequests ? pendingBookings : pendingBookings.slice(0, 3);

  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      fontFamily: "Arial, sans-serif",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 24px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    navTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#2d866a",
    },
    logoutBtn: {
      padding: "8px 16px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    content: {
      display: "flex",
      minHeight: "calc(100vh - 80px)",
    },
    sidebar: {
      width: "280px",
      backgroundColor: "#1f2937",
      color: "white",
      padding: "20px",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "30px",
      paddingBottom: "20px",
      borderBottom: "1px solid #374151",
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#374151",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    title: {
      fontSize: "12px",
      color: "#9ca3af",
    },
    menu: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    menuItem: {
      padding: "12px 16px",
      marginBottom: "8px",
      borderRadius: "6px",
      cursor: "pointer",
      color: "white",
      textDecoration: "none",
      display: "block",
      transition: "all 0.3s ease",
    },
    activeMenuItem: {
      backgroundColor: "#2d866a",
    },
    main: {
      flex: 1,
      padding: "24px",
      backgroundColor: "#f3f4f6",
      overflowY: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    pageTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#111827",
      margin: 0,
    },
    testBtn: {
      padding: "10px 16px",
      backgroundColor: "#8b5cf6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "20px",
      marginBottom: "24px",
    },
    statCard: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      border: "1px solid #e5e7eb",
    },
    statNumber: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#2d866a",
      marginBottom: "8px",
    },
    statLabel: {
      color: "#6b7280",
      fontSize: "14px",
      fontWeight: "500",
    },
    calendar: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "24px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
    },
    calendarTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    },
    calendarHeader: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "#374151",
      padding: "10px 0",
      borderBottom: "2px solid #f1f5f9",
    },
    calendarGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "8px",
    },
    calendarDay: {
      padding: "12px 8px",
      textAlign: "center",
      borderRadius: "8px",
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      minHeight: "60px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
    },
    dayNumber: {
      fontWeight: "bold",
      color: "#111827",
    },
    appointments: {
      fontSize: "10px",
      color: "#10b981",
      fontWeight: "600",
    },
    bookings: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
    },
    bookingsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderBottom: "2px solid #f1f5f9",
    },
    bookingsTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
      margin: 0,
    },
    showMoreBtn: {
      padding: "8px 16px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    bookingCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "16px",
      backgroundColor: "#f9fafb",
      transition: "all 0.3s ease",
    },
    bookingHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    clientInfo: {
      flex: 1,
    },
    clientName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
      margin: "0 0 4px 0",
    },
    service: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
    },
    status: {
      fontSize: "12px",
      color: "#e67e22",
      fontWeight: "500",
      padding: "4px 8px",
      backgroundColor: "#fef3c7",
      borderRadius: "4px",
    },
    bookingDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "12px",
      marginBottom: "12px",
    },
    detail: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
    },
    detailLabel: {
      fontWeight: "500",
      color: "#374151",
    },
    detailValue: {
      color: "#2d866a",
    },
    notes: {
      backgroundColor: "white",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "16px",
      fontSize: "14px",
      border: "1px solid #e5e7eb",
    },
    notesLabel: {
      fontWeight: "600",
      marginBottom: "4px",
      color: "#111827",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
    acceptBtn: {
      padding: "10px 20px",
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    declineBtn: {
      padding: "10px 20px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    noBookings: {
      textAlign: "center",
      color: "#6b7280",
      padding: "40px",
      fontSize: "16px",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navTitle}>Provider Portal</div>
        <button 
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#dc2626"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#ef4444"}
        >
          Logout
        </button>
      </nav>

      <div style={styles.content}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.profile}>
            <div style={styles.avatar}>{providerInfo.photo}</div>
            <div style={styles.profileInfo}>
              <div style={styles.name}>{providerInfo.name}</div>
              <div style={styles.title}>{providerInfo.title}</div>
            </div>
          </div>
          
          <ul style={styles.menu}>
            {/* ✅ FIXED: Changed to correct route */}
            <Link 
              to="/dashboard/provider" 
              style={{
                ...styles.menuItem,
                ...styles.activeMenuItem
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/availability-management" 
              style={styles.menuItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#374151"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Availability
            </Link>
            <Link 
              to="/provider-profile" 
              style={styles.menuItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#374151"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              Profile
            </Link>
          </ul>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Provider Dashboard</h1>
            <button 
              style={styles.testBtn}
              onClick={addTestBooking}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#7c3aed"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#8b5cf6"}
            >
              + Add Test Booking
            </button>
          </div>

          {/* Stats */}
          <div style={styles.stats}>
            <div 
              style={styles.statCard}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={styles.statNumber}>{stats.todayAppointments}</div>
              <div style={styles.statLabel}>Today's Appointments</div>
            </div>
            <div 
              style={styles.statCard}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              <div style={styles.statNumber}>{stats.pendingRequests}</div>
              <div style={styles.statLabel}>Pending Requests</div>
            </div>
          </div>

          {/* Calendar */}
          <section style={styles.calendar}>
            <h2 style={styles.calendarTitle}>
              Calendar - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <div style={styles.calendarHeader}>
              {weekDays.map(day => <div key={day}>{day}</div>)}
            </div>
            <div style={styles.calendarGrid}>
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  style={styles.calendarDay}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#f9fafb"}
                >
                  <div style={styles.dayNumber}>{day.day}</div>
                  {day.appointments > 0 && (
                    <div style={styles.appointments}>
                      {day.appointments} appointment{day.appointments > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Booking Requests */}
          <section style={styles.bookings}>
            <div style={styles.bookingsHeader}>
              <h2 style={styles.bookingsTitle}>
                Booking Requests ({pendingBookings.length})
              </h2>
              {pendingBookings.length > 3 && (
                <button 
                  style={styles.showMoreBtn}
                  onClick={() => setShowAllRequests(!showAllRequests)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
                >
                  {showAllRequests ? "Show Less" : `Show More (+${pendingBookings.length - 3})`}
                </button>
              )}
            </div>

            {pendingBookings.length === 0 ? (
              <div style={styles.noBookings}>
                No pending booking requests. When users book appointments, they will appear here.
              </div>
            ) : (
              displayedBookings.map(booking => (
                <div 
                  key={booking.id} 
                  style={styles.bookingCard}
                  onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                  <div style={styles.bookingHeader}>
                    <div style={styles.clientInfo}>
                      <h3 style={styles.clientName}>{booking.clientName}</h3>
                      <p style={styles.service}>{booking.serviceName}</p>
                    </div>
                    <div style={styles.status}>Pending</div>
                  </div>

                  <div style={styles.bookingDetails}>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Date:</span>
                      <span style={styles.detailValue}>{booking.date}</span>
                    </div>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Time:</span>
                      <span style={styles.detailValue}>{booking.time}</span>
                    </div>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Email:</span>
                      <span style={styles.detailValue}>{booking.email}</span>
                    </div>
                    <div style={styles.detail}>
                      <span style={styles.detailLabel}>Phone:</span>
                      <span style={styles.detailValue}>{booking.phone}</span>
                    </div>
                  </div>

                  <div style={styles.notes}>
                    <div style={styles.notesLabel}>Client Notes:</div>
                    <div>{booking.notes}</div>
                  </div>

                  <div style={styles.actions}>
                    <button 
                      style={styles.acceptBtn}
                      onClick={() => handleBookingAction(booking.id, "accept")}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#059669"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#10b981"}
                    >
                      ✅ Accept
                    </button>
                    <button 
                      style={styles.declineBtn}
                      onClick={() => handleBookingAction(booking.id, "decline")}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#dc2626"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#ef4444"}
                    >
                      ❌ Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
}