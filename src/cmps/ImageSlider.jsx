import React, { useState, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// MUI styling (optional)
const styles = {
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    backgroundColor: "rgba(242, 241, 241, 0.5)", // Optional: Adds a background to the arrows for better visibility
    padding: "15px", // Adjust the padding to make the circle larger
    borderRadius: "50%", // Ensures the background is a perfect circle
    color: "white",
    display: "flex", // Ensures the icon is centered
    justifyContent: "center", // Centers the icon horizontally
    alignItems: "center", // Centers the icon vertically
    width: "50px", // Set a fixed width for the circle
    height: "50px", // Set a fixed height for the circle
    opacity: 0, // Initially hidden
    transition: "opacity 0.3s ease-in-out", // Smooth transition when hovering
  },
  leftArrow: {
    left: "10px", // Positions the left arrow on the left
  },
  rightArrow: {
    right: "10px", // Positions the right arrow on the right
  },
  customDot: {
    backgroundColor: "rgba(242, 241, 241, 0.8)", // Dot color
    borderRadius: "50%", // Round dots
    width: "10px", // Dot size
    height: "10px", // Dot size
    margin: "0 5px", // Space between dots
  },
  customDotsContainer: {
    position: "absolute",
    top: "40px", // Move the dots to the top of the carousel
    left: "50%",
    transform: "translateX(-50%)", // Centering the dots
    zIndex: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export function ImageSlider({ urls }) {
  const [hoveredArrow, setHoveredArrow] = useState(null);
  const carouselRef = useRef(null); // Create a ref to interact with the carousel

  // Define responsive settings for the carousel
  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 1600 },
      items: 1,
    },
    large: {
      breakpoint: { max: 1600, min: 1024 },
      items: 1,
    },
    medium: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    small: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (urls == null) return <div>Image slider Loading ...</div>;

  // Handle left arrow click (move to previous slide)
  const handleLeftArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(); // Go to the previous slide
    }
  };

  // Handle right arrow click (move to next slide)
  const handleRightArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next(); // Go to the next slide
    }
  };

  return (
    <div
      className="image-slider"
      onMouseEnter={() => setHoveredArrow(null)} // Reset when entering the container
      style={{ position: "relative" }}
    >
      <Carousel
        ref={carouselRef} // Attach the ref to the carousel component
        responsive={responsive}
        arrows={false} // Disable the default arrows
        infinite={true}
        autoPlay={false}
        showDots={true}
      >
        {urls.map((url, index) => (
          <div key={index}>
            <img src={url} style={styles.image} />
          </div>
        ))}
      </Carousel>

      {/* Custom Left Arrow */}
      <Button
        style={{
          ...styles.arrow,
          ...styles.leftArrow,
          opacity: hoveredArrow === "left" ? 1 : 0, // Show only when hovering the left arrow
        }}
        onMouseEnter={() => setHoveredArrow("left")}
        onMouseLeave={() => setHoveredArrow(null)}
        onClick={handleLeftArrowClick} // Handle left arrow click
      >
        <ArrowBackIosIcon style={{ fontSize: "15px" }} />
      </Button>

      {/* Custom Right Arrow */}
      <Button
        style={{
          ...styles.arrow,
          ...styles.rightArrow,
          opacity: hoveredArrow === "right" ? 1 : 0, // Show only when hovering the right arrow
        }}
        onMouseEnter={() => setHoveredArrow("right")}
        onMouseLeave={() => setHoveredArrow(null)}
        onClick={handleRightArrowClick} // Handle right arrow click
      >
        <ArrowForwardIosIcon style={{ fontSize: "15px" }} />
      </Button>

      {/* Custom Dots Container */}
      <div style={styles.customDotsContainer}>
        {/* The dots will automatically be placed here */}
      </div>
    </div>
  );
}

export default ImageSlider;
