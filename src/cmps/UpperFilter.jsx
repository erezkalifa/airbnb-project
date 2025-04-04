import { Avatar } from "./Avatar.jsx";
import { SmallFilter } from "./SmallFilter.jsx";
import { StaysExperiencesFilter } from "./StaysExpriencesFilter.jsx";

export function UpperFilter({ isAtTop }) {

  return (
    <section className="upper-header">
      <div className="logo">
        <a href="/">
          <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
        </a>
      </div>

      {isAtTop ? <StaysExperiencesFilter /> : <SmallFilter /> }
      
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
