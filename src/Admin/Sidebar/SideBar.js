import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import "./SideBar.css"; // Adjust the path if needed

function SideBar() {
  const navigate = useNavigate();
  const [logom, setLogo] = useState([]);

  useEffect(() => {
    const tok = localStorage.getItem("tok");

    if (!tok) {
      navigate("/AdminLogin"); // Redirect if no token
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await Axios().get("/admin/add");
        setLogo(response.data);
      } catch (error) {}
    };
    fetchLogo();
  }, []);
  return (
    <div>
      {/* Sidebar */}
      <div
        className="position-fixed top-0 start-0 text-dark bg-white border-end border-2 p-3 h-100"
        style={{
          width: "222px",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="text-center">
          {logom.length > 0 && logom[0].addurl ? (
            <img
              src={logom[0].addurl}
              alt="Logo"
              style={{ width: "120px", height: "auto" }}
            />
          ) : (
            <p>Loading...</p> // Show a placeholder if the image isn't available
          )}
        </div>

        <ul className="list-unstyled pt-2">
          <h6 className=" text-body-tertiary fs-20">
            <small>Dashboard</small>
          </h6>
          <Link to="/admin/home" className="text-decoration-none text-dark">
            <li className="p-2 rounded hover-effect">
              <i className="fas fa-chart-line text-danger me-2"></i> Home
            </li>
          </Link>

          <Link to="/admin/team" className="text-decoration-none text-dark">
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-people-group text-info me-1"></i> Team
            </li>
          </Link>
          {/* <Link
            to="/admin/setting"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
            <i className="fas fa-cog text-success me-2"></i> Settings
          </li>
          </Link> */}
        </ul>
        <h6 className=" text-body-tertiary fs-20">
          <small>Product</small>
        </h6>
        <ul className="list-unstyled">
          <Link
            to="/admin/product/add"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-plus text-primary me-2"></i> Add Product
            </li>
          </Link>

          <Link
            to="/admin/product/update"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-wand-magic-sparkles text-warning me-1"></i>{" "}
              Update Product
            </li>
          </Link>

          <Link
            to="/admin/product/view"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-magnifying-glass text-success me-2"></i>{" "}
              View Products
            </li>
          </Link>

          <Link
            to="/admin/product/stock"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-database text-danger me-2"></i> Stock Alert
            </li>
          </Link>
        </ul>

        <h6 className=" text-body-tertiary fs-20">
          <small>Ad Management</small>
        </h6>
        <ul className="list-unstyled">
          <Link
            to="/admin/AddManagement/Add"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-rectangle-ad text-danger-emphasis me-2"></i>{" "}
              Manage Ads
            </li>
          </Link>

          <Link
            to="/admin/AddManagement/Logo"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-upload text-success me-2"></i> Update Logo
            </li>
          </Link>
        </ul>

        <h6 className=" text-body-tertiary fs-20">
          <small>Help Desk</small>
        </h6>
        <ul className="list-unstyled">
          <Link
            to="/admin/HelpDesk/SupportRequest"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-phone text-warning me-2"></i> Support
              Requests
            </li>
          </Link>
        </ul>

        <h6 className=" text-body-tertiary fs-20">
          <small>Order Desk</small>
        </h6>
        <ul className="list-unstyled">
          <Link
            to="/admin/HelpDesk/Orderhistory"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-folder-open text-info me-2"></i>Order
              History
            </li>
          </Link>

          <Link
            to="/admin/HelpDesk/OrderManagement"
            className="text-decoration-none text-dark"
          >
            <li className="p-2 rounded hover-effect">
              <i class="fa-solid fa-truck-fast text-info-emphasis me-1"></i>{" "}
              Order Management
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
