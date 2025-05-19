import { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { UserMenu } from "./UserMenu";

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="profile" ref={menuRef} style={{ position: "relative" }}>
      <button
        className="profile-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          className="three-parallel"
          src="src/assets/img/Icons/three_lines.svg"
          alt="Menu Icon"
        />
        <Avatar url="src/assets/img/profile.jpg" />
      </button>

      {isOpen && (
        <div className="user-menu-wrapper">
          <UserMenu />
        </div>
      )}
    </div>
  );
}
