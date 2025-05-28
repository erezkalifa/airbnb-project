import { NavLink } from "react-router-dom";

export function SideMenu() {
  return (
    <aside className="side-menu">
      <nav>
        <ul>
          <li>
            <NavLink to="/add">➕ Add Stay</NavLink>
          </li>
          <li>
            <NavLink to="my-stays">📁 My Stays</NavLink>
          </li>
          <li>
            <NavLink to="/orders">🧾 Orders</NavLink>
          </li>
          <li>
            <NavLink to="/rates">⭐ Rates</NavLink>
          </li>
        </ul>
      </nav>

      <div className="side-note">
        <img
          src="https://cdn-icons-png.flaticon.com/512/625/625631.png"
          alt="shield"
          className="note-icon"
        />
        <p className="note-title">Make All Payments Through Home & Go</p>
        <p className="note-desc">
          Always pay and communicate through Home & Go to ensure you're
          protected under our Terms of Service, cancellation, and other
          safeguards.
        </p>
      </div>
    </aside>
  );
}
