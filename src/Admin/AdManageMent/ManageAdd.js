import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";

function ManageAdd() { 
  const [ads, setAds] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAdId, setSelectedAdId] = useState("");
  const [loading1, setLoading1] = useState(false); // Track loading state
  const [loading2, setLoading2] = useState(false); // Track loading state

  // Fetch all ads on component mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await Axios().get("/admin/add");
        setAds(response.data);
      } catch (error) {
      }
    };
    fetchAds();
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle new ad upload (POST request)
  const handleUploadAd = async () => {
    if (!selectedFile) {
      toast.warn("Please select an image first!", {
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
    setLoading1(true);

    const formData = new FormData();
    formData.append("image", selectedFile); // Key must match @RequestPart("image") in backend

    try {
      await Axios().post("/admin/addImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Ad uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      window.location.reload(); // Refresh to fetch new ads
    } catch (error) {
      toast.error("Failed to upload ad.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading1(false);
    }
  };

  // Handle ad deletion (DELETE request)
  const handleDeleteAd = async () => {
    if (!selectedAdId) {
      toast.warn("Please select an ad to delete!", {
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
    setLoading2(true);

    try {
      await Axios().post(`/admin/Deleteadd/${selectedAdId}`);
      toast.success("Ad deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      window.location.reload(); // Refresh to remove deleted ad
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading2(false);
    }
  };
  return (
    <div>
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
            <small>Manage Ads</small>
          </h6>
        </div>
      </div>

      <div className="d-flex gap-4 justify-content-evenly">
        {/* Upload New Ad */}
        <div
          className="p-2 m-6 bg-white rounded shadow"
          style={{ width: "500px" }}
        >
          <h3 className="text-success fw-bold text-center">Upload New Ad</h3>
          <div className="mb-3">
            <label className="form-label fw-bold">Select Image:</label>
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
              onClick={handleUploadAd}
              disabled={loading1}
            >
              {loading1 ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>

        {/* Delete Ad */}
        <div className="p-2 bg-white rounded shadow" style={{ width: "400px" }}>
          <h3 className="text-danger fw-bold text-center">Delete Ad</h3>
          <div className="mb-3">
            <label className="form-label fw-bold">Select Ad to Delete:</label>
            <select
              className="form-control"
              onChange={(e) => setSelectedAdId(e.target.value)}
              value={selectedAdId}
            >
              <option value="">-- Select Ad --</option>
              {ads
                .filter((ad) => ad.id !== 1) // Exclude ID 1
                .map((ad) => (
                  <option key={ad.id} value={ad.id}>
                    Ad {ad.id}
                  </option>
                ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-evenly mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSelectedAdId("")}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleDeleteAd}
              disabled={loading2}
            >
              {loading2 ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>

      <br />
      <h2 className="text-center text-primary fw-bold">Running Ads</h2>
      {/* Display Uploaded Ads */}
      <div className="container p-4 bg-white rounded shadow">
        <div className="row">
          {ads.slice(1,).map((ad) => (
            <div key={ad.id} className="col-lg-5 w-100 mb-3 d-flex">
              <div className="text-center">
                <h6>{ad.id}</h6>
                <img
                  src={ad.addurl}
                  className="w-100 rounded shadow"
                  alt="Uploaded Ad"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />

    </div>
  );
}

export default ManageAdd;
