import {useState} from "react";
import CalendarRangePicker from ""

const OrderCard  ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  showCalendar,
  setShowCalendar,
  showGuests,
  setShowGuests,
  handleDateChange,
}) => {
  return (
    <div className="sticky">
      <div className="price">
        ₪362 <span>night</span>
      </div>

      <div className="selectors">
        <div
          className="date-field"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowGuests(false);
          }}
        >
          <div className="label">CHECK-IN</div>
          <div className="value">
            {checkIn ? checkIn.toLocaleDateString() : "Add date"}
          </div>
        </div>
        <div
          className="date-field"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowGuests(false);
          }}
        >
          <div className="label">CHECKOUT</div>
          <div className="value">
            {checkOut ? checkOut.toLocaleDateString() : "Add date"}
          </div>
        </div>
        <div
          className="guest-field"
          onClick={() => {
            setShowGuests(!showGuests);
            setShowCalendar(false);
          }}
        >
          <div className="label">GUESTS</div>
          <div className="value">1 guest</div>
        </div>
      </div>

      {showCalendar && (
        <div className="calendar-dropdown">
          <CalendarRangePicker onChange={handleDateChange} />
          <div className="calendar-actions">
            <button
              className="link-btn"
              onClick={() => {
                setCheckIn(null);
                setCheckOut(null);
              }}
            >
              Clear dates
            </button>
            <button className="close-btn" onClick={() => setShowCalendar(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showGuests && (
        <div className="guest-dropdown">
          {/* Your existing guest UI here */}
        </div>
      )}

      <button className="reserve-btn">Reserve</button>
      <p className="note">You won't be charged yet</p>

      <div className="fees">
        <div className="fee-row">
          <span>₪362 x 5 nights</span>
          <span>₪1,810</span>
        </div>
        <div className="fee-row">
          <span>Cleaning fee</span>
          <span>₪199</span>
        </div>
        <div className="fee-row">
          <span>Airbnb service fee</span>
          <span>₪284</span>
        </div>
        <hr />
        <div className="fee-row total">
          <span>Total</span>
          <span>₪2,293</span>
        </div>
      </div>
    </div>
  );
};

