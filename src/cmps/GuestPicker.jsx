import React, { useState } from "react";

export function GuestPicker() {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const updateGuestCount = (type, change) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };

  const guestOptions = [
    {
      key: "adults",
      label: "Adults",
      sub: "Ages 13 or above",
    },
    {
      key: "children",
      label: "Children",
      sub: "Ages 2–12",
    },
    {
      key: "infants",
      label: "Infants",
      sub: "Under 2",
    },
    {
      key: "pets",
      label: "Pets",
      sub: <a href="#">Bringing a service animal?</a>,
    },
  ];

  return (
    <div className="guest-picker">
      {guestOptions.map(({ key, label, sub }) => (
        <div key={key} className="guest-row">
          <div className="guest-info">
            <div className="guest-label">{label}</div>
            <div className="guest-sub">{sub}</div>
          </div>
          <div className="guest-controls">
            <button
              onClick={() => updateGuestCount(key, -1)}
              disabled={guests[key] === 0}
              className="counter-btn"
            >
              –
            </button>
            <span className="guest-count">{guests[key]}</span>
            <button
              onClick={() => updateGuestCount(key, 1)}
              className="counter-btn"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
