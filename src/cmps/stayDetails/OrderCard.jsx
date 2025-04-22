import { useState , useRef,useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function OrderCard() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [isDatesModal, setIsDatesModal] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

  const calculateNights = (from, to) => {
    if (!from || !to) return 0;
    const diffTime = Math.abs(to - from);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const dateFieldsRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (isDatesModal && dateFieldsRef.current) {
      const parentEl = dateFieldsRef.current.offsetParent;
      const triggerBox = dateFieldsRef.current.getBoundingClientRect();
      const parentBox = parentEl.getBoundingClientRect();
  
      setModalPosition({
        top: triggerBox.bottom - parentBox.top + 8, // + spacing
        left: triggerBox.left - parentBox.left - 10,
      });
    }
  }, [isDatesModal])

  return (
    <div className="order-card-wrapper">
      <div className="sticky">
        <div className="price">
          ₪362 <span>night</span>
        </div>

        <div className="selectors">
          <div className="date-range-group" ref={dateFieldsRef}>
            <div className="date-field" onClick={() => setIsDatesModal(true)}>
              <div className="label">CHECK-IN</div>
              <div className="value">
                {selectedRange.from
                  ? selectedRange.from.toLocaleDateString()
                  : "Add date"}
              </div>
            </div>
            <div className="date-field" onClick={() => setIsDatesModal(true)}>
              <div className="label">CHECKOUT</div>
              <div className="value">
                {selectedRange.to
                  ? selectedRange.to.toLocaleDateString()
                  : "Add date"}
              </div>
            </div>
          </div>

          <div className="guest-field">
            <div className="label">GUESTS</div>
            <div className="value">1 guest</div>
          </div>
        </div>

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

      {isDatesModal && modalPosition && (
        <div
          className="date-picker-popup"
          ref={popupRef}
          style={{
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            zIndex: 999,
          }}
        >
          {/* Optional header */}
          <div className="calendar-header">
            <h2>
              {selectedRange.from && selectedRange.to
                ? `${calculateNights(selectedRange.from, selectedRange.to)} nights`
                : "Select your stay"}
            </h2>
            <p>
              {selectedRange.from?.toLocaleDateString() || "Check-in"} –{" "}
              {selectedRange.to?.toLocaleDateString() || "Check-out"}
            </p>
          </div>
          <div className="calendar-body">
          <DayPicker
            mode="range"
            numberOfMonths={2}
            selected={selectedRange}
            onDayClick={(date) => {
              if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
                setSelectedRange({ from: date, to: null });
              } else {
                setSelectedRange({ ...selectedRange, to: date });
                setIsDatesModal(false);
              }
            }}
            modifiers={{
              disabled: [{ before: new Date() }],
            }}
          />
          </div>

          <div className="calendar-actions">
            <button
              className="link-btn"
              onClick={() => setSelectedRange({ from: null, to: null })}
            >
              Clear dates</button>
            <button className="close-btn" onClick={() => setIsDatesModal(false)}>
              Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
