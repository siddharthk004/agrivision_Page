import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../Axios";

function HomePage() {
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [helpRequests, sethelpRequests] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wheat Seeds",
      company: "AgriCorp",
      price: 500,
      discount: 10,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 2,
      name: "Rice Seeds",
      company: "GreenGrow",
      price: 600,
      discount: 15,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 3,
      name: "Organic Fertilizer",
      company: "EcoFarms",
      price: 300,
      discount: 5,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 1,
      name: "Wheat Seeds",
      company: "AgriCorp",
      price: 500,
      discount: 10,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 2,
      name: "Rice Seeds",
      company: "GreenGrow",
      price: 600,
      discount: 15,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 3,
      name: "Organic Fertilizer",
      company: "EcoFarms",
      price: 300,
      discount: 5,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
    {
      id: 4,
      name: "Wheat Seeds",
      company: "AgriCorp",
      price: 500,
      discount: 10,
      image:
        "https://res.cloudinary.com/dtsdammma/image/upload/v1738492554/atqtllerllnfcsg7xyk2.jpg",
    },
  ]);

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
    const fetchHelpRequests = async () => {
      try {
        const response = await Axios().get(`/admin/ViewHelpCenterList`);
        sethelpRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHelpRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/");
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

  const FullPage = {
    background: "linear-gradient(135deg, #98fb98 ,#98fb98",
    minHeight: "100vh",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "1500px",
    margin: "auto",
    gap: "10px",
    paddingTop: "20px",
    minHeight: "14vh",
    padding: "20px",
  };

  const sidebarStyle = {
    width: "250px",
    border: "1px solid #000000",
    display: "flex",
    margin: "10px",
    flexDirection: "column",
    gap: "15px",
    background: "linear-gradient(135deg, #c5c5c5, #f0f0f0)",
    borderRadius: "10px",
    maxWidth: "400px",
    padding: "15px",
    boxShadow: "2px 8px 10px rgba(0, 0, 0, 0.1)",
  };

  const contentBoxStyle = {
    flex: 1,
    padding: "20px",
    border: "1px solid #000000",
    borderRadius: "10px",
    overflow: "auto",
    maxHeight: "240px",
    background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    minHeight: "615px",
  };
  const colors = [
    "#008000",
    "#008000",
    "#008000",
    "#008000",
    "#008000",
    "#008000",
    "#008000",
    "#8B0000",
    "#00008B",
    "#20b2aa",
    "#4B0082",
    "#2E8B57",
  ];

  const getBoxStyle = (index) => ({
    padding: "15px",
    border: "1px solid #a9a9a9",
    color: "#f5f5f5",
    borderRadius: "10px",
    border: "1px solid #000000",
    onmouseover: "#696969",
    maxHeight: "60px",
    backgroundColor: colors[index % colors.length], // Assign unique color
    boxShadow: "2px 8px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  });
  const getBoxStylee = {
    padding: "15px",
    color: "#ff0000",
    borderRadius: "10px",
    backgroundColor: "#ffe4e1",
    border: "1px solid #8B0000",
    maxHeight: "60px",
    boxShadow: "2px 8px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  const searchBarStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "30vh",
    padding: "18px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    width: "100px",
    height: "140px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const helpRequestBoxStyle = {
    padding: "20px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "20px",
  };
  
  const helpRequestBoxStylec = {
    padding: "20px",
    border: "2px solid #a9a9a9",
    borderRadius: "10px",
    backgroundColor: "#dcdcdc ",
    marginBottom: "20px",
  };

  const responseBoxStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "2px solid #ddd",
    borderRadius: "8px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    marginTop: "20px",
  };

  const buttonStyle1 = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1e90ff",
    color: "#fff",
  };

  const buttonStyle2 = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#228b22",
    color: "#fff",
  };

  const buttonStyle4 = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#1e90ff",
    color: "#fff",
  };

  {
    /* Inline Styles */
  }
  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
  };

  return (
    <div style={FullPage}>
      <h1
        style={{
          textAlign: "center",
          paddingBottom: "10px",
          paddingTop: "14px",
          backgroundColor: "#006400",
          color: "#ffffff",
        }}
      >
        Admin Dashboard
      </h1>
      <div style={containerStyle}>
        <div style={sidebarStyle}>
          <div
            style={getBoxStyle(0)}
            onClick={() => setSelectedSection("viewProduct")}
          >
            <h2>View Product</h2>
          </div>
          <div
            style={getBoxStyle(2)}
            onClick={() => setSelectedSection("addProduct")}
          >
            <h2>Add Product</h2>
          </div>
          <div
            style={getBoxStyle(1)}
            onClick={() => setSelectedSection("OOSProduct")}
          >
            <h2>Out Of Stock</h2>
          </div>
          <div
            style={getBoxStyle(3)}
            onClick={() => setSelectedSection("updateProduct")}
          >
            <h2>Update Product</h2>
          </div>
          <div
            style={getBoxStyle(4)}
            onClick={() => setSelectedSection("viewOrder")}
          >
            <h2>View Order</h2>
          </div>
          <div
            style={getBoxStyle(5)}
            onClick={() => setSelectedSection("viewHelp")}
          >
            <h2>Help Request</h2>
          </div>
          <div style={getBoxStylee} onClick={() => handleLogout()}>
            <h2>Logout</h2>
          </div>
        </div>

        <div style={contentBoxStyle}>
          {!selectedSection && (
            <div style={{ textAlign: "center", padding: "20px",marginTop: "20px" }}>
              <img
                src="https://img.freepik.com/premium-vector/creative-tech-workspace_71609-1409.jpg?semt=ais_hybrid"
                alt="Default"
                style={{ width: "80%", height: "auto" }}
              />            
              <div className="container">
      <h1 className="text-primary text-center">Hello, Bootstrap in React!</h1>
      <button className="btn btn-success">Click Me</button>
    </div></div>
          )}
          
          <div>
            {selectedSection === "viewProduct" && (
              <div>
                <input
                  style={searchBarStyle}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                />
                <div style={gridContainerStyle}>
                  {result.length > 0 ? (
                    result.map((product) => {
                      return (
                        <div key={product.id} style={cardStyle}>
                          <img
                            src={product.productimage}
                            alt={product.productname}
                            style={imageStyle}
                          />
                          <h4>{product.id}</h4>
                          <h3>{product.productname}</h3>
                          <h5>{product.productcompanyname}</h5>
                          <p>
                            <strong>Price:</strong> ₹{product.beforediscount}
                          </p>
                          <p>
                            <strong>Discount:</strong> {product.discount}%
                          </p>
                          <p>
                            <strong>Final Price:</strong>
                            <span style={{ color: "green" }}>
                              ₹{product.afterdiscount}
                            </span>
                          </p>
                          {product.quantity === 0 ? (
                            <h5 style={{ color: "red" }}>Out Of Stock</h5>
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
              </div>
            )}

            {selectedSection === "addProduct" && (
              <div
                style={{
                  maxWidth: "1000px",
                  margin: "auto",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  background: "#f9f9f9",
                }}
              >
                <form>
                  <h2 style={{ textAlign: "center" }}>Add New Product</h2>
                  <div>
                    {/* Product Name */}
                    <label>Product Name:</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      style={inputStyle}
                    />

                    {/* Product Company Name */}
                    <label>Product Company Name:</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      style={inputStyle}
                    />
                  </div>

                  {/* Product Image Upload */}
                  <label>Product Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />

                  {/* Product Prices */}
                  <br></br>
                  <label>Before Discount Price:</label>
                  <input
                    type="number"
                    placeholder="Enter price before discount"
                    style={inputStyle}
                  />

                  <label>After Discount Price:</label>
                  <input
                    type="number"
                    placeholder="Enter price after discount"
                    style={inputStyle}
                  />

                  {/* Product Quantity */}
                  <label>Product Quantity:</label>
                  <input
                    type="number"
                    placeholder="Enter product quantity"
                    style={inputStyle}
                  />

                  {/* Product Discount */}
                  <label>Product Discount (%):</label>
                  <input
                    type="number"
                    placeholder="Enter discount percentage"
                    style={inputStyle}
                  />

                  {/* Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <button type="reset" style={buttonStyle}>
                      Clear
                    </button>
                    <button
                      type="submit"
                      style={{ ...buttonStyle, backgroundColor: "green" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}

            {selectedSection === "updateProduct" && (
              <div
                style={{
                  maxWidth: "1000px",
                  margin: "auto",
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  background: "#f9f9f9",
                }}
              >
                <form>
                  <h2 style={{ textAlign: "center" }}>Update Product</h2>
                  <div>
                    {/* Product id */}
                    <label>Product id:</label>
                    <input
                      type="number"
                      placeholder="Enter product id"
                      style={inputStyle}
                    />

                    {/* Product Name */}
                    <label>Product Name:</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      style={inputStyle}
                    />

                    {/* Product Company Name */}
                    <label>Product Company Name:</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      style={inputStyle}
                    />
                  </div>

                  {/* Product Image Upload */}
                  <label>Product Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ marginBottom: "10px" }}
                  />
                  <br />

                  <label>New Price:</label>
                  <input
                    type="number"
                    placeholder="Enter price after discount"
                    style={inputStyle}
                  />

                  {/* Product Quantity */}
                  <label>Product Quantity:</label>
                  <input
                    type="number"
                    placeholder="Enter product quantity"
                    style={inputStyle}
                  />

                  {/* Product Discount */}
                  <label>Product Discount (%):</label>
                  <input
                    type="number"
                    placeholder="Enter discount percentage"
                    style={inputStyle}
                  />

                  {/* Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <button type="reset" style={buttonStyle}>
                      Clear
                    </button>
                    <button
                      type="submit"
                      style={{ ...buttonStyle, backgroundColor: "green" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}

            {selectedSection === "OOSProduct" && (
              <div>
                <h2 style={{ textAlign: "center" }}>Out Of Stock Product</h2>
                <div style={gridContainerStyle}>
                  {products.map((product) => (
                    <div key={product.id} style={cardStyle}>
                      <img
                        style={{ height: "16vh" }}
                        src={product.image}
                        alt={product.name}
                      />
                      <p>ID: {product.id}</p>
                      <h4>{product.name}</h4>
                      <h5 style={{ color: "red" }}>Out of Stock</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedSection === "viewOrder" && (
              <p>📜 View all customer orders and statuses.</p>
            )}
            {selectedSection === "viewHelp" && (
              <div>
                {helpRequests.length > 0 ? (
                  <div>
                    {helpRequests.map((request, index) => (
                      <div key={index} style={helpRequestBoxStylec}>
                        <h4>{index + 1}</h4>
                        <br />
                        <br />
                        <p>
                          <b>Name: {request.username}</b>
                        </p>
                        <p>Email id: {request.email}</p>
                        <br />
                        <h3>Query</h3>
                        <br />
                        <p style={helpRequestBoxStyle}>{request.description}</p>
                        <br />
                        <h3>Reply</h3>
                        <br />
                        <textarea
                          style={helpRequestBoxStyle}
                          rows="4"
                          className="reply-box"
                          placeholder="Enter Message Here ... "
                        ></textarea>
                        <br />
                        <button style={buttonStyle2}>Send</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No help requests found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
