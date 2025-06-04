import { useNavigate } from "react-router-dom";
import { logout } from "../store/user/user.actions.js";

export function UserMenu({ loggedInUser, onLoginClick, onCloseMenu }) {
  const navigate = useNavigate();

  function handleMenuClick(menuItem) {
    switch (menuItem) {
      case "Wishlist":
        navigate("/wishlist");
        break;
      case "Trips":
        navigate("/trips");
        break;
      case "Listings":
        navigate("/listings");
        break;
      case "Reservations":
        navigate("/reservations");
        break;
      case "Add listing":
        navigate("/add-listings");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }

    if (menuItem !== "Logout") onCloseMenu();
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
            {[
              "Wishlist",
              "Trips",
              "Listings",
              "Reservations",
              "Add listing",
              "Logout",
            ].map((item) => (
              <div
                key={item}
                className="menu-item"
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </div>
            ))}
          </section>
        ) : (
          <>
            <div className="menu-item">My Trips</div>
            <div className="menu-item">My Wishlist</div>
            <div className="menu-item">Account Settings</div>
            <div className="menu-item">Messages</div>
            <div className="menu-item">Help Center</div>
            <button onClick={onLoginClick} className="button-unstyled">
              <div className="menu-item">Log in or sign up</div>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
