import { useState } from "react";

export function LoginMenu({ onClose, onBackToRegister }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
  }

  return (
    <div className="login-menu">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Log in to Airbnb</h2>

        <form onSubmit={handleSubmit}>
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
        </form>
        <button className="primary-btn">Login</button>

        <p className="back-to-register" onClick={onBackToRegister}>
          Go back to register page
        </p>
      </div>
    </div>
  );
}
