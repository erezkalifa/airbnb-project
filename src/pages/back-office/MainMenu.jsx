export function MainMenu() {
  return (
    <section className="main-menu">
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
      <div className="bottom-dashboard">
        <div className="stay-title">Stay Name</div>
        <div className="stay-info">
          <div className="left-section">
            <span className="star">★</span>
            <span className="new">New</span>
            <span className="reviews">(0 Reviews)</span>
            <span>•</span>
            <span className="address ">Address</span>
          </div>
          <div className="right-section">
            <div className="action-item">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
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
                aria-hidden="true"
                role="presentation"
                focusable="false"
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
        <div className="img-section">
          <img
            className="img1"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
          />

          <img
            className="img2"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
          />

          <img
            className="img3"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
          />

          <img
            className="img4"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
          />

          <img
            className="img5"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-1196451576617675144/original/ccda7793-d09d-40f6-aa13-40f1ebc19759.jpeg?im_w=1200"
          />
        </div>

        <div className="propery-info">
          <div className="capacity">
            <span>Capacity</span>
            <input type="text" class="underline-input" />
          </div>
        </div>
      </div>
    </section>
  );
}
