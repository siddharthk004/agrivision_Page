import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/AgriVision (8).png";
import "../header/header.css";

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const headerRef = useRef();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/profile",
          {
            method: "POST", //
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.warn(" Token expired or invalid. Logging out...");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUser(null);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setShowProfileDropdown(false);
    };

    checkLoginStatus();
    window.addEventListener("loginStatusChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.closest(".profile-btn") === null
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setNoResults(false);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/search/${encodeURIComponent(
          query
        )}`,

        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        navigate("/search-results", { state: { results: data, query } });
      } else {
        setNoResults(true);
        navigate("/search-results", { state: { results: [], query } });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      navigate("/search-results", { state: { results: [], query } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.pageYOffset > 100) {
          headerRef.current.classList.add("fixed");
        } else {
          headerRef.current.classList.remove("fixed");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new Event("loginStatusChanged")); // 🔹 Ensures all components update
    navigate("/login");
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="header-search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search here for product..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <SearchIcon className="search-icon" onClick={handleSearch} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="header-tabs">
          {isLoggedIn ? (
            <div className="profile-wrapper">
              <Link to="/wishlist" className="header-link">
                <FavoriteIcon className="header-icon" />
                Wishlist
              </Link>
              <Link to="/cart" className="header-link">
                <ShoppingCartIcon className="header-icon" />
                Cart
              </Link>

              {/* Profile Button */}
              <div
                className="header-link profile-btn"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <AccountCircleIcon className="header-icon" />
                View Profile
              </div>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <Link to="/profile" state={{ user }}>
                    My Profile
                  </Link>
                  <Link to="#" onClick={handleLogout}>
                    <LogoutIcon className="header-icon" /> Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header-link">
              <LoginIcon className="header-icon" />
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
