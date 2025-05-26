import { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { UserMenu } from "./UserMenu";
import { LoginSignup } from "./LoginSignup";

export function ProfileButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile" ref={menuRef} style={{ position: "relative" }}>
      <button
        className="profile-toggle"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <img
          className="three-parallel"
          src="src/assets/img/Icons/three_lines.svg"
          alt="Menu Icon"
        />
        <Avatar url="src/assets/img/profile.jpg" />
      </button>

      {isMenuOpen && (
        <div className="user-menu-wrapper">
          <UserMenu
            onCloseMenu={() => setIsMenuOpen(false)}
            onLoginClick={() => {
              setIsMenuOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
        </div>
      )}

      {isLoginModalOpen && (
        <LoginSignup onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}
