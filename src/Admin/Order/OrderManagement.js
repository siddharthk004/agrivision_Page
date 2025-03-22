import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { saveAs } from "file-saver";
import JSZip from "jszip";
import React, { useState } from "react";
import Navbar from "../Header/Navbar";

function OrderManagement() {
  // Static dummy data with separate URLs for User and Shipment invoices
  const [orders] = useState([
    {
      id: 101,
      name: "Siddharth Kardile",
      total: 1200,
      paymentStatus: "Cash",
      invoiceUrl: "http://res.cloudinary.com/dmejw3uwe/raw/upload/v1742315156/amanecza1fimpescwl3d.pdf",
      shipmentInvoiceUrl: "http://res.cloudinary.com/dmejw3uwe/raw/upload/v1742315156/shipment_101.pdf",
    },
    {
      id: 102,
      name: "Sakshi Ladkat",
      total: 850,
      paymentStatus: "Cash",
      invoiceUrl: "https://www.example.com/invoices/Invoice_Order_102.pdf",
      shipmentInvoiceUrl: "https://www.example.com/invoices/Shipment_Order_102.pdf",
    },
    {
      id: 103,
      name: "Atharva Khaladkar",
      total: 1500,
      paymentStatus: "Cash",
      invoiceUrl: "https://www.example.com/invoices/Invoice_Order_103.pdf",
      shipmentInvoiceUrl: "https://www.example.com/invoices/Shipment_Order_103.pdf",
    },
  ]);

  const [loading, setLoading] = useState({}); // Track loading per order and invoice type
  const [bulkLoading, setBulkLoading] = useState(false); // Track bulk download loading

  const downloadInvoice = async (url, filename, orderId, type) => {
    setLoading((prev) => ({ ...prev, [orderId]: { ...prev[orderId], [type]: true } })); // Show spinner for the specific button

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      console.error(`Error downloading ${type} invoice:`, error);
    }

    setLoading((prev) => ({ ...prev, [orderId]: { ...prev[orderId], [type]: false } })); // Hide spinner
  };

  // Function to download all invoices as a ZIP
  const downloadAllInvoices = async (type) => {
    setBulkLoading(true); // Show spinner for bulk download

    if (orders.length === 0) {
      console.warn("No orders found.");
      setBulkLoading(false);
      return;
    }

    const zip = new JSZip();
    const downloadPromises = orders.map(async (order) => {
      try {
        const invoiceUrl = type === "user" ? order.invoiceUrl : order.shipmentInvoiceUrl;
        const response = await fetch(invoiceUrl);
        const blob = await response.blob();
        zip.file(`${type === "user" ? "User" : "Shipment"}_Invoice_Order_${order.id}.pdf`, blob);
      } catch (error) {
        console.error(`Failed to download ${type} invoice for Order ${order.id}:`, error);
      }
    });

    await Promise.all(downloadPromises);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `All_${type === "user" ? "User" : "Shipment"}_Invoices.zip`);
      setBulkLoading(false); // Hide spinner after bulk download
    });
  };

  return (
    <div className="d-flex flex-column">
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i className="fa-solid fa-house mr-2"></i>
          <h6 className=""><small>Order Desk</small></h6>
          <h6 className=""><small>/</small></h6>
          <h6 className=""><small>Order Management</small></h6>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center fw-bold mb-4">Order History</h2>

        {/* Table with Scrolling */}
        <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table className="table table-bordered text-center">
            <thead className="table-secondary">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
                <th scope="col">Payment Status</th>
                <th scope="col">User Invoice</th>
                <th scope="col">Shipment Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>₹{order.total}</td>
                  <td className={order.paymentStatus === "Cash" ? "text-success" : "text-warning"}>
                    {order.paymentStatus}
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm w-50 "
                      onClick={() => downloadInvoice(order.invoiceUrl, `User_Invoice_Order_${order.id}.pdf`, order.id, "user")}
                      disabled={loading[order.id]?.user} // Disable only the clicked button
                    >
                      {loading[order.id]?.user ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Downloading...
                        </>
                      ) : (
                        "User PDF"
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm w-50"
                      onClick={() => downloadInvoice(order.shipmentInvoiceUrl, `Shipment_Invoice_Order_${order.id}.pdf`, order.id, "shipment")}
                      disabled={loading[order.id]?.shipment} // Disable only the clicked button
                    >
                      {loading[order.id]?.shipment ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Downloading...
                        </>
                      ) : (
                        "Shipment PDF"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Fixed Footer Buttons */}
          <div className="flex bg-white shadow-lg py-3 text-center">
            <button
              className="btn btn-primary px-4 py-2 w-25"
              onClick={() => downloadAllInvoices("user")}
              disabled={bulkLoading}
            >
              {bulkLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Downloading All...
                </>
              ) : (
                "Download All User Invoices (ZIP)"
              )}
            </button>
            <button
              className="btn btn-secondary px-4 py-2 w-25"
              onClick={() => downloadAllInvoices("shipment")}
              disabled={bulkLoading}
            >
              {bulkLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Downloading All...
                </>
              ) : (
                "Download All Shipment Invoices (ZIP)"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
