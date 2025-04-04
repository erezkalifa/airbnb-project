import React, { useState } from "react";

export function DateToggleGroup() {
  const [active, setActive] = useState("Dates");

  const options = ["Dates", "Months", "Flexible"];

  return (
    <div className="toggle-group">
      {options.map((option) => (
        <button
          key={option}
          className={`toggle-btn ${active === option ? "active" : ""}`}
          onClick={() => setActive(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
