import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  useEffect(() => {
    setShowProfileDropdown(false); // Ensure dropdown is closed after login
  }, []);

  const toggleDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("tok"); // Remove user data
    navigate("/AdminLogin");
  };

  return (
    <div>
      <div
        style={{ height: "65px" }}
        className="d-flex justify-content-end gap-2 text-dark py-3 border rounded-4 bg-white w-100 top-0"
      >
        <h4
          className="text-success fw-bold pl-20"
          style={{ fontFamily: "Poppins, sans-serif", color: "#28a745" }}
        >
          Empowering Farmers, Growing Futures 🌱🚜
        </h4>

        <img
          src="https://ih1.redbubble.net/image.2309256735.3062/st,small,507x507-pad,600x600,f8f8f8.u1.jpg"
          className="rounded-circle float-end"
          style={{ width: "40px", marginLeft: "30vh", height: "40px" }}
        />

        {/* Profile Icon with Dropdown */}
        <div
          className="position-relative"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
        >
          <div className="d-flex align-items-center cursor-pointer">
            <i className="fa-solid fa-circle-user fa-2x text-info"></i>
            <h6 className="ps-1 pt-2 pe-2">Admin</h6>
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <Link
                to="/AdminLogin"
                className="rounded-3 border border-danger text-danger px-3 py-1 transition"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
