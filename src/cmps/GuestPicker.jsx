import React, { useState , useEffect } from "react"

export function GuestPicker({ onGuestsChange, initialGuests = {} }) {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
    ...initialGuests,
  })

  const updateGuestCount = (type, change) => {
    setGuests(prev => {
      const updated = { ...prev, [type]: Math.max(0, prev[type] + change) }
      return updated
    })
  }

  useEffect(() => {
    onGuestsChange?.(guests)
  }, [guests])

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
              // disabled={guests[key] === 0}
              className="counter-btn"
            >
               <svg width="12" height="2" viewBox="0 0 12 2" xmlns="http://www.w3.org/2000/svg">
                <rect width="12" height="2" fill="currentColor" />
              </svg>
            </button>
            <span className="guest-count">{guests[key]}</span>
            <button
              onClick={() => updateGuestCount(key, 1)}
              className="counter-btn"
            >
               <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}