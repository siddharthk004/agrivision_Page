import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

function AdminDashboard() {
  return (
    <div className="d-flex bg-body-secondary h-auto top-0 position-absolute w-100">
      <SideBar />
      {/* Main Content */}
      <div
        style={{ marginLeft: "222px",minHeight: "735px" }}
        className=" flex-grow-1 p-1 pt-2 h-100"
      >
      <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
