import { useState } from "react";
import { Avatar } from "./Avatar.jsx";
import { SmallFilter } from "./SmallFilter.jsx";

export function UpperFilter() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  //const [isScrolling, setIsScrolling] = useState(false);

  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  // addEventListener("scroll", (event) => {
  //   console.log(event);
  // });

  return (
    <section className="upper-header">
      <div className="logo">
        <a href="/">
          <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
        </a>
      </div>

      <SmallFilter />

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
          <img
            className="three-parallel"
            src="src/assets/img/Icons/three_lines.svg"
            alt="Icon"
          />
          <Avatar url="src/assets/img/profile.jpg" />
        </button>
      </div>
    </section>
  );
}
