import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AvailabilityManagement() {
  const [schedule, setSchedule] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Time slots for the schedule
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const daysOfWeek = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' }
  ];

  // Load saved schedule
  useEffect(() => {
    const savedSchedule = JSON.parse(localStorage.getItem('providerSchedule') || '{}');
    setSchedule(savedSchedule);
  }, []);

  const toggleTimeSlot = (dayId, time) => {
    setSchedule(prev => {
      const daySchedule = prev[dayId] || {};
      const updatedDaySchedule = {
        ...daySchedule,
        [time]: !daySchedule[time]
      };
      
      return {
        ...prev,
        [dayId]: updatedDaySchedule
      };
    });
  };

  const toggleAllDay = (dayId, isAvailable) => {
    setSchedule(prev => {
      const newDaySchedule = {};
      timeSlots.forEach(time => {
        newDaySchedule[time] = isAvailable;
      });
      
      return {
        ...prev,
        [dayId]: newDaySchedule
      };
    });
  };

  const saveSchedule = () => {
    setIsSaving(true);
    localStorage.setItem('providerSchedule', JSON.stringify(schedule));
    
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ Schedule saved successfully!');
    }, 1000);
  };

  const resetSchedule = () => {
    setSchedule({});
    localStorage.removeItem('providerSchedule');
    alert('Schedule reset!');
  };

  // Styles with attractive design
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    mainContent: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    headerSection: {
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    },
    backButton: {
      textDecoration: "none",
      color: "#2d866a",
      fontWeight: "600",
      marginRight: "25px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      padding: "10px 16px",
      border: "2px solid #2d866a",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    },
    pageTitle: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#2d866a",
      margin: 0,
      background: "linear-gradient(135deg, #2d866a 0%, #34d399 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    pageSubtitle: {
      fontSize: "18px",
      color: "#666",
      marginTop: "8px",
      fontWeight: "500",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 3fr",
      gap: "30px",
      alignItems: "start",
    },
    summaryCard: {
      background: "linear-gradient(135deg, #2d866a 0%, #34d399 100%)",
      borderRadius: "20px",
      padding: "30px",
      color: "white",
      boxShadow: "0 10px 25px rgba(45, 134, 106, 0.3)",
      height: "fit-content",
    },
    summaryTitle: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
    },
    summaryStats: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    statItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "10px",
    },
    statLabel: {
      fontSize: "14px",
      opacity: 0.9,
    },
    statValue: {
      fontSize: "18px",
      fontWeight: "600",
    },
    weeklySchedule: {
      background: "#fff",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    },
    scheduleHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      paddingBottom: "20px",
      borderBottom: "2px solid #f1f5f9",
    },
    scheduleTitle: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#2d866a",
      margin: 0,
    },
    scheduleControls: {
      display: "flex",
      gap: "12px",
    },
    controlButton: {
      padding: "10px 20px",
      border: "2px solid #2d866a",
      borderRadius: "8px",
      background: "transparent",
      color: "#2d866a",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    daysGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },
    daySection: {
      border: "2px solid #f1f5f9",
      borderRadius: "15px",
      padding: "25px",
      transition: "all 0.3s ease",
      backgroundColor: "#fafbfc",
    },
    daySectionHover: {
      borderColor: "#2d866a",
      boxShadow: "0 5px 15px rgba(45, 134, 106, 0.1)",
    },
    dayHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    dayLeft: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    dayCheckbox: {
      width: "20px",
      height: "20px",
      accentColor: "#2d866a",
      cursor: "pointer",
    },
    dayName: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1f2937",
    },
    dayControls: {
      display: "flex",
      gap: "10px",
    },
    dayControlBtn: {
      padding: "8px 16px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      background: "white",
      color: "#6b7280",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    dayControlBtnHover: {
      backgroundColor: "#2d866a",
      color: "white",
      borderColor: "#2d866a",
    },
    timeSlotsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "12px",
    },
    timeSlot: {
      padding: "15px 10px",
      border: "2px solid #e5e7eb",
      borderRadius: "10px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      backgroundColor: "white",
    },
    timeSlotAvailable: {
      backgroundColor: "#d1fae5",
      color: "#065f46",
      borderColor: "#10b981",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(16, 185, 129, 0.2)",
    },
    timeSlotUnavailable: {
      backgroundColor: "#fef2f2",
      color: "#991b1b",
      borderColor: "#ef4444",
    },
    saveSection: {
      marginTop: "40px",
      paddingTop: "30px",
      borderTop: "2px solid #f1f5f9",
      textAlign: "center",
    },
    saveButton: {
      padding: "16px 50px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #2d866a 0%, #34d399 100%)",
      color: "white",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "700",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(45, 134, 106, 0.3)",
    },
    saveButtonHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 25px rgba(45, 134, 106, 0.4)",
    },
    saveButtonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  };

  // Calculate summary statistics
  const calculateStats = () => {
    let totalSlots = 0;
    let availableSlots = 0;
    
    daysOfWeek.forEach(day => {
      timeSlots.forEach(time => {
        totalSlots++;
        if (schedule[day.id]?.[time]) {
          availableSlots++;
        }
      });
    });
    
    const availablePercentage = totalSlots > 0 ? Math.round((availableSlots / totalSlots) * 100) : 0;
    const workingDays = daysOfWeek.filter(day => 
      timeSlots.some(time => schedule[day.id]?.[time])
    ).length;
    
    return { totalSlots, availableSlots, availablePercentage, workingDays };
  };

  const stats = calculateStats();

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          {/* ✅ FIXED: Changed to correct provider dashboard path */}
          <Link 
            to="/dashboard/provider" 
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
            ← Back to Dashboard
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={styles.pageTitle}>Availability Management</h1>
            <p style={styles.pageSubtitle}>
              Set your weekly schedule and manage available time slots
            </p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div style={styles.contentGrid}>
          {/* Summary Card */}
          <aside style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Schedule Summary</h2>
            <div style={styles.summaryStats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Working Days</span>
                <span style={styles.statValue}>{stats.workingDays}/7</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Available Slots</span>
                <span style={styles.statValue}>{stats.availableSlots}</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Availability</span>
                <span style={styles.statValue}>{stats.availablePercentage}%</span>
              </div>
            </div>
          </aside>

          {/* Weekly Schedule */}
          <section style={styles.weeklySchedule}>
            <div style={styles.scheduleHeader}>
              <h2 style={styles.scheduleTitle}>Weekly Schedule</h2>
              <div style={styles.scheduleControls}>
                <button
                  style={styles.controlButton}
                  onClick={resetSchedule}
                  onMouseEnter={(e) => Object.assign(e.target.style, styles.dayControlBtnHover)}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#2d866a";
                    e.target.style.borderColor = "#2d866a";
                  }}
                >
                  Reset All
                </button>
              </div>
            </div>

            <div style={styles.daysGrid}>
              {daysOfWeek.map((day) => {
                const daySchedule = schedule[day.id] || {};
                const isDayActive = timeSlots.some(time => daySchedule[time]);
                
                return (
                  <div 
                    key={day.id} 
                    style={{
                      ...styles.daySection,
                      ...(isDayActive ? styles.daySectionHover : {})
                    }}
                  >
                    <div style={styles.dayHeader}>
                      <div style={styles.dayLeft}>
                        <input 
                          type="checkbox" 
                          style={styles.dayCheckbox} 
                          checked={isDayActive}
                          onChange={(e) => toggleAllDay(day.id, e.target.checked)}
                        />
                        <span style={styles.dayName}>{day.name}</span>
                      </div>
                      
                      <div style={styles.dayControls}>
                        <button
                          style={styles.dayControlBtn}
                          onClick={() => toggleAllDay(day.id, true)}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.dayControlBtnHover)}
                          onMouseLeave={(e) => {
                            e.target.style.background = "white";
                            e.target.style.color = "#6b7280";
                            e.target.style.borderColor = "#d1d5db";
                          }}
                        >
                          All Day
                        </button>
                        <button
                          style={styles.dayControlBtn}
                          onClick={() => toggleAllDay(day.id, false)}
                          onMouseEnter={(e) => Object.assign(e.target.style, styles.dayControlBtnHover)}
                          onMouseLeave={(e) => {
                            e.target.style.background = "white";
                            e.target.style.color = "#6b7280";
                            e.target.style.borderColor = "#d1d5db";
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div style={styles.timeSlotsGrid}>
                      {timeSlots.map((time) => {
                        const isAvailable = daySchedule[time] || false;
                        return (
                          <div
                            key={time}
                            style={{
                              ...styles.timeSlot,
                              ...(isAvailable ? styles.timeSlotAvailable : styles.timeSlotUnavailable)
                            }}
                            onClick={() => toggleTimeSlot(day.id, time)}
                            onMouseEnter={(e) => {
                              if (!isAvailable) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isAvailable) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                              }
                            }}
                          >
                            {time}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Button */}
            <div style={styles.saveSection}>
              <button
                style={{
                  ...styles.saveButton,
                  ...(isSaving ? styles.saveButtonDisabled : {})
                }}
                onClick={saveSchedule}
                disabled={isSaving}
                onMouseEnter={(e) => !isSaving && Object.assign(e.target.style, styles.saveButtonHover)}
                onMouseLeave={(e) => !isSaving && (e.target.style.transform = "translateY(0)")}
              >
                {isSaving ? "⏳ Saving..." : "💾 Save Changes"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}