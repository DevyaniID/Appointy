import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login status + auto-update when localStorage changes
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLogin(); // check once when mounted
    window.addEventListener("storage", checkLogin); // listen for cross-tab changes
    window.addEventListener("loginStatusChanged", checkLogin); // 👈 custom event for same-tab updates

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("loginStatusChanged", checkLogin);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged")); // 👈 notify header to update
    navigate('/');
  };

  const styles = {
    mainHeader: {
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      height: '60px',
    },
    logoImage: {
      height: '100%',
      width: 'auto',
      maxWidth: '200px',
      objectFit: 'contain',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      margin: 0,
      padding: 0,
    },
    navLink: {
      textDecoration: 'none',
      color: '#555',
      fontWeight: '500',
      transition: 'color 0.3s ease',
      padding: '8px 0',
      whiteSpace: 'nowrap',
    },
    navLinkHover: { color: '#2d866a' },
    dropdown: { position: 'relative' },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      listStyle: 'none',
      padding: '0.5rem 0',
      minWidth: '150px',
      zIndex: 1001,
    },
    dropdownItem: {
      display: 'block',
      padding: '0.75rem 1rem',
      color: '#333',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    dropdownItemHover: { backgroundColor: '#f8f9fa', color: '#2d866a' },
    loginButton: {
      backgroundColor: '#187141ff',
      color: 'white',
      border: 'none',
      padding: '0.6rem 1.5rem',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.3s ease',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    },
    loginButtonHover: { backgroundColor: '#146b38' },
  };

  return (
    <header style={styles.mainHeader}>
      <nav style={styles.navbar}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <img
            src="/imgs/FullLogo.jpg"
            alt="BookMyAppointment Logo"
            style={styles.logoImage}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span style={{ display: 'none', fontSize: '24px', fontWeight: 'bold', color: '#2d866a' }}>
            VBApp
          </span>
        </Link>

        <ul style={styles.navLinks}>
          <li>
            <Link
              to="/"
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/services"
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
            >
              Services
            </Link>
          </li>

      

          <li>
            <Link
              to="/contact"
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
            >
              Contact
            </Link>
          </li>

          {/* ✅ Login / Logout Button */}
          <li>
            {isLoggedIn ? (
              <button
                style={styles.loginButton}
                onClick={handleLogoutClick}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
              >
                Logout
              </button>
            ) : (
              <button
                style={styles.loginButton}
                onClick={handleLoginClick}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginButton.backgroundColor}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
