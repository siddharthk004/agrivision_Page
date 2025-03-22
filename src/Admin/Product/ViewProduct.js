import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import Navbar from "../Header/Navbar";

function ViewProduct() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResult([]);
      setNoResult(false);
      return;
    }
    setLoading(true);
    setNoResult(false);

    try {
      const response = await Axios().get(`/user/search/${query}`, {
        params: { q: query },
      });
      setResult(response.data);

      if (response.data.length === 0) {
        setNoResult(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    } else {
      setResult([]);
      setNoResult(false);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
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
            <small>View</small>
          </h6>
        </div>
      </div>
      <h2 className="text-center text-success fw-bold bg-white rounded p-2">
        View Product
      </h2>
      <div className="container mt-4">
        {/* Search Bar */}
        <input
          type="text"
          className="form-control mb-3"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
        />

        {/* Product Grid */}
        <div className="row">
          {result.length > 0 ? (
            result.map((product) => (
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
                    <h6 className="fw-bold">#{product.id}</h6>
                    <h5> {product.productname}</h5>
                    <h6 className="text-muted">{product.productcompanyname}</h6>
                    <h6>
                      <strong>Price:</strong> ₹{product.beforediscount}
                    </h6>
                    <h5>Discount: {product.discount}%</h5>
                    <h6>
                      <strong>Final Price:</strong>
                      <span className="text-success fw-bold">
                        {" "}
                        ₹{product.afterdiscount}
                      </span>
                    </h6>
                    {product.quantity <= 5 ? (
                      <h5 className="text-danger">
                        Low Stock
                        <small className="ps-2 text-dark">
                          [{product.quantity}]
                        </small>
                      </h5>
                    ) : (
                      <h5 className="text-success">
                        In Stock
                        <small className="ps-2 text-dark">
                          [{product.quantity}]
                        </small>
                      </h5>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
