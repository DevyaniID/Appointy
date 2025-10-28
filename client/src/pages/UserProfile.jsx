import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, MapPin, Lock } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current logged-in user from localStorage
    const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    if (!userData || !userData.email) {
      navigate('/login');
      return;
    }
    
    setCurrentUser(userData);
    
    // Calculate age if date of birth exists
    if (userData.dob) {
      const birthDate = new Date(userData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }, [navigate]);

  // Default data structure
  const getDefaultData = () => {
    if (currentUser) {
      return {
        fullName: currentUser.fullName || currentUser.name || "User",
        email: currentUser.email || "",
        phone: currentUser.phone || "+91 9876543210",
        address: currentUser.address || "Dapoli, India",
        dob: currentUser.dob || "2004-10-21",
        gender: currentUser.gender || "Female",
        profilePic: currentUser.profilePic || null,
      };
    }
    return {
      fullName: "User",
      email: "",
      phone: "+91 9876543210",
      address: "Dapoli, India",
      dob: "2004-10-21",
      gender: "Female",
      profilePic: null,
    };
  };

  const [userData, setUserData] = useState(getDefaultData());

  // Update user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setUserData(getDefaultData());
    }
  }, [currentUser]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to current user data
      setUserData(getDefaultData());
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Saving data:", userData);
    
    // Update current user data
    const updatedUser = {
      ...currentUser,
      ...userData,
      profilePhoto: userData.profilePic
    };
    
    // Save to localStorage as currentUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Also save to userProfile for compatibility
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    
    // Update state and exit editing mode
    setCurrentUser(updatedUser);
    setUserData(getDefaultData());
    setIsEditing(false);
    setNewPassword("");
    setConfirmPassword("");
    
    alert("Profile saved successfully!");
  };

  const handleChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prevData => ({
          ...prevData,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match or are too short.");
    }
  };

  const styles = {
    container: { padding: "2rem", fontFamily: "Poppins, sans-serif", maxWidth: "800px", margin: "auto" },
    header: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", cursor: "pointer" },
    profileSection: { background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" },
    profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "3px solid #2d866a" },
    uploadInput: { marginTop: "0.5rem", fontSize: "0.9rem", width: "100%" },
    info: { flex: 1 },
    infoName: { fontSize: "20px", fontWeight: "600", margin: 0, color: "#2d866a" },
    infoText: { color: "#555", margin: "4px 0" },
    card: { background: "#fff", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
    tabs: { display: "flex", justifyContent: "space-around", borderBottom: "1px solid #ddd", marginBottom: "1.5rem" },
    tabButton: (isActive) => ({ 
      background: "none", 
      border: "none", 
      padding: "1rem", 
      cursor: "pointer", 
      fontWeight: 600, 
      color: isActive ? "#2d866a" : "#555", 
      borderBottom: isActive ? "3px solid #2d866a" : "none", 
      transition: "color 0.3s, border-bottom 0.3s" 
    }),
    label: { display: "block", marginTop: "1rem", fontWeight: 600, color: "#333" },
    input: { 
      width: "100%", 
      padding: "0.7rem", 
      marginTop: "0.4rem", 
      border: "1px solid #ccc", 
      borderRadius: "5px", 
      fontSize: "14px",
      boxSizing: "border-box"
    },
    textarea: { 
      width: "100%", 
      padding: "0.7rem", 
      marginTop: "0.4rem", 
      border: "1px solid #ccc", 
      borderRadius: "5px", 
      minHeight: "80px", 
      fontSize: "14px",
      boxSizing: "border-box",
      resize: "vertical"
    },
    select: { 
      width: "100%", 
      padding: "0.7rem", 
      marginTop: "0.4rem", 
      border: "1px solid #ccc", 
      borderRadius: "5px", 
      fontSize: "14px", 
      backgroundColor: "white",
      boxSizing: "border-box"
    },
    actions: { marginTop: "2rem", textAlign: "right" },
    btn: { 
      padding: "0.7rem 1.5rem", 
      marginLeft: "0.5rem", 
      border: "none", 
      borderRadius: "5px", 
      fontWeight: 600, 
      cursor: "pointer", 
      color: "#fff", 
      fontSize: "14px",
      transition: "background-color 0.3s"
    },
    editBtn: { backgroundColor: "#2d866a" },
    saveBtn: { backgroundColor: "#007bff" },
    cancelBtn: { backgroundColor: "#dc3545" },
    actionBtn: { 
      backgroundColor: "#2d866a", 
      color: "white", 
      padding: "0.7rem 1.4rem", 
      marginTop: "1rem", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer", 
      fontSize: "14px" 
    },
    disabledInput: { 
      backgroundColor: "#f5f5f5", 
      color: "#666", 
      cursor: "not-allowed" 
    },
    loading: {
      textAlign: "center",
      padding: "2rem",
      color: "#666"
    }
  };

  const getInputStyle = (isDisabled = false) => {
    return isDisabled ? { ...styles.input, ...styles.disabledInput } : styles.input;
  };

  // Show loading if user data is not loaded yet
  if (!currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h3>Loading user profile...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={() => navigate("/user-dashboard2")}>
        <ArrowLeft size={24} color="#2d866a" />
        <h2 style={{ color: "#2d866a", margin: 0 }}>Back to Dashboard</h2>
      </div>

      <div style={styles.profileSection}>
        <div>
          <img 
            src={userData.profilePic || "https://via.placeholder.com/100x100.png?text=User"} 
            alt="Profile" 
            style={styles.profilePic} 
          />
          {isEditing && (
            <input 
              type="file" 
              accept="image/*" 
              style={styles.uploadInput} 
              onChange={handleImageUpload} 
            />
          )}
        </div>
        <div style={styles.info}>
          <h3 style={styles.infoName}>{userData.fullName}</h3>
          <p style={styles.infoText}>{userData.email}</p>
          <p style={styles.infoText}>{userData.phone}</p>
          <p style={styles.infoText}>{age ? `${age} years old` : ""}</p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.tabs}>
          <button style={styles.tabButton(activeTab === "personal")} onClick={() => setActiveTab("personal")}>
            <User size={18} /> Personal Info
          </button>
          <button style={styles.tabButton(activeTab === "contact")} onClick={() => setActiveTab("contact")}>
            <Phone size={18} /> Contact
          </button>
          <button style={styles.tabButton(activeTab === "address")} onClick={() => setActiveTab("address")}>
            <MapPin size={18} /> Address
          </button>
          <button style={styles.tabButton(activeTab === "security")} onClick={() => setActiveTab("security")}>
            <Lock size={18} /> Security
          </button>
        </div>

        <div>
          {activeTab === "personal" && (
            <>
              <label style={styles.label}>Full Name</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="text" 
                value={userData.fullName || ""} 
                readOnly={!isEditing}
                onChange={(e) => handleChange("fullName", e.target.value)} 
              />
              <label style={styles.label}>Date of Birth</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="date" 
                value={userData.dob || ""} 
                readOnly={!isEditing}
                onChange={(e) => handleChange("dob", e.target.value)} 
              />
              <label style={styles.label}>Gender</label>
              <select 
                style={{...styles.select, ...(!isEditing ? styles.disabledInput : {})}} 
                value={userData.gender || "Female"} 
                disabled={!isEditing}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}
          
          {activeTab === "contact" && (
            <>
              <label style={styles.label}>Email</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="email" 
                value={userData.email || ""} 
                readOnly={!isEditing}
                onChange={(e) => handleChange("email", e.target.value)} 
              />
              <label style={styles.label}>Phone</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="text" 
                value={userData.phone || ""} 
                readOnly={!isEditing}
                onChange={(e) => handleChange("phone", e.target.value)} 
              />
            </>
          )}
          
          {activeTab === "address" && (
            <>
              <label style={styles.label}>Address</label>
              <textarea 
                style={{...styles.textarea, ...(!isEditing ? styles.disabledInput : {})}} 
                value={userData.address || ""} 
                readOnly={!isEditing}
                onChange={(e) => handleChange("address", e.target.value)} 
              />
            </>
          )}
          
          {activeTab === "security" && (
            <>
              <label style={styles.label}>New Password</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="password" 
                value={newPassword} 
                readOnly={!isEditing}
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder={isEditing ? "Enter new password" : "Click Edit to change password"}
              />
              <label style={styles.label}>Confirm Password</label>
              <input 
                style={getInputStyle(!isEditing)} 
                type="password" 
                value={confirmPassword} 
                readOnly={!isEditing}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder={isEditing ? "Confirm new password" : "Click Edit to change password"}
              />
              {isEditing && (
                <button style={styles.actionBtn} onClick={handlePasswordChange}>
                  Change Password
                </button>
              )}
            </>
          )}
        </div>

        <div style={styles.actions}>
          {!isEditing ? (
            <button style={{ ...styles.btn, ...styles.editBtn }} onClick={handleEditToggle}>
              Edit Profile
            </button>
          ) : (
            <>
              <button style={{ ...styles.btn, ...styles.saveBtn }} onClick={handleSave}>
                Save Changes
              </button>
              <button style={{ ...styles.btn, ...styles.cancelBtn }} onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;