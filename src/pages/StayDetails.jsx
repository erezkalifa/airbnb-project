import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { stayService } from "../services/stay.service.js"
import { UpperFilter } from "../cmps/UpperFilter.jsx"
import { MiddleFilter } from "../cmps/MiddleFilter.jsx"
import { OrderCard } from "../cmps/stayDetails/OrderCard.jsx"
import { BookingConfirmationModal } from "../cmps/BookingConfirmationModal.jsx"
import { RatingSummary } from "../cmps/stayDetails/RatingSummary.jsx"
import {MapView} from "../cmps/MapView.jsx"

export function StayDetails() {
  const { stayId } = useParams();
  const [stay, setStay] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [isStickyActive, setIsStickyActive] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const ratingRef = useRef(null);

  useEffect(() => {
    stayService.getById(stayId).then(setStay);
  }, [stayId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStickyActive(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );
    if (ratingRef.current) observer.observe(ratingRef.current);
    return () => observer.disconnect();
  }, []);

  if (!stay) return <div>Loading...</div>;

  const amenitiesToShow = showAllAmenities
    ? stay.amenities
    : stay.amenities.slice(0, 10);

  return (
    <section className="stay-details">
      <UpperFilter isAtTop={true} />
      <MiddleFilter
        filterBy={{}}
        onSetFilter={() => {}} 
        isSticky = {false}
      />
      <div className="stay-title-container">
          <h1 className="stay-title-details">{stay?.title}</h1>
      </div>
      <div className="container">
        <div className="stay-gallery">
          <div className="img-grid">
            {stay.imgUrls.slice(0, 5).map((url, idx) => (
              <div key={idx} className={`grid-img img${idx + 1}`}>
                <img src={url} alt={`stay image ${idx + 1}`} />
                {idx === 4 && (
                  <button className="show-all-btn">Show all photos</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="middle-section">
          <div className="main-content">
            <div className="place-details">
              <div className="place">
                {stay.name} in {stay.loc.city}, {stay.loc.country}
              </div>
              <div className="guests">
                {stay.capacity} guests · {stay.bedrooms} bedroom
                {stay.bedrooms !== 1 && "s"} · {stay.bathrooms} bath
                {stay.bathrooms !== 1 && "s"}
              </div>
              <div className="rate">
                ★ 5.0 · {stay.reviews?.length || 0} reviews
              </div>
            </div>

            <div className="host-info">
              <img
                className="host-avatar"
                src={stay.host?.pictureUrl}
                alt={stay.host?.fullname}
              />
              <div className="host-text">
                <div className="hosted-by">
                  Hosted by <strong>{stay.host?.fullname}</strong>
                </div>
                <div className="host-meta">
                  <span className="superhost">Superhost</span>
                  <span className="dot">·</span>
                  <span className="months">6 months hosting</span>
                </div>
              </div>
            </div>

            {stay.extraInfo?.map((info, idx) => (
              <div key={idx} className="extra-info">
                <div
                  className="key-svg"
                  dangerouslySetInnerHTML={{ __html: info.svg }}
                />
                <div className="top-text">{info.name}</div>
              </div>
            ))}

            <div className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {amenitiesToShow.map((amenity, idx) => (
                  <div key={idx} className="amenity-item">
                    <span
                      className="amenity-icon"
                      dangerouslySetInnerHTML={{ __html: amenity.svg }}
                    ></span>
                    <span className="amenity-label">{amenity.name}</span>
                  </div>
                ))}
              </div>
              {stay.amenities.length > 10 && (
                <button
                  className="show-all-btn"
                  onClick={() => setShowAllAmenities((prev) => !prev)}
                >
                  {showAllAmenities
                    ? "Hide some amenities"
                    : `Show all ${stay.amenities.length} amenities`}
                </button>
              )}
            </div>
          </div>

          <div
            className={`order-card-wrapper ${isStickyActive ? "sticky" : ""}`}
          >
            <OrderCard
              stay={stay}
              onReserveClick={(data) => {
                setBookingData(data);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>

        <RatingSummary stay={stay} ref={ratingRef} />

        {stay.reviews?.length > 0 && (
          <div className="reviews-section">
            <h2>What guests are saying</h2>
            <div className="review-grid">
              {(showAllReviews ? stay.reviews : stay.reviews.slice(0, 6)).map(
                (review, idx) => (
                  <div key={idx} className="review-card">
                    <div className="review-header">
                      <img
                        className="review-avatar"
                        src={
                          review.by.imgUrl ||
                          `https://i.pravatar.cc/40?u=${review.by._id}`
                        }
                        alt={review.by.fullname}
                      />
                      <div className="review-meta">
                        <div className="review-name">{review.by.fullname}</div>
                        <div className="review-country">Israel</div>
                      </div>
                    </div>
                    <div className="review-date">
                      ★★★★★ ·{" "}
                      {new Date(review.at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </div>
                    <div className="review-text">{review.txt}</div>
                  </div>
                )
              )}
            </div>
            {!showAllReviews && stay.reviews.length > 6 && (
              <button
                className="show-all-btn"
                onClick={() => setShowAllReviews(true)}
              >
                Show all {stay.reviews.length} reviews
              </button>
            )}
          </div>
        )}
        <div className="map">
          <h2>Where you'll be</h2>
          <MapView stay={stay} />
        </div>
      </div>

      {isModalOpen && bookingData && (
        <BookingConfirmationModal
          onClose={() => setIsModalOpen(false)}
          stay={stay}
          bookingData={bookingData}
        />
      )}
    </section>
  );
}
