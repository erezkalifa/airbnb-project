import { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
} from "react-icons/fa";

// Temporary test images
import img1 from "../assets/img/stay/1.avif";
import img2 from "../assets/img/stay/2.avif";
import img3 from "../assets/img/stay/3.avif";
import img4 from "../assets/img/stay/4.avif";

const testImages = [img1, img2, img3, img4];

export function StayPreview({ stay }) {
  const images = testImages;
  const [currIdx, setCurrIdx] = useState(0);

  const nextImg = () => {
    setCurrIdx((currIdx + 1) % images.length);
  };

  const prevImg = () => {
    setCurrIdx((currIdx - 1 + images.length) % images.length);
  };

  return (
    <div className="stay-card">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currIdx * 100}%)` }}
        >
          {testImages.map((url, idx) => (
            <img key={idx} src={url} alt="" className="carousel-img" />
          ))}
        </div>

        <button className="carousel-btn left" onClick={prevImg}>
          <FaChevronLeft />
        </button>
        <button className="carousel-btn right" onClick={nextImg}>
          <FaChevronRight />
        </button>
        <button className="like-btn">
          {" "}
          <FaRegHeart />
        </button>

        <div className="carousel-dots">
          {testImages.map((_, idx) => (
            <span
              key={idx}
              className={idx === currIdx ? "dot active" : "dot"}
            />
          ))}
        </div>
      </div>

      <div className="stay-card-info">
        <div className="stay-card-title-row">
          <span className="stay-card-location">
            {`${stay?.loc?.country || "Unknown"}, ${
              stay?.loc?.city || "Unknown"
            }`}
          </span>
          <span className="stay-card-rating">
            <FaStar style={{ color: "#222", fontSize: "12px" }} />{" "}
            {stay?.reviews[0]?.rate || 4}
          </span>
        </div>
        <div className="stay-card-distance">
          {stay?.distance || "748 kilometers away"}
        </div>
        <div className="stay-card-dates">
          {stay?.availableDates || "Apr 7–12"}
        </div>
        <div className="stay-card-price">
          €{stay?.price || 100}
          <span className="night"> night</span>
        </div>
      </div>
    </div>
  );
}
