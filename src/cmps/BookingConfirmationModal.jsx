import { useState } from "react";

export function BookingConfirmationModal() {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <section className="BookingConfirmationModal">
      {/* <button className="open-btn" onClick={openModal}>
        Open Confirmation
      </button> */}

      {
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirmation</h2>

            <div className="booking-summary">
              {/* LEFT SIDE */}
              <div className="booking-left">
                <div className="highlight-box">
                  <p className="highlight-title">This is a rare find.</p>
                  <p>Kevin's place is usually booked.</p>
                  <span className="icon">💎</span>
                </div>

                <h3>Your Trip</h3>
                <div className="trip-details">
                  <div className="dates">
                    <span>
                      <strong>Dates</strong>
                    </span>
                    <span>Dec 27 - 29</span>
                  </div>
                  <div className="guests">
                    <span>
                      <strong>Guests</strong>
                    </span>
                    <span>0 guests</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="text-btn" onClick={closeModal}>
                    Close
                  </button>
                  <button className="approve-btn">Approve</button>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="booking-right">
                <div className="stay-card">
                  <div className="card-profile">
                    <img
                      src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg"
                      alt="stay preview"
                    />
                    <div className="stay-info">
                      <div>
                        <span className="stay-type">Apartment</span>
                        <p>Home, Sweet, Harlem. Welcome!</p>
                      </div>
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
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  );
}
