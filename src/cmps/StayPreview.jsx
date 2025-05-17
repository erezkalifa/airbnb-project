import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {Link} from "react-router-dom"

export function StayPreview({ stay }) {
  const [currIdx, setCurrIdx] = useState(0);

  const nextImg = () => {
    setCurrIdx((currIdx + 1) % stay.imgUrls.length);
  };

  const prevImg = () => {
    currIdx === 0
      ? ""
      : setCurrIdx((currIdx - 1 + stay.imgUrls.length) % stay.imgUrls.length);
  };

  return (
    <Link to={`/stay/${stay._id}`} className="stay-card">
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currIdx * 100}%)` }}
        >
          {stay.imgUrls.map((url, idx) => (
            <img key={idx} src={url} alt="" className="carousel-img" />
          ))}
        </div>

        {currIdx === 0 ? (
          ""
        ) : (
          <button className="carousel-btn left" onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            prevImg()
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: "12px",
                width: "12px",
                stroke: "currentColor",
                strokeWidth: 4,
                overflow: "visible",
              }}
            >
              <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" />
            </svg>
          </button>
        )}

        <button className="carousel-btn right" onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          nextImg()
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "none",
              height: "12px",
              width: "12px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
          >
            <path
              fill="none"
              d="M12 4 L23.3 15.3 A1 1 0 0 1 23.3 16.7 L12 28"
            />
          </svg>
        </button>
        <button className="like-btn" onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}>
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
          {stay.imgUrls.map((_, idx) => (
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
            {typeof stay?.reviews?.[0]?.rate === 'number'
              ? stay.reviews[0].rate.toFixed(1)
              : 'N/A'}
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
    
    </Link>
  );
}
