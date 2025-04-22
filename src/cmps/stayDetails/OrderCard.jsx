import { useState , useRef,useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { GuestRow } from "./GuestRow.jsx";


export function OrderCard() {
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isDatesModal, setIsDatesModal] = useState(false);
  const [isGuestsModal, setIsGuestsModal] = useState(false);
  const [modalPosition, setModalPosition] = useState(null);
  const [guestModalPosition, setGuestModalPosition] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });

  const calculateNights = (from, to) => {
    if (!from || !to) return 0;
    const diffTime = Math.abs(to - from);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const dateFieldsRef = useRef(null);
  const guestFieldRef = useRef(null);
  const popupRef = useRef(null);
  const guestPopupRef = useRef(null);

 

  useEffect(() => {
    if (isDatesModal && dateFieldsRef.current) {
      const parentEl = dateFieldsRef.current.offsetParent;
      const triggerBox = dateFieldsRef.current.getBoundingClientRect();
      const parentBox = parentEl.getBoundingClientRect();

      setModalPosition({
        top: triggerBox.bottom - parentBox.top + 8,
        left: triggerBox.left - parentBox.left - 10,
      });
    }
  }, [isDatesModal]);

  useEffect(() => {
    if (isGuestsModal && guestFieldRef.current) {
      const parentEl = guestFieldRef.current.offsetParent;
      const triggerBox = guestFieldRef.current.getBoundingClientRect();
      const parentBox = parentEl.getBoundingClientRect();

      setGuestModalPosition({
        top: triggerBox.bottom - parentBox.top + 8,
        left: triggerBox.left - parentBox.left,
      });
    }
  }, [isGuestsModal]);

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

          <div className="guest-field" ref={guestFieldRef} onClick={() => setIsGuestsModal(true)}>
            <div className="label">GUESTS</div>
            <div className="value">
              {guests.adults + guests.children + guests.infants + guests.pets} guest
              {guests.adults + guests.children + guests.infants + guests.pets !== 1 ? "s" : ""}
            </div>
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
          <div className="calendar-header">
            <h2>
              {selectedRange.from && selectedRange.to
                ? `${calculateNights(selectedRange.from, selectedRange.to)} nights`
                : "Select your stay"}
            </h2>
            <p>
              {selectedRange.from?.toLocaleDateString() || "Check-in"} – {selectedRange.to?.toLocaleDateString() || "Check-out"}
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
            <button className="link-btn" onClick={() => setSelectedRange({ from: null, to: null })}>
              Clear dates
            </button>
            <button className="close-btn" onClick={() => setIsDatesModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {isGuestsModal && guestModalPosition && (
        <div
          className="guest-picker-popup"
          ref={guestPopupRef}
          style={{
            position: "absolute",
            top: `${guestModalPosition.top}px`,
            left: `${guestModalPosition.left}px`,
            zIndex: 999,
          }}
        >
          <GuestRow
            label="Adults"
            description="Age 13+"
            value={guests.adults}
            onIncrement={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
            onDecrement={() => setGuests(prev => ({ ...prev, adults: Math.max(prev.adults - 1, 1) }))}
          />
          <GuestRow
            label="Children"
            description="Ages 2–12"
            value={guests.children}
            onIncrement={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
            onDecrement={() => setGuests(prev => ({ ...prev, children: Math.max(prev.children - 1, 0) }))}
          />
          <GuestRow
            label="Infants"
            description="Under 2"
            value={guests.infants}
            onIncrement={() => setGuests(prev => ({ ...prev, infants: prev.infants + 1 }))}
            onDecrement={() => setGuests(prev => ({ ...prev, infants: Math.max(prev.infants - 1, 0) }))}
          />
          <GuestRow
            label="Pets"
            description={<a href="#">Bringing a service animal?</a>}
            value={guests.pets}
            onIncrement={() => setGuests(prev => ({ ...prev, pets: prev.pets + 1 }))}
            onDecrement={() => setGuests(prev => ({ ...prev, pets: Math.max(prev.pets - 1, 0) }))}
          />
          <p className="guest-note">
            This place has a maximum of 15 guests, not including infants. If you're bringing more than 2 pets, please let your host know.
          </p>
          <button className="close-btn" onClick={() => setIsGuestsModal(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}