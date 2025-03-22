import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";

function ManageLogo() {
  const [logo, setLogo] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [selectedFile, setSelectedFile] = useState(null);
  const id = 1; // Assuming the logo always has ID 1

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await Axios().get("/admin/add");
        setLogo(response.data);
      } catch (error) {
      }
    };
    fetchLogo();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle logo update (POST request)
  const handleUpdateLogo = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("image", selectedFile); // Key must match @RequestPart("image") in backend

    try {
      const response = await Axios().post(`/admin/Updateadd/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Logo updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      window.location.reload(); // Refresh to fetch the new logo
    } catch (error) {
      toast.error("Failed to update logo.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i className="fa-solid fa-house mr-2"></i>
          <h6>
            <small>Add Management</small>
          </h6>
          <h6>
            <small>/</small>
          </h6>
          <h6>
            <small>Manage Logo</small>
          </h6>
        </div>
      </div>

      {/* Centered Form */}
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-200">
        {/* Upload New Logo */}
        <div className="p-4 bg-white rounded shadow" style={{ width: "500px" }}>
          <h3 className="text-success fw-bold text-center">Upload New Logo</h3>
          <div className="mb-3">
            <label className="form-label fw-bold">Logo Image:</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-evenly mt-3">
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() => setSelectedFile(null)}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleUpdateLogo}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>

        {/* Display Running Logo */}
        <h2 className="text-center text-primary fw-bold mt-4">Running Logo</h2>
        {logo.length > 0 && (
          <div className="p-4 rounded text-center">
            <img
              src={logo[0].addurl}
              className="w-75 rounded shadow-lg"
              alt="Uploaded Logo"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageLogo;
