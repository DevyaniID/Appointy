import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterProvider = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
    service_type: "",
    location: "",
    role: "Provider",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("https://appointy-1.onrender.com/api/register-provider", formData);
      if (res.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Register as Service Provider</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Designation + Name row */}
        <div className="row mb-3">
          <div className="col-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="designation"
              className="form-control"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Dr."
            />
          </div>
          <div className="col-9">
            <label className="form-label">
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">
            Email Address <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Service Type */}
        <div className="mb-3">
          <label className="form-label">
            Service Type <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="service_type"
            className="form-control"
            value={formData.service_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">
            Location <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="City or Area"
          />
        </div>

        {/* Hidden role */}
        {/* <input type="hidden" name="role" value="user" /> */}
        <div className="mb-3">
          <label className="form-label">
            Role <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="role"
            className="form-control"
            value={formData.role}
            readOnly // prevents editing
          />
          <small className="form-text text-muted">
            This registration is for service providers. If you want to register as a common user,{" "}
            <Link to="/register/user">Click Here</Link>
          </small>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterProvider;