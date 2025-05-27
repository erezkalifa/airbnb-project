import { reservationService } from "../services/reservation.service.js";

export function BookingConfirmationModal({ onClose, stay, bookingData }) {
  console.log(bookingData);

  const {
    selectedRange,
    guests,
    nights,
    totalPrice,
    nightlyRate,
    cleaningFee,
    serviceFee,
  } = bookingData;

  return (
    <section className="BookingConfirmationModal">
      <div className="modal-overlay" onClick={onClose}>
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
                  <span>
                    {selectedRange.from?.toLocaleDateString()} -{" "}
                    {selectedRange.to?.toLocaleDateString()}
                  </span>
                </div>
                <div className="guests">
                  <span>
                    <strong>Guests</strong>
                  </span>
                  <span>
                    {guests.adults +
                      guests.children +
                      guests.infants +
                      guests.pets}{" "}
                    guests
                  </span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="text-btn" onClick={onClose}>
                  Close
                </button>
                <button
                  className="approve-btn"
                  onClick={() => {
                    const {
                      selectedRange,
                      guests,
                      nights,
                      totalPrice,
                      nightlyRate,
                      cleaningFee,
                      serviceFee,
                    } = bookingData;
                    reservationService.save(bookingData);
                    onClose();
                  }}
                >
                  Approve
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="booking-right">
              <div className="stay-card">
                <div className="card-profile">
                  <img src={stay.imgUrls?.[0]} alt="stay preview" />
                  <div className="stay-info">
                    <div>
                      <span className="stay-type">{stay.type}</span>
                      <p>{stay.name}</p>
                    </div>
                    <span className="rating">
                      ★ {stay.rating || 4.5} ({stay.reviews?.length || 0}{" "}
                      reviews)
                    </span>
                  </div>
                </div>

                <div className="price-details">
                  <h4>Price details</h4>
                  <div className="line-item">
                    <a href="#">
                      ₪{nightlyRate} x {nights} nights
                    </a>
                    <span>₪{nights * nightlyRate}</span>
                  </div>
                  <div className="line-item">
                    <a href="#">Service fee</a>
                    <span>₪{serviceFee}</span>
                  </div>
                  <hr />
                  <div className="line-item total">
                    <strong>Total</strong>
                    <strong>₪{totalPrice}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
