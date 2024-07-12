import React, { useState, useEffect } from "react";
import "../../styles/Job/Banner.css";

import slide1 from "../../assets/images/slide5.png";
import slide2 from "../../assets/images/slide2.png";
import slide3 from "../../assets/images/slide3.png";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slide1, slide2, slide3];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="banner-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`banner-slide ${index === currentSlide ? "active" : ""}`}
        >
          <img src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <div className="banner-controls">
        <button onClick={prevSlide}>&lt;</button>
        <button onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
};

export default Banner;
