import { useState } from "react";
import { login } from "../store/user/user.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function LoginMenu({ onClose, onBackToRegister }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function handleLogin(ev) {
    ev.preventDefault();
    await login(credentials);
    showSuccessMsg(`Welcome back ${credentials.username}`);
  }

  return (
    <div className="login-menu">
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
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Log in to Airbnb</h2>

        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="primary-btn">Login</button>
        </form>

        <p className="back-to-register" onClick={onBackToRegister}>
          Go back to register page
        </p>
      </div>
    </div>
  );
}
