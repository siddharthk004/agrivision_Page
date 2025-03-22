import React, { useState } from "react";
import { Link } from "react-router-dom";
import Roundup from "../../assets/images/Roundup.jpg";
import "./Details.css";
import Footer from "../footer/footer.js";
const Details = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    alert(`Added ${quantity} items to the cart!`);
  };

  return (
    <div className="details-page">
      <div className="product-container">
        <div className="product-image">
          <img src={Roundup} alt="Roundup Herbicide" />
        </div>
        <div className="product-details">
          <h2>Name: Roundup Herbicide</h2>
          <h3>Price: &#8377; 50.00</h3>
          <div className="quantity">
            <label>Qty:</label>
            <button onClick={handleDecrease} className="qty-button">
              -
            </button>
            <span className="qty-display">{quantity}</span>
            <button onClick={handleIncrease} className="qty-button">
              +
            </button>
          </div>
          <button onClick={addToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <p className="product-description">
            Roundup is a herbicide that kills a wide variety of pests, including
            spider mites, aphids, and maggots. It is commonly used for
            controlling pests in crops like corn, wheat, soybean, and cotton. It
            is not suitable for use on livestock or animals. This herbicide is
            also available in concentrated form. For more information, visit the
            official website of Roundup Herbicide Company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
