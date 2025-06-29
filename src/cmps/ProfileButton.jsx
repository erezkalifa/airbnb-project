import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "./Avatar";
import { UserMenu } from "./UserMenu";
import { LoginSignup } from "./LoginSignup";
import { LoginMenu } from "./LoginMenu";

export function ProfileButton() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null / 'signup' / 'login'
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close auth modals if user logs in
  useEffect(() => {
    if (loggedInUser) setAuthMode(null);
  }, [loggedInUser]);

  const toggleMenu = () => {
    const profileBtn = document.querySelector(".profile-toggle");
    if (profileBtn) {
      const rect = profileBtn.getBoundingClientRect();
      const calculatedTop = rect.bottom + 8;
      const finalTop = Math.max(calculatedTop, 60);
      setMenuPosition({
        top: finalTop, // 8px gap
        right: window.innerWidth - rect.right,
      });
    }
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div className="profile" ref={menuRef}>
      <button className="profile-toggle" onClick={toggleMenu}>
        <img
          className="three-parallel"
          src="/img/Icons/three_lines.svg"
          alt="Menu Icon"
        />
        {loggedInUser && (
          <div className="name-letter">
            {loggedInUser.fullname.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {isUserMenuOpen && (
        <div
          className="user-menu-wrapper"
          style={{
            position: "fixed",
            top: `${menuPosition.top}px`,
            right: `${menuPosition.right}px`,
          }}
        >
          <UserMenu
            loggedInUser={loggedInUser}
            onCloseMenu={() => setIsUserMenuOpen(false)}
            onLoginClick={() => {
              setIsUserMenuOpen(false);
              setAuthMode("signup"); // Open signup menu
            }}
          />
        </div>
      )}

      {authMode === "signup" && (
        <LoginSignup
          onClose={() => setAuthMode(null)}
          onOpenLogin={() => setAuthMode("login")}
        />
      )}

      {authMode === "login" && (
        <LoginMenu
          onClose={() => setAuthMode(null)}
          onBackToRegister={() => setAuthMode("signup")}
        />
      )}
    </div>
  );
}
