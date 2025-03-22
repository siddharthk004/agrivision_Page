import React from "react";
import Navbar from "../Header/Navbar";

function Setting() {
  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">
            <small>Dashboard</small>
          </h6>
          <h6 className="">
            <small>/</small>
          </h6>
          <h6 className="">
            <small>Setting</small>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Setting;
