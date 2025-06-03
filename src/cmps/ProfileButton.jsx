import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import { Avatar } from "./Avatar";
import { UserMenu } from "./UserMenu";
import { LoginSignup } from "./LoginSignup";

export function ProfileButton() {
  function useClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) return;
        handler();
      };

      document.addEventListener("mousedown", listener);
      return () => document.removeEventListener("mousedown", listener);
    }, [ref, handler]);
  }

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const loggedInUser = useSelector((storeState) => storeState.userModule.user);

  const menuRef = useRef();

  // Close menu on click outside
  useClickOutside(menuRef, () => setIsUserMenuOpen(false));

  // Close login/signup modal if user logs in
  useEffect(() => {
    if (loggedInUser) setIsAuthModalOpen(false);
  }, [loggedInUser]);

  return (
    <div className="profile" ref={menuRef} style={{ position: "relative" }}>
      <button
        className="profile-toggle"
        onClick={() => setIsUserMenuOpen((prev) => !prev)}
      >
        <img
          className="three-parallel"
          src="src/assets/img/Icons/three_lines.svg"
          alt="Menu Icon"
        />
        {loggedInUser && <Avatar url="src/assets/img/profile.jpg" />}
      </button>

      {isUserMenuOpen && (
        <div className="user-menu-wrapper">
          <UserMenu
            loggedInUser={loggedInUser}
            onCloseMenu={() => setIsUserMenuOpen(false)}
            onLoginClick={() => {
              setIsUserMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
          />
        </div>
      )}

      {isAuthModalOpen && (
        <LoginSignup onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
}
