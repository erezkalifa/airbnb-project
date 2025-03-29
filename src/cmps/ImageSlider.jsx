import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import { Button, Typography } from "@mui/material";

// MUI styling (optional)
const styles = {
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
  },
  description: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
  },
  leftArrow: {
    left: "10px",
  },
  rightArrow: {
    right: "10px",
  },
};

export function ImageSlider({ urls }) {
    // Define responsive settings for the carousel
    const responsive = {
      superLarge: {
        // screens > 1600px
        breakpoint: { max: 4000, min: 1600 },
        items: 1,
      },
      large: {
        // screens > 1024px
        breakpoint: { max: 1600, min: 1024 },
        items: 1,
      },
      medium: {
        // screens > 464px
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      small: {
        // screens <= 464px
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

  if (urls == null)
    return (<div>Image slider Loading ...</div>)

  return (
    <div className="image-slider">
      <Carousel
        responsive={responsive}
        arrows={true}
        infinite={true}
        autoPlay={false}
        showDots={true}
        customLeftArrow={<Button style={{ ...styles.arrow, ...styles.leftArrow }}>←</Button>}
        customRightArrow={<Button style={{ ...styles.arrow, ...styles.rightArrow }}>→</Button>}
      >
        {urls.map((url, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img src={url} style={styles.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
