import React, { useEffect, useState } from "react";
import Axios from "../../Axios"; // Ensure this points to your Axios instance
import Navbar from "../Header/Navbar";

function StockView() {
  const [products, setProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios().post("/user/product");
        // Filter products with quantity < 2
        const outOfStockProducts = response.data.filter((product) => product.quantity < 1);
        setProducts(outOfStockProducts);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <Navbar />

      {/* Main Content */}
      <div className="p-2">
        <div className="w-10 d-flex start-0 gap-1 justify-content-start">
          <i class="fa-solid fa-house mr-2"></i>
          <h6 className="">
            <small>Product</small>
          </h6>
          <h6 className="">
            <small>/</small>
          </h6>
          <h6 className="">
            <small>Stock</small>
          </h6>
        </div>
      </div>
      <div className="container">
        <div>
          <h2 className="text-center text-danger fw-bold bg-white rounded p-2">
            Out Of Stock Product
          </h2>

          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-6 col-sm-12 mb-4"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "250px", // Fixed width for uniform size
                    minHeight: "300px", // Ensures all cards have the same height
                    padding: "18px",
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                    margin: "auto",
                  }}
                >
                  <img
                    src={product.productimage}
                    alt={product.productname}
                    style={{
                      width: "150px",
                      height: "150px", // Ensuring all images are the same size
                      objectFit: "cover", // Keeps aspect ratio without distortion
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <div className="card-body" style={{ flexGrow: 1 }}>
                    <p className="fw-bold">ID: {product.id}</p>
                    <h6>{product.productname}</h6>
                    <h5 className="text-danger">Out of Stock</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockView;
