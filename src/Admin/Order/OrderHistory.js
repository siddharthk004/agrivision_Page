import React from "react";
import Navbar from "../Header/Navbar"; 

function OrderHistory() {
  const orders = [
    {
      id: 1,
      name: "Siddharth Kardile",
      total: 1200,
      paymentStatus: "Paid",
      date: "2024-02-17",
      items: 3,
      deliveryStatus: "Delivered",
    },
    {
      id: 2,
      name: "Sakshi Ladkat",
      total: 850,
      paymentStatus: "Pending",
      date: "2024-02-16",
      items: 2,
      deliveryStatus: "Shipped",
    },
    {
      id: 3,
      name: "Atharva Khaladkar",
      total: 1500,
      paymentStatus: "Pending",
      date: "2024-02-15",
      items: 5,
      deliveryStatus: "Processing",
    },
    {
      id: 4,
      name: "Bhushan Zade",
      total: 1200,
      paymentStatus: "Paid",
      date: "2024-02-17",
      items: 3,
      deliveryStatus: "Delivered",
    },
    {
      id: 5,
      name: "Amruta Dahatonde",
      total: 850,
      paymentStatus: "Failed",
      date: "2024-02-16",
      items: 2,
      deliveryStatus: "Processing",
    },
    {
      id: 6,
      name: "Vaishnav Mankar",
      total: 1500,
      paymentStatus: "Paid",
      date: "2024-02-15",
      items: 5,
      deliveryStatus: "Delivered",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">
            <small>Order Desk</small>
          </h6>
          <h6 className="">
            <small>/</small>
          </h6>
          <h6 className="">
            <small>Order History</small>
          </h6>
        </div>
      </div>

      {/* Order History */}
      <div className="container">
        <h3 className="text-success fw-bold text-center bg-white rounded p-2">
          Order History [Last 7 day]
        </h3>
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div
                className="p-3 border rounded-3 shadow-sm bg-white"
                style={{ minHeight: "180px" }}
              >
                <h6 className="fw-bold">Order #{order.id}</h6>
                <h5>
                  <strong>Name:</strong> {order.name}
                </h5>
                <h6>
                  <strong>Total:</strong> ₹{order.total}
                </h6>
                <h6>
                  <strong>Payment Status:</strong>{" "}
                  <span
                    className={
                      order.paymentStatus === "Paid"
                        ? "text-success"
                        : order.paymentStatus === "Pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </h6>
                <h6>
                  <strong>Date:</strong> {order.date}
                </h6>
                <h6>
                  <strong>Items:</strong> {order.items}
                </h6>
                <h6>
                  <strong>Delivery Status:</strong> {order.deliveryStatus}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
