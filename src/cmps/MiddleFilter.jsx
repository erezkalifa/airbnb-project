export function MiddleFilter() {
  return (
    <section className="middle-filter">
      <div className="search-box">
        <div className="section">
          Where
          <span>Search destinations</span>
        </div>
        <div className="section">
          Check in
          <span>Add dates</span>
        </div>
        <div className="section">
          Check out
          <span>Add dates</span>
        </div>
        <div className="section">
          Who
          <span>Add guests</span>
        </div>
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
