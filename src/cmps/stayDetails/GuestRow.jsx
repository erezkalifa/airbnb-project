
export function GuestRow({ label, description, value, onIncrement, onDecrement }) {
    return (
      <div className="guest-row">
        <div className="guest-info">
          <div className="guest-label">{label}</div>
          <div className="guest-desc">{description}</div>
        </div>
        <div className="guest-controls">
          <button onClick={onDecrement} disabled={value === 0}>−</button>
          <span>{value}</span>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }