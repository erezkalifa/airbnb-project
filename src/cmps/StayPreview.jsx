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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "rgba(0, 0, 0, 0.5)",
              height: "24px",
              width: "24px",
              stroke: "white",
              strokeWidth: 2,
              overflow: "visible",
            }}
          >
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
          </svg>
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
            {(stay?.reviews[0]?.rate).toFixed(1) || null}
          </span>
        </div>
        <div className="stay-card-distance">
          {stay?.distance || "748 kilometers away"}
        </div>
        <div className="stay-card-dates">
          {stay?.availableDates || "Apr 7–12"}
        </div>
        <div className="stay-card-price">
          €{stay?.price || null}
          <span className="night"> night</span>
        </div>
      </div>
    </div>
  );
}
