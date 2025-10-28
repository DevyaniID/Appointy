import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mob: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate form
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(formData.email)) {
        tempErrors.email = "Email is not valid";
        isValid = false;
      }
    }

    if (!formData.mob.trim()) {
      tempErrors.mob = "Mobile number is required";
      isValid = false;
    } else {
      const mobPattern = /^[0-9]{10}$/; // 10-digit number
      if (!mobPattern.test(formData.mob)) {
        tempErrors.mob = "Enter a valid 10-digit mobile number";
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      console.log(formData);
      // Clear form
      setFormData({ name: "", email: "", mob: "", message: "" });
      setErrors({});
    }
  };

  // Handle form clear
  const handleClear = () => {
    setFormData({ name: "", email: "", mob: "", message: "" });
    setErrors({});
  };

  return (
    <div className="container my-3">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="imgs/Contactus.jpg"
            className="img-fluid img-thumbnail shadow"
            alt="Contact"
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-muted">Contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Enter Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name here"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email here"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mob" className="form-label">
                Enter Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mob"
                placeholder="Enter valid mobile number"
                value={formData.mob}
                onChange={handleChange}
              />
              {errors.mob && (
                <small className="text-danger">{errors.mob}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Enter Message
              </label>
              <textarea
                id="message"
                className="form-control"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && (
                <small className="text-danger">{errors.message}</small>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Send message
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleClear}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
