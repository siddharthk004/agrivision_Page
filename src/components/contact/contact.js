import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const maxLength = 400;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "message" && value.length > maxLength) {
      setError(`Message cannot exceed ${maxLength} characters.`);
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.message.length > maxLength) {
      setError(`Message cannot exceed ${maxLength} characters.`);
    } else {
      // Handle form submission (e.g., send data to an API)
      console.log("Form Data Submitted:", formData);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contactInfo">
        <div className="showText">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Please fill out the form.</p>
        </div>
        <div className="feedbackForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={maxLength}
              placeholder="Enter your message (max 400 characters)"
              required
            ></textarea>
            <p>
              {formData.message.length}/{maxLength} characters
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="websites">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>
          Follow us on social media:
          <FacebookIcon className="social-icon" />
          <XIcon className="social-icon" />
          <InstagramIcon className="social-icon" />
        </p>
      </div>
    </div>
  );
};

export default Contact;
