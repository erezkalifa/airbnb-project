import { userService } from "../services/user.service";
import { useState } from "react";

export function LoginSignup({ onClose }) {
  const [userDetails, setUserDetails] = useState({});

  function handleInputChange(e) {
    const { id, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function onOverlayClick(e) {
    if (e.target.classList.contains("login-overlay")) {
      onClose();
    }
  }

  return (
    <section className="login-signup">
      <div className="login-overlay" onClick={onOverlayClick}>
        <div className="login-modal">
          <div className="modal-title">
            <div className="icon-wrapper" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="img"
                focusable="false"
                style={{
                  display: "block",
                  fill: "none",
                  height: "16px",
                  width: "16px",
                  stroke: "currentColor",
                  strokeWidth: 3,
                  overflow: "visible",
                  cursor: "pointer",
                }}
              >
                <path d="M6 6 L26 26 M26 6 L6 26" />
              </svg>
            </div>
            <div>Log in or sign up</div>
          </div>

          <div className="modal-body">
            <h2 className="welcome">Welcome to Airbnb</h2>
            <div className="form-control">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="full"
                id="fullname"
                placeholder="Enter Full Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-control">
              <label htmlFor="username">User Name</label>
              <input
                type="user"
                id="username"
                placeholder="Enter User Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={handleInputChange}
              />
            </div>

            <p className="disclaimer">
              We'll call or text you to confirm your number. Standard message
              and data rates apply. <a href="#">Privacy Policy</a>
            </p>

            <button
              className="primary-btn"
              onClick={() => userService.signup(userDetails)}
            >
              Continue
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="provider-btn">Continue As Guest</button>
            <button className="provider-btn">
              <span className="icon"></span>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
