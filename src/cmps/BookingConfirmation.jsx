// BookingConfirmationModal.jsx
import { useState } from "react";
import "./BookingConfirmationModal.css";

export function BookingConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="open-btn" onClick={openModal}>
        Open Confirmation
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirmation</h2>

            <div className="highlight-box">
              <p className="highlight-title">This is a rare find.</p>
              <p>Kevin's place is usually booked.</p>
              <span className="icon">💎</span>
            </div>

            <h3>Your Trip</h3>
            <div className="trip-details">
              <div>
                <strong>Dates</strong>
                <p>Dec 27 - 29</p>
              </div>
              <div>
                <strong>Guests</strong>
                <p>0 guests</p>
              </div>
            </div>

            <div className="booking-summary">
              <div className="stay-card">
                <img
                  src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg"
                  alt="stay preview"
                />
                <div className="stay-info">
                  <span className="stay-type">Apartment</span>
                  <p>Home, Sweet, Harlem. Welcome!</p>
                  <span className="rating">★ 4.5 (20 reviews)</span>
                </div>
              </div>

              <div className="price-details">
                <h4>Price details</h4>
                <div className="line-item">
                  <a href="#">$110 x 2 nights</a>
                  <span>$220</span>
                </div>
                <div className="line-item">
                  <a href="#">Service fee</a>
                  <span>$24</span>
                </div>
                <hr />
                <div className="line-item total">
                  <strong>Total</strong>
                  <strong>$244</strong>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="text-btn" onClick={closeModal}>
                Close
              </button>
              <button className="approve-btn">Approve</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
