import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";
import "./SupportRequest.css"; // Ensure correct path

function SupportRequest() {
  const [helpRequests, setHelpRequests] = useState([]); // Store help requests
  const [messages, setMessages] = useState({}); // Store messages per request
  const [loading, setLoading] = useState({}); // Track loading per request
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const helpMessages = [
    "Hello! How can I assist you today?",
    "Thank you for reaching out. We will get back to you shortly!",
    "Your request is being processed. Please allow us some time.",
    "We appreciate your patience. Our support team is working on your issue.",
    "For order updates, please check your email or order history.",
    "If you need urgent assistance, please contact our support team.",
    "We value your feedback. Let us know how we can improve!",
    "Thank you for choosing us! Let us know if you need any help.",
  ];

  // Fetch help requests on component mount
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await Axios().get("/admin/ViewHelpCenterList");
        setHelpRequests(response.data);
      } catch (error) {
        console.error("Error fetching help requests:", error);
      }
    };
    fetchHelpRequests();
  }, []);

  // Handle copying pre-defined messages
  const copyToClipboard = () => {
    if (!selectedMessage) return;
    navigator.clipboard.writeText(selectedMessage);
    toast.error("Failed to update logo.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    setIsPopupOpen(false);
  };

  // Handle sending mail with request ID, email, and corresponding message
  const handleSendMail = async (id, email) => {
    if (!messages[id]) {
      alert("");
      toast.warn("Please enter a message before sending.", {
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

    setLoading((prev) => ({ ...prev, [id]: true })); // Start loading for this request

    try {
      const response = await Axios().post("/admin/serviceMailSend", {
        id: id, // Send request ID
        mail: email, // Send email
        message: messages[id], // Get correct message for this request
      });
      window.location.reload(); // Refresh to fetch new ads
      toast.success("Mail sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to send mail!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false })); // Stop loading for this request
    }
  };
  
  // Fetch help requests on component mount
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await Axios().get("/admin/ViewHelpCenterList");
        setHelpRequests(response.data);
      } catch (error) {
        console.error("Error fetching help requests:", error);
      }
    };
    fetchHelpRequests();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Navbar />

      {/* Page Header */}
      <div className="d-flex justify-content-between p-2">
        <div className="w-10 d-flex start-0 gap-1 pt-2 justify-content-start">
          <i className="fa-solid fa-house mr-2"></i>
          <h6><small>Help Desk</small></h6>
          <h6><small>/</small></h6>
          <h6><small>Support Requests</small></h6>
        </div>

        {/* Open Popup Button */}
        <button
          style={{ width: "150px" }}
          className="p-2 m-1 rounded bg-primary text-white border-0"
          onClick={() => setIsPopupOpen(true)}
        >
          Message Helper
        </button>
      </div>

      {/* Floating Message Helper Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content w-50">
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>

            <h4>Select a Reply Message</h4>
            <select
              className="popup-select"
              onChange={(e) => setSelectedMessage(e.target.value)}
              value={selectedMessage}
            >
              <option value="">-- Select a Message --</option>
              {helpMessages.map((message, index) => (
                <option key={index} value={message}>
                  {message}
                </option>
              ))}
            </select>

            <textarea className="popup-textarea" value={selectedMessage} readOnly></textarea>

            <button className="copy-btn" onClick={copyToClipboard} disabled={!selectedMessage}>
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Help Requests List */}
      <div className="container">
        {helpRequests.length > 0 ? (
          <div className="help-requests-container">
            {helpRequests.map((request) => (
              <div key={request.id} className="bg-white rounded p-4 help-request-box mb-4">
                <h6><small>ID: {request.id}</small></h6>
                <h5><b>Name: {request.username}</b></h5>
                <h6>Email: {request.email}</h6>

                <h4>Query</h4>
                <p className="border rounded-2 p-2 help-query">{request.description}</p>

                {/* Reply Section */}
                <h4>Reply</h4>
                <textarea
                  className="p-2 rounded reply-box"
                  rows="4"
                  cols="50"
                  placeholder="Enter Message Here..."
                  value={messages[request.id] || ""} // Get message for this request
                  onChange={(e) =>
                    setMessages((prev) => ({ ...prev, [request.id]: e.target.value }))
                  }
                ></textarea>
                <br />
                <button
                  onClick={() => handleSendMail(request.id, request.email)} // Send ID & Email
                  disabled={loading[request.id]} // Disable button only for this request
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#228b22",
                    color: "#fff",
                  }}
                >
                  {loading[request.id] ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No help requests found.</p>
        )}
      </div>
    </div>
  );
}

export default SupportRequest;
