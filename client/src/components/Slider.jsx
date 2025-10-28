import React from "react";
import { Link } from "react-router-dom";

const Slider = () => {
  // Inline styles
  const styles = {
    heroSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4rem 8rem",
      backgroundColor: "#2d866a",
      color: "white",
      minHeight: "500px",
    },
    heroContent: {
      maxWidth: "50%",
      flex: 1,
    },
    heroTitle: {
      fontSize: "3rem",
      marginBottom: "1rem",
      fontWeight: "bold",
      lineHeight: "1.2",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: "1.6",
      marginBottom: "2rem",
      opacity: "0.9",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem",
    },
    ctaButtonPrimary: {
      backgroundColor: "#fff",
      color: "#2d866a",
      padding: "0.75rem 2rem",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "600",
      textDecoration: "none",
    },
    ctaButtonSecondary: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "0.75rem 2rem",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "600",
      textDecoration: "none",
    },
    heroImage: {
      alignSelf: "flex-end",
      marginBottom: "-15px",
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
    },
    heroImg: {
      width: "300px",
      height: "auto",
      maxWidth: "100%",
    },
  };

  return (
    <div style={styles.heroSection}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Ready to start your meeting in one simple click.
        </h1>
        <p style={styles.heroSubtitle}>
          Book appointments effortlessly with our intuitive scheduling platform.
          Connect with service providers in just a few clicks.
        </p>

        {/* Replaced "Get Booking" button with the two Landing.jsx buttons */}
        <div style={styles.buttonContainer}>
          <Link to="/register/user" style={styles.ctaButtonPrimary}>
            Find Services
          </Link>
          <Link to="/register/provider" style={styles.ctaButtonSecondary}>
            Offer Services
          </Link>
        </div>
      </div>

      <div style={styles.heroImage}>
        <img
          src="/imgs/girl.png"
          alt="Happy customer pointing"
          style={styles.heroImg}
        />
      </div>
    </div>
  );
};

export default Slider;
