import { useEffect, useState } from "react";
import { stayService } from "../../services/stay.service.js";
import { useSelector } from "react-redux";

export function MyStays() {
  const sampleStay = {
    _id: "622f337a75c7d36e498aaafb",
    name: "Fresh and modern 1BR in Bed-Stuy",
    imgUrls: [
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
    ],
    price: 79,
    isActive: true,
    loc: {
      city: "New York",
      country: "United States",
    },
    reviews: [
      { txt: "Amazing place!" },
      { txt: "Super clean." },
      { txt: "Great location." },
    ],
  };

  return (
    <section className="my-stays-page">
      <h2 className="section-title">My Stays</h2>
      <div className="stays-grid">
        <div className="stay-card">
          <div className="img">
            <img
              src={sampleStay.imgUrls[0]}
              alt="Stay preview"
              className="stay-img"
            />
          </div>
          <div className="stays-details">
            <div className="stay-header">
              <h3 className="stay-title">{sampleStay.name}</h3>
              <p className="stay-location">
                {sampleStay.loc.city}, {sampleStay.loc.country}
              </p>
            </div>
            <div className="stay-info">
              <p className="stay-price">${sampleStay.price} / night</p>
              <p
                className={`stay-status ${
                  sampleStay.isActive ? "active" : "inactive"
                }`}
              >
                {sampleStay.isActive ? "Active" : "Inactive"}
              </p>
              <p className="stay-orders">{sampleStay.reviews.length} Orders</p>
            </div>
            <div className="stay-actions">
              <button className="primary-btn">Update</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
