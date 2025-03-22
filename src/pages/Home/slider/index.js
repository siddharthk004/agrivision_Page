import React from "react";
import Slider from "react-slick";
import "./index.css";
import Slide1 from "../../../../src/assets/images/slider1.jpg";
import Slide2 from "../../../../src/assets/images/slider2.jpg";

const HomeSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplayspeed: 500,
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid">
        <Slider {...settings} className="home_slider_Main">
          <div className="item">
            <img src={Slide1} alt="Slide 1" className="w-100" />
          </div>
          <div className="item">
            <img src={Slide2} alt="Slide 2" className="w-100" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HomeSlider;
