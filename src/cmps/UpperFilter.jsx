import { useState } from "react";
import { Avatar } from "./Avatar.jsx"


export function UpperFilter() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="upper-header">
      <div className="logo">
        <a href="/">
          <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
        </a>
      </div>
      <div className="categories">
        <span className="btn-wrapper">
          <button
            className={selectedCategory === "Stays" ? "selected" : ""}
            onClick={() => handleSelect("Stays")}
          >
            Stays
          </button>
        </span>
        <span className="btn-wrapper">
          <button
            className={selectedCategory === "Experiences" ? "selected" : ""}
            onClick={() => handleSelect("Experiences")}
          >
            Experiences
          </button>
        </span>
      </div>
      <div className="profile">
        <button>
            <img src="src/assets/img/Icons/three_lines.svg" alt="Icon" />
            <Avatar url="src/assets/img/profile.jpg"/>
        </button>
      </div>
    </section>
  );
}
