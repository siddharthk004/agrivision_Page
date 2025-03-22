import React, { useEffect, useState } from "react";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    endname: "",
    address: "",
    contact: "",
    occupation: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const userData = await response.json();
        setUser(userData);
        setFormData({
          endname: userData.endname || "",
          address: userData.address || "",
          contact: userData.contact || "",
          occupation: userData.occupation || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => setEditing(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/editProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>
      {!editing ? (
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Lastname:</strong> {user.endname}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Contact:</strong> {user.contact}
          </p>
          <p>
            <strong>Occupation:</strong> {user.occupation}
          </p>
          <button className="edit-profile-btn" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label>Lastname:</label>
          <input
            type="text"
            name="endname"
            value={formData.endname}
            onChange={handleInputChange}
          />
          <br />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <br />

          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
          <br />

          <label>Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
          />
          <br />

          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
