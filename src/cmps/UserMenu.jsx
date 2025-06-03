import { useNavigate } from "react-router-dom";
import { logout } from "../store/user/user.actions.js";

export function UserMenu({ loggedInUser, onLoginClick, onCloseMenu }) {
  const navigate = useNavigate();

  function goToBackOffice() {
    navigate("/backoffice");
  }

  async function handleLogout() {
    try {
      await logout();
      onCloseMenu();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <section className="user-menu">
      <div className="menu-dropdown">
        {loggedInUser ? (
          <section className="logged-user-menu">
            <div className="menu-item">Wishlist</div>
            <div className="menu-item">Trips</div>
            <div className="menu-item" onClick={goToBackOffice}>
              Back Office
            </div>
            <div className="menu-item" onClick={handleLogout}>
              Logout
            </div>
          </section>
        ) : (
          <>
            <div className="menu-item">My Trips</div>
            <div className="menu-item">My Wishlist</div>
            <div className="menu-item">Account Settings</div>
            <div className="menu-item">Messages</div>
            <div className="menu-item">Help Center</div>
            <button onClick={onLoginClick} className="button-unstyled">
              <div className="menu-item">Log in or sign up </div>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
