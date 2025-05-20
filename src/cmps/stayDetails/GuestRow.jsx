
export function GuestRow({ label, description, value, onIncrement, onDecrement }) {
    return (
      <div className="guest-row">
        <div className="guest-info">
          <div className="guest-label">{label}</div>
          <div className="guest-desc">{description}</div>
        </div>
        <div className="guest-controls">
          <button onClick={onDecrement}>
            <svg width="12" height="2" viewBox="0 0 12 2">
                <rect width="12" height="2" fill="currentColor" />
              </svg></button>
          <span>{value}</span>
          <button onClick={onIncrement}>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="2" />
            </svg></button>
        </div>
      </div>
    );
  }