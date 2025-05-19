import { Avatar } from "./Avatar.jsx";
import { SmallFilter } from "./SmallFilter.jsx";
import { StaysExperiencesFilter } from "./StaysExpriencesFilter.jsx";
import { ProfileButton } from "./ProfileButton.jsx";

export function UpperFilter({ isAtTop }) {
  return (
    <section className="upper-header">
      {/* Logo */}
      <div className="logo">
        <a href="/">
          <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
        </a>
      </div>

      {/* Filter */}
      {isAtTop ? <StaysExperiencesFilter /> : <SmallFilter />}
      <ProfileButton />
    </section>
  );
}
