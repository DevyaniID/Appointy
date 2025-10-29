import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

// import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

//   const navigate = useNavigate();

  // Fetch all services for service cards
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://appointy-1.onrender.com/api/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  // Fetch providers based on selected service and search
  useEffect(() => {
    const fetchProviders = async () => {
      if (!selectedService) return;
      try {
        const res = await axios.get(
          `https://appointy-1.onrender.com/api/providers?service=${selectedService}&search=${search}`
        );
        setProviders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProviders();
  }, [selectedService, search]);

  if (selectedProvider) {
    // Show booking form
    return <BookingForm provider={selectedProvider} onBack={() => setSelectedProvider(null)} />;
  }

  return (
    <div className="container mt-4">
      <h2>Book New Appointment</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search providers by name or location"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Services Cards */}
      <div className="d-flex mb-4 gap-3 flex-wrap">
        {services.map((s) => (
          <div
            key={s.id}
            className={`card p-3 text-center ${selectedService === s.name ? "border-primary" : ""}`}
            style={{ cursor: "pointer", width: "150px" }}
            onClick={() => setSelectedService(s.name)}
          >
            <h5>{s.name}</h5>
          </div>
        ))}
      </div>

      {/* Providers List */}
      <div>
        {providers.length > 0 ? (
          providers.map((p) => (
            <div
              key={p.id}
              className="card mb-3 p-3"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProvider(p)}
            >
              <h5>{p.name}</h5>
              <p>{p.designation} - {p.location}</p>
            </div>
          ))
        ) : (
          <p>No providers found for selected service/location.</p>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
