import { useState } from "react";

export function StepPlaceBasics() {
  const [counts, setCounts] = useState({
    guests: 1,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });

  const updateCount = (field, diff) => {
    setCounts((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + diff),
    }));
  };

  return (
    <section className="step-place-basics">
      <h2>Share some basics about your place</h2>
      <p>You'll add more details later</p>

      {["guests", "bedrooms", "beds", "bathrooms"].map((field) => (
        <div key={field} className="counter-row">
          <span className="label">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </span>
          <div className="counter-controls">
            <button onClick={() => updateCount(field, -1)}>-</button>
            <span>{counts[field]}</span>
            <button onClick={() => updateCount(field, 1)}>+</button>
          </div>
        </div>
      ))}
    </section>
  );
}
