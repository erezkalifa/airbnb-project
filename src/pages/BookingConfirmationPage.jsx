import { useLocation } from "react-router-dom";
import { reservationService } from "../services/reservation.service.js";

export function BookingConfirmationPage() {
  const location = useLocation();
  const { bookingData, stay } = location.state || {};

  if (!bookingData || !stay) return <div>Missing booking information.</div>;

  const {
    selectedRange,
    guests,
    nights,
    totalPrice,
    nightlyRate,
    cleaningFee,
    serviceFee,
  } = bookingData;

  function handleConfirm() {
    reservationService.save(bookingData);
    // Add success feedback or redirect here
  }

  return (
    <section className="booking-confirm-page">
      <h1>Confirm and pay</h1>

      <div className="booking-content">
        {/* LEFT SIDE */}
        <div className="booking-form">
          <div className="trip-section">
            <h2>Your trip</h2>
            <div className="trip-detail">
              <div className="label">Dates</div>
              <div className="value">
                {selectedRange.from?.toLocaleDateString()} – {selectedRange.to?.toLocaleDateString()}
              </div>
            </div>
            <div className="trip-detail">
              <div className="label">Guests</div>
              <div className="value">
                {guests.adults + guests.children + guests.infants + guests.pets} guests
              </div>
            </div>
          </div>

          <div className="payment-options">
            <h2>Choose how to pay</h2>
            <div className="payment-option-row">
              <div className="payment-option selected">Pay ₪{totalPrice} now</div>
              <button className="confirm-btn-inline" onClick={handleConfirm}>Confirm</button>
            </div>
            <div className="payment-option disabled">Installments coming soon</div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="price-summary">
          <div className="stay-preview">
            <img src={stay.imgUrls?.[0]} alt="Stay preview" />
            <div>
              <p className="stay-type">{stay.type}</p>
              <h3>{stay.name}</h3>
              <span>★ {stay.rating || 4.5} ({stay.reviews?.length || 0} reviews)</span>
            </div>
          </div>

          <div className="price-breakdown">
            <h4>Price details</h4>
            <div className="line-item">
              <span>₪{nightlyRate} x {nights} nights</span>
              <span>₪{nightlyRate * nights}</span>
            </div>
            <div className="line-item">
              <span>Cleaning fee</span>
              <span>₪{cleaningFee}</span>
            </div>
            <div className="line-item">
              <span>Service fee</span>
              <span>₪{serviceFee}</span>
            </div>
            <hr />
            <div className="line-item total">
              <strong>Total (ILS)</strong>
              <strong>₪{totalPrice}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="confirm-footer">
        <button className="confirm-btn" onClick={handleConfirm}>Confirm booking</button>
      </div>
    </section>
  );
}
