import React, { useState } from "react";
import Slider from "react-slick";
import { useProductContext } from "../../context/AppContext";
import fungus from "../../assets/images/fungus.jpg";
import pests from "../../assets/images/pests.jpg";
import fertilizers from "../../assets/images/fertilizers.jpg";
import chemicals from "../../assets/images/chemicals.jpg";
import "./style.css";

const CatSlider = ({ setSelectedCategory }) => {
  const categories = [
    { id: null, name: "All Products", image: "your-all-products-image.jpg" }, // Add this
    { id: "pesticide", name: "Pesticides", image: pests },
    { id: "bio-fertilizer", name: "Bio Fertilizers", image: fertilizers },
    { id: "nutrient", name: "Nutrients", image: chemicals },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="catSliderSection">
      <div className="container-fluid">
        {/* <h2 className="hd">Our Products</h2> */}

        <div className="categorySections">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="categoryItem"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <img src={cat.image} alt={cat.name} />
              <h3 className="cat_name">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatSlider;
