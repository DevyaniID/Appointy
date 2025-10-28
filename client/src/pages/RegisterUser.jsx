import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (users.find(u => u.email === formData.email)) {
      setError("User already exists with this email");
      return;
    }
    
    // Create new user with complete data
    const newUser = {
      id: Date.now().toString(), // Unique ID
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      profilePhoto: null,
      createdAt: new Date().toISOString(),
      // Additional fields that might be useful
      phone: '',
      address: '',
      dateOfBirth: ''
    };
    
    // Add to users list
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Store as current profile and current user
    localStorage.setItem("userProfile", JSON.stringify(newUser));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");
    
    // Redirect directly to dashboard after registration
    navigate("/user-dashboard2");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name:</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Enter your full name"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Create a password"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#2d866a', color: 'white', border: 'none', borderRadius: '5px', width: '100%' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <a href="/login" style={{ color: '#2d866a' }}>Login here</a>
      </p>
    </div>
  );
}