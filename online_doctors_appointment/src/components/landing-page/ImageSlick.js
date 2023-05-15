import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import 'slick-carousel/slick/slick-theme.css'

const d1 = require("../../images/d6.jpg");
const d2 = require("../../images/d2.jpg");
const d3 = require("../../images/d7.jpg");
const d4 = require("../../images/d4.jpg");
const d5 = require("../../images/d5.jpg");

const ImageSlick = () => {
  const images = [
    {
      id: 1,
      src: d1,
      alt: "Image 1",
    },
    {
      id: 2,
      src: d2,
      alt: "Image 2",
    },
    {
      id: 3,
      src: d3,
      alt: "Image 3",
    },
    {
      id: 4,
      src: d4,
      alt: "Image 4",
    },
    {
      id: 5,
      src: d5,
      alt: "Image 5",
    },
  ];

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{marginTop : '2rem'}}>
      <div className="imgslider">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlick;
