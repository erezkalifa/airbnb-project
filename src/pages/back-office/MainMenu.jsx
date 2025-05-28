import { InfoItem } from "../../cmps/InfoItem.jsx";

const mockAmenities = [
  "City skyline view",
  "Hair dryer",
  "Cleaning products",
  "Stainless steel oven",
  "Shampoo",
  "Hot water",
  "Washer",
  "Essentials",
  "Bed linens",
  "Room-darkening shades",
  "Iron",
  "Drying rack for clothing",
  "TV",
  "Crib - available upon request",
  "High chair",
  "Air conditioning",
  "Central heating",
  "Smoke alarm",
  "Wifi",
  "Dedicated workspace",
  "Kitchen",
  "Dishes and silverware",
  "Body soap",
  "Freezer",
  "Induction stove",
];

export function MainMenu() {
  return (
    <section className="main-menu">
      {/* Top metrics section */}
      <div className="dashboard-metrics">
        <div className="metric-card">
          <span className="metric-title">Total Rate</span>
          <div className="metric-value-change">
            <span className="metric-value">★ 0</span>
            <span className="metric-change">2% ↑</span>
          </div>
        </div>
        <div className="metric-card">
          <span className="metric-title">Monthly Earning</span>
          <span className="metric-value">$0</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Orders</span>
          <div className="metric-value-change">
            <span className="metric-value">0</span>
            <div className="metric-dots">
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="dot red"></span>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <span className="metric-title">Active Guests</span>
          <span className="metric-value">0</span>
        </div>
      </div>

      {/* Bottom section including stay info, images, and amenities */}
      <div className="bottom-dashboard">
        <div className="stay-title">Stay Name</div>

        {/* Info row */}
        <div className="info">
          <div className="left-section">
            <span className="star">★</span>
            <span className="new">New</span>
            <span className="reviews">(0 Reviews)</span>
            <span>•</span>
            <span className="address">Address</span>
          </div>
          <div className="right-section">
            <div className="action-item">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M27 18v9c0 1.1046-.8954 2-2 2H7c-1.1046 0-2-.8954-2-2v-9M16 3v21M6 14l9.2929-9.2929c.3905-.3905 1.0237-.3905 1.4142 0L26 14"
                  fill="none"
                />
              </svg>
              <span className="action-text">share</span>
            </div>
            <div className="action-item">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"
                  fill="none"
                />
              </svg>
              <span className="action-text">save</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="img-section">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className={`grid-img img${num}`}>
              <img
                src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
                alt="stay"
              />
            </div>
          ))}
        </div>

        {/* Info Items */}
        <div className="info-item">
          <InfoItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "24px",
                  width: "24px",
                  fill: "currentcolor",
                }}
              >
                <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path>
              </svg>
            }
            title="Exceptional check-in experience"
            description="Recent guests gave the check-in process a 5-star rating."
          />
          <InfoItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "24px",
                  width: "24px",
                  fill: "currentcolor",
                }}
              >
                <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            }
            title="Unbeatable location"
            description="100% of guests in the past year gave this location a 5-star rating."
          />
          <InfoItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "24px",
                  width: "24px",
                  fill: "currentcolor",
                }}
              >
                <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />
              </svg>
            }
            title="Dive right in"
            description="This is one of the few places in the area with a pool."
          />
        </div>

        {/* Description */}
        <div className="desc">
          <span>Description</span>
          <label htmlFor="description"></label>
          <textarea id="description" name="description"></textarea>
        </div>

        {/* Amenities */}
        <div className="amenities-grid">
          {mockAmenities.map((amenity) => (
            <div className="amenity" key={amenity}>
              <input type="checkbox" name="features" value={amenity} />
              <label>{amenity}</label>
            </div>
          ))}
        </div>
        <button className="primary-btn narrow-btn">Save</button>
      </div>
    </section>
  );
}
