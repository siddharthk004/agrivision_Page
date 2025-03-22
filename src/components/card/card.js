import React from "react";
import "../card/card.css";

const card = () => {
  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100">
        {/* Static Product Image */}
        <img
          className="card-img-top p-3"
          src="https://via.placeholder.com/300"
          alt="Sample Product"
          height={250}
        />
        {/* Card Body: Title and Description */}
        <div className="card-body">
          <h5 className="card-title">Sample Product</h5>
          <p className="card-text">
            This is a short description of the product to demonstrate the
            layout.
          </p>
        </div>
        {/* Price */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">Rs. 100</li>
        </ul>
        {/* Card Buttons */}
        <div className="card-body">
          {/* Buy Now Button */}
          <button className="btn btn-dark m-1">Buy Now</button>
          {/* Add to Cart Button */}
          <button
            className="btn btn-dark m-1"
            onClick={() => alert("Added to cart")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default card;
