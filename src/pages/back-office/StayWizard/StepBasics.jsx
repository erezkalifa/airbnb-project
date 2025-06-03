export function StepPlaceBasics({ basics = {}, onChange }) {
  const updateCount = (field, diff) => {
    const newValue = Math.max(0, (basics[field] || 0) + diff);
    onChange({ ...basics, [field]: newValue });
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
            <span>{basics[field] || 0}</span>
            <button onClick={() => updateCount(field, 1)}>+</button>
          </div>
        </div>
      ))}
    </section>
  );
}
