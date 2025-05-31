import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { GuestRow } from "./GuestRow.jsx";
import { useNavigate } from "react-router-dom"

import "react-day-picker/dist/style.css";

export function OrderCard({ stay, onReserveClick }) {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  const [isDatesModal, setIsDatesModal] = useState(false);
  const [isGuestsModal, setIsGuestsModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const navigate = useNavigate();

  const calculateNights = (from, to) => {
    if (!from || !to) return 0;
    const diffTime = Math.abs(to - from);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nightlyRate = stay?.price || 0;
  const nights = calculateNights(selectedRange.from, selectedRange.to);
  const cleaningFee = 199;
  const serviceFee = 284;
  const totalPrice = nights * nightlyRate + cleaningFee + serviceFee;

  return (
    <div className="order-card-wrapper">
      <div className="sticky-order-card">
        <div className="price">
          ₪{nightlyRate} <span>night</span>
        </div>

        <div className="selectors">
          <div className="date-range-group">
            <div className="date-field" onClick={() => setIsDatesModal(!isDatesModal)}>
              <div className="label">CHECK-IN</div>
              <div className="value">{selectedRange.from ? selectedRange.from.toLocaleDateString() : "Add date"}</div>
            </div>
            <div className="date-field" onClick={() => setIsDatesModal(!isDatesModal)}>
              <div className="label">CHECKOUT</div>
              <div className="value">{selectedRange.to ? selectedRange.to.toLocaleDateString() : "Add date"}</div>
            </div>
          </div>

          {isDatesModal && (
            <div className="date-picker-popup" onClick={(e) => e.stopPropagation()}>
              {/* Embedded duplicate */}
              <div className="date-range-group inside-modal">
                <div className="date-field">
                  <div className="label">CHECK-IN</div>
                  <div className="value">{selectedRange.from ? selectedRange.from.toLocaleDateString() : "Add date"}</div>
                </div>
                <div className="date-field">
                  <div className="label">CHECKOUT</div>
                  <div className="value">{selectedRange.to ? selectedRange.to.toLocaleDateString() : "Add date"}</div>
                </div>
              </div>

              <div className="calendar-header">
                <h2>{selectedRange.from && selectedRange.to ? `${nights} nights` : "Select your stay"}</h2>
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
                  modifiers={{ disabled: [{ before: new Date() }] }}
                />
              </div>
              <div className="calendar-actions">
                <button className="link-btn" onClick={(e) => { e.stopPropagation(); setSelectedRange({ from: null, to: null }); }}>Clear dates</button>
                <button className="close-btn" onClick={(e) => { e.stopPropagation(); setIsDatesModal(false); }}>Close</button>
              </div>
            </div>
          )}

          <div className="guest-field" onClick={() => setIsGuestsModal(!isGuestsModal)}>
            <div className="label">GUESTS</div>
            <div className="guest-row-content">
              <div className="value">
                {guests.adults + guests.children + guests.infants + guests.pets} guest
                {guests.adults + guests.children + guests.infants + guests.pets !== 1 ? "s" : ""}
              </div>
              <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false">
                <path fill="none" d="M6 10l10 10 10-10" />
              </svg>
            </div>

            {isGuestsModal && (
              <div className="guest-picker-popup" onClick={(e) => e.stopPropagation()}>
                <GuestRow label="Adults" description="Age 13+" value={guests.adults}
                  onIncrement={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                  onDecrement={() => setGuests(prev => ({ ...prev, adults: Math.max(prev.adults - 1, 1) }))}
                />
                <GuestRow label="Children" description="Ages 2–12" value={guests.children}
                  onIncrement={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                  onDecrement={() => setGuests(prev => ({ ...prev, children: Math.max(prev.children - 1, 0) }))}
                />
                <GuestRow label="Infants" description="Under 2" value={guests.infants}
                  onIncrement={() => setGuests(prev => ({ ...prev, infants: prev.infants + 1 }))}
                  onDecrement={() => setGuests(prev => ({ ...prev, infants: Math.max(prev.infants - 1, 0) }))}
                />
                <GuestRow label="Pets" description={<a href="#">Bringing a service animal?</a>} value={guests.pets}
                  onIncrement={() => setGuests(prev => ({ ...prev, pets: prev.pets + 1 }))}
                  onDecrement={() => setGuests(prev => ({ ...prev, pets: Math.max(prev.pets - 1, 0) }))}
                />
                <p className="guest-note">This place has a maximum of 15 guests, not including infants. If you're bringing more than 2 pets, please let your host know.</p>
                <button className="close-btn" onClick={() => setIsGuestsModal(false)}>Close</button>
              </div>
            )}
          </div>
        </div>

        <button className="reserve-btn" onClick={() => {
          // onReserveClick({ selectedRange, guests, nights, totalPrice, nightlyRate, 
          //   cleaningFee, serviceFee })
            const bookingData = {
              selectedRange,
              guests,
              nights,
              totalPrice,
              nightlyRate,
              cleaningFee,
              serviceFee,
            }
          navigate("/booking-confirmation", { state: { bookingData, stay } })
        }}>
          Reserve
        </button>

        <p className="note">You won't be charged yet</p>

        <div className="fees">
          <div className="fee-row"><span>₪{nightlyRate} x {nights || 0} nights</span><span>₪{nights * nightlyRate || 0}</span></div>
          <div className="fee-row"><span>Cleaning fee</span><span>₪{cleaningFee}</span></div>
          <div className="fee-row"><span>Airbnb service fee</span><span>₪{serviceFee}</span></div>
          <hr />
          <div className="fee-row total"><span>Total</span><span>₪{totalPrice || 0}</span></div>
        </div>
      </div>
    </div>
  )
}
