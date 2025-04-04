import React, { useState } from "react";

export function DateFlexibilityToggle() {
  const [selected, setSelected] = useState("± 7 days");

  const options = [
    "Exact dates",
    "± 1 day",
    "± 2 days",
    "± 3 days",
    "± 7 days",
    "± 14 days",
  ];

  return (
    <div className="flexibility-toggle-group">
      {options.map((option) => (
        <button
          key={option}
          className={`flexibility-btn ${selected === option ? "selected" : ""}`}
          onClick={() => setSelected(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
