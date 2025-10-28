import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Clock,
  Edit,
  X,
  Save,
} from "lucide-react";

const ProviderProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("business");
  const [isEditing, setIsEditing] = useState(false);
  const [provider, setProvider] = useState({
    name: "",
    doctor: "",
    title: "",
    experience: "",
    age: "",
    rating: 4.7,
    reviews: 3,
    bio: "",
    contact: {
      phone: "",
      email: "",
      address: "",
    },
    workingHours: {
      Monday: "9:00 AM - 5:00 PM",
      Tuesday: "9:00 AM - 5:00 PM",
      Wednesday: "9:00 AM - 5:00 PM",
      Thursday: "9:00 AM - 5:00 PM",
      Friday: "9:00 AM - 4:00 PM",
      Saturday: "Closed",
      Sunday: "Closed",
    },
  });

  // Load provider data from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const savedProfile = JSON.parse(localStorage.getItem("providerProfile") || "{}");
    
    if (currentUser && currentUser.name) {
      const defaultProfile = {
        name: currentUser.providerInfo?.businessName || "Premium Healthcare Clinic",
        doctor: currentUser.name,
        title: currentUser.providerInfo?.designation || "Service Provider",
        experience: currentUser.providerInfo?.experience || "5 years",
        age: currentUser.providerInfo?.age || "35 years old",
        bio: currentUser.providerInfo?.bio || "Experienced healthcare professional dedicated to providing top-quality medical services.",
        contact: {
          phone: currentUser.phone || "+91 9876543210",
          email: currentUser.email || "provider@example.com",
          address: currentUser.providerInfo?.address || "123 Main Street, City, State",
        },
        rating: 4.7,
        reviews: 3,
        workingHours: {
          Monday: "9:00 AM - 5:00 PM",
          Tuesday: "9:00 AM - 5:00 PM",
          Wednesday: "9:00 AM - 5:00 PM",
          Thursday: "9:00 AM - 5:00 PM",
          Friday: "9:00 AM - 4:00 PM",
          Saturday: "Closed",
          Sunday: "Closed",
        }
      };

      // Merge saved profile with default data
      const mergedProfile = { ...defaultProfile, ...savedProfile };
      setProvider(mergedProfile);
    }
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard/provider");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("providerProfile", JSON.stringify(provider));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reload original data
    const savedProfile = JSON.parse(localStorage.getItem("providerProfile") || "{}");
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    if (Object.keys(savedProfile).length > 0) {
      setProvider(savedProfile);
    } else if (currentUser && currentUser.name) {
      const defaultProfile = {
        name: currentUser.providerInfo?.businessName || "Premium Healthcare Clinic",
        doctor: currentUser.name,
        title: currentUser.providerInfo?.designation || "Service Provider",
        experience: currentUser.providerInfo?.experience || "5 years",
        age: currentUser.providerInfo?.age || "35 years old",
        bio: currentUser.providerInfo?.bio || "Experienced healthcare professional dedicated to providing top-quality medical services.",
        contact: {
          phone: currentUser.phone || "+91 9876543210",
          email: currentUser.email || "provider@example.com",
          address: currentUser.providerInfo?.address || "123 Main Street, City, State",
        },
        rating: 4.7,
        reviews: 3,
        workingHours: {
          Monday: "9:00 AM - 5:00 PM",
          Tuesday: "9:00 AM - 5:00 PM",
          Wednesday: "9:00 AM - 5:00 PM",
          Thursday: "9:00 AM - 5:00 PM",
          Friday: "9:00 AM - 4:00 PM",
          Saturday: "Closed",
          Sunday: "Closed",
        }
      };
      setProvider(defaultProfile);
    }
    
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProvider(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setProvider(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleWorkingHoursChange = (day, value) => {
    setProvider(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: value
      }
    }));
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-yellow text-yellow" : "text-gray"
        }`}
      />
    ));

  return (
    <div className="provider-container">
      {/* Header */}
      <div className="provider-header">
        <button onClick={handleBackToDashboard} className="back-btn">
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        <h2 className="profile-title">Provider Profile</h2>
        <p className="subtitle">Manage your business information and services</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-icon">🏥</div>
          <div>
            <h3>{provider.name}</h3>
            <p>
              {provider.doctor} <span>• {provider.title}</span>
            </p>
            <p className="small">
              {provider.experience} experience • {provider.age}
            </p>
            <div className="rating">
              {renderStars(provider.rating)}{" "}
              <span className="rating-text">
                {provider.rating} ({provider.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["business", "contact", "workingHours", "personal"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
          >
            {tab === "workingHours" ? "Working Hours" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "business" && (
          <div className="section">
            <h4>Business Information</h4>
            <div className="form-group">
              <label>Business Name</label>
              <input 
                type="text" 
                value={provider.name} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                value={provider.doctor} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('doctor', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Service Category</label>
              <input 
                type="text" 
                value={provider.title} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Years of Experience</label>
              <input 
                type="text" 
                value={provider.experience} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input 
                type="text" 
                value={provider.age} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>About / Bio</label>
              <textarea 
                rows="4" 
                value={provider.bio} 
                readOnly={!isEditing}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="section">
            <h4>Contact Information</h4>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                value={provider.contact.phone} 
                readOnly={!isEditing}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={provider.contact.email} 
                readOnly={!isEditing}
                onChange={(e) => handleContactChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea 
                rows="3" 
                value={provider.contact.address} 
                readOnly={!isEditing}
                onChange={(e) => handleContactChange('address', e.target.value)}
                placeholder="Enter your complete address"
              />
            </div>
          </div>
        )}

        {activeTab === "workingHours" && (
          <div className="section">
            <h4>Working Hours</h4>
            {Object.entries(provider.workingHours).map(([day, hours]) => (
              <div key={day} className="form-group working-hour-row">
                <label><strong>{day}:</strong></label>
                <input 
                  type="text" 
                  value={hours} 
                  readOnly={!isEditing}
                  onChange={(e) => handleWorkingHoursChange(day, e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "personal" && (
          <div className="section">
            <h4>Quick Stats</h4>
            <p>
              Experience: <b>{provider.experience}</b>
            </p>
            <p>
              Rating: <b>{provider.rating}/5</b>
            </p>
            <p>
              Reviews: <b>{provider.reviews}</b>
            </p>
            <p>
              Next Available: <b>Tomorrow 10:00 AM</b>
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-row">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              <X size={16} /> Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={handleEditToggle}>
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="provider-footer">
        <p>© 2025 Appointly. Making appointment booking easier for everyone.</p>
      </footer>

      <style jsx>{`
        .provider-container {
          font-family: 'Inter', sans-serif;
          background: #f9fafb;
          min-height: 100vh;
          padding: 20px 40px;
          color: #1f2937;
        }

        .provider-header {
          text-align: left;
          margin-bottom: 20px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #2563eb;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 14px;
        }

        .profile-title {
          font-size: 22px;
          font-weight: 600;
          margin-top: 10px;
        }

        .subtitle {
          color: #6b7280;
          font-size: 15px;
        }

        .profile-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-icon {
          background: #e6f6f5;
          font-size: 30px;
          padding: 20px;
          border-radius: 50%;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 5px;
        }

        .text-yellow {
          color: #fbbf24;
        }
        .text-gray {
          color: #d1d5db;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 8px 16px;
          border: none;
          background: #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: #2563eb;
          color: white;
        }

        .tab-content {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .section h4 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #111827;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .working-hour-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .working-hour-row label {
          min-width: 100px;
          margin-bottom: 0;
        }

        .working-hour-row input {
          flex: 1;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #374151;
        }

        input, textarea {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        input:read-only, textarea:read-only {
          background-color: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .action-row {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          justify-content: center;
        }

        .edit-btn, .save-btn, .cancel-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: #2563eb;
          color: white;
        }

        .edit-btn:hover {
          background: #1d4ed8;
        }

        .save-btn {
          background: #10b981;
          color: white;
        }

        .save-btn:hover {
          background: #059669;
        }

        .cancel-btn {
          background: #ef4444;
          color: white;
        }

        .cancel-btn:hover {
          background: #dc2626;
        }

        .provider-footer {
          text-align: center;
          margin-top: 30px;
          color: #6b7280;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .provider-container {
            padding: 15px 20px;
          }
          
          .tabs {
            flex-direction: column;
          }
          
          .working-hour-row {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .working-hour-row label {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ProviderProfile;