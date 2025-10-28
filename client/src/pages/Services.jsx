import React from "react";

// All images stored in one object
const imgs = {
  doctor: "/imgs/dr.jpg",
  therapist: "/imgs/theraphy.jpeg",
  lawyer: "/imgs/lawyer.png",
  salon: "/imgs/salon.webp",
};

const services = [
  {
    title: "Doctor",
    description: "Book appointments with certified doctors quickly.",
    image: imgs.doctor,
  },
  {
    title: "Therapist",
    description: "Schedule sessions with experienced therapists.",
    image: imgs.therapist,
  },
  {
    title: "Lawyer",
    description: "Get legal consultation online with ease.",
    image: imgs.lawyer,
  },
  {
    title: "Salon",
    description: "Reserve your salon services in just a few clicks.",
    image: imgs.salon,
  },
];

export default function Service() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#1f2937",
          }}
        >
          Book Appointments Effortlessly
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Our all-in-one platform lets you book appointments with doctors,
          therapists, lawyers, and salons in just a few clicks.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "0.75rem",
                marginBottom: "1rem",
              }}
            />

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#1f2937",
              }}
            >
              {service.title}
            </h3>
            <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
              {service.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
