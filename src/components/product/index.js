import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";
import "./style.css";

const Product = ({ data = [] }) => {
  const navigate = useNavigate();

  // Ensure data is always an array to avoid .map() error
  if (!Array.isArray(data)) {
    console.error("Expected an array, but received:", data);
    return <p>Error: Products could not be loaded.</p>;
  }

  if (data.length === 0) {
    return <p>No products found for this category.</p>;
  }

  return (
    <div className="show-parent">
      <div className="show">
        {data.map((product) => (
          <div key={product.id} className="product-card">
            {product.discount > 0 && (
              <div className="discount-badge">{product.discount}% OFF</div>
            )}
            <button
              className="wishlist-btn"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
            </button>
            <div
              className="img-wrapper"
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.productimage}
                alt={product.productname}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="info">
              <h3 className="title">{product.productname}</h3>
              <p className="brand">{product.productcompanyname}</p>

              <div className="price-container">
                <span className="current-price">₹{product.afterdiscount}</span>
                {product.beforediscount && (
                  <span className="original-price">
                    ₹{product.beforediscount}
                  </span>
                )}
              </div>
            </div>
            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart />
              </button>
              <button
                className="view-details-btn"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <ArrowUpRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
