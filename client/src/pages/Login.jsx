import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../config";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. प्रथम localStorage मध्ये research करा (regular users साठी)
      const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const localUser = localUsers.find(u => u.email === email);
      
      if (localUser) {
        // Local user found - check password
        if (localUser.password === password) {
          localStorage.setItem("currentUser", JSON.stringify(localUser));
          localStorage.setItem("isLoggedIn", "true");
          
          const existingProfile = localStorage.getItem("userProfile");
          if (!existingProfile) {
            localStorage.setItem("userProfile", JSON.stringify(localUser));
          }
          
          navigate("/user-dashboard");
          setLoading(false);
          return;
        }
      }

      // 2. Local मध्ये नसेल तर backend API call करा (providers साठी)
      console.log("🔍 Checking backend for user:", email);
      
      const response = await axios.post('${API_BASE_URL}/api/login', {
        email,
        password
      });

      if (response.data.success) {
        const user = response.data.user;
        
        // Save to localStorage for session management
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", user.role);
        
        console.log("✅ Backend login successful:", user);
        
        // Redirect based on role
        if (user.role === 'provider') {
          navigate("/dashboard/provider");
        } else {
          navigate("/user-dashboard");
        }
      }
      
    } catch (error) {
      console.error("❌ Login error:", error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        // Backend unavailable - check local storage only
        const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const localUser = localUsers.find(u => u.email === email);
        
        if (!localUser) {
          setError("User not found. Please check your email or register.");
        } else if (localUser.password !== password) {
          setError("Invalid password");
        } else {
          localStorage.setItem("currentUser", JSON.stringify(localUser));
          localStorage.setItem("isLoggedIn", "true");
          navigate("/user-dashboard");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Simple login for testing - remove this later
  const handleSimpleLogin = (e) => {
    e.preventDefault();
    
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email);
    
    if (!user) {
      setError("User not found in localStorage. Providers should use backend login.");
      return;
    }
    
    if (user.password !== password) {
      setError("Invalid password");
      return;
    }
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    navigate("/user-dashboard");
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '50px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#2d866a', 
        marginBottom: '30px' 
      }}>
        Login
      </h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '15px', 
          padding: '10px',
          backgroundColor: '#ffe6e6',
          border: '1px solid #ffcccc',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#333'
          }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter your email"
          />
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: '500',
            color: '#333'
          }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter your password"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '12px', 
            background: loading ? '#ccc' : '#2d866a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#256c54')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2d866a')}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Simple login button for testing */}
        <button 
          type="button"
          onClick={handleSimpleLogin}
          style={{ 
            width: '100%',
            padding: '10px', 
            background: '#f0f0f0', 
            color: '#666', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            fontSize: '14px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          Local Storage Login Only
        </button>
      </form>
      
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        color: '#666'
      }}>
        <p>
          Don't have an account?{' '}
          <Link 
            to="/register/user" 
            style={{ 
              color: '#2d866a', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Register as User
          </Link>
        </p>
        <p>
          <Link 
            to="/register/provider" 
            style={{ 
              color: '#2d866a', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Register as Provider
          </Link>
        </p>
      </div>

      {/* Debug info */}
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '5px',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>Note:</strong> 
        <br />• Regular Users: Login with localStorage
        <br />• Providers: Login with backend API  
        <br />• Make sure backend is running on port 5000
      </div>
    </div>
  );
}