import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Login/Register.css";
import axiosInstance from "../../Axios"; // Import the preconfigured Axios instance

const SignUpPage = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    address: "",
    endname: "",
    contact: "",
    occupation: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Clear error for the current field when the user starts typing
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,20}$/i;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!nameRegex.test(values.username)) {
      errors.username = "This is not a valid username.";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email.";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be 6-20 characters long, with uppercase, lowercase, numbers, and special characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      setSuccessMessage(null); // Clear previous success message
      setApiErrorMessage(null); // Clear previous API error message
      setLoading(true); // Start loading state

      try {
        // Use the preconfigured axiosInstance for the API request
        const response = await fetch(
          `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          }
        );
        setSuccessMessage("You have successfully registered!");
        setLoading(false); // Stop loading
        console.log("Registration successful:", response.data);
      } catch (error) {
        setLoading(false); // Stop loading if there's an error
        console.error("Error during registration:", error);
        setSuccessMessage(null); // Clear success message if there's an error
        if (error.response) {
          setApiErrorMessage(
            error.response.data.message || "Something went wrong."
          );
        } else {
          setApiErrorMessage("Network error. Please try again.");
        }
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {successMessage && (
          <div className="message success">{successMessage}</div>
        )}
        {apiErrorMessage && (
          <div className="message error">{apiErrorMessage}</div>
        )}

        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">
              <span className="star">*</span>Username :
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.username}</p>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span className="star">*</span>Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.email}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="star">*</span>Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error-text">{formErrors.password}</p>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address (optional)"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endname">Lastname:</label>
            <input
              type="text"
              id="endname"
              name="endname"
              placeholder="Enter last name (optional)"
              value={formValues.endname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter your contact (optional)"
              value={formValues.contact}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              placeholder="Enter your occupation (optional)"
              value={formValues.occupation}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <br />
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
