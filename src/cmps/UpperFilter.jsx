// import { Avatar } from "./Avatar.jsx";
// import { SmallFilter } from "./SmallFilter.jsx";
// import { StaysExperiencesFilter } from "./StaysExpriencesFilter.jsx";
// import { ProfileButton } from "./ProfileButton.jsx";

// export function UpperFilter({ isAtTop , onOpenFilter }) {
//   return (
//     <section className="upper-header">
//       {/* Logo */}
//       <div className="logo">
//         <a href="/">
//           <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
//         </a>
//       </div>

//       {/* Filter */}
//       {isAtTop ? <StaysExperiencesFilter /> : <SmallFilter onOpenFilter={onOpenFilter} />}
//       <ProfileButton />
//     </section>
//   );
// }
import { Avatar } from "./Avatar.jsx";
import { SmallFilter } from "./SmallFilter.jsx";
import { StaysExperiencesFilter } from "./StaysExpriencesFilter.jsx";
import { ProfileButton } from "./ProfileButton.jsx";

export function UpperFilter({ isAtTop, onOpenFilter }) {
  return (
    <section className="upper-header">
      <div className="logo">
        <a href="/">
          <img src="src/assets/img/logo-aircnc.png" alt="Aircnc Logo" />
          <span>aircnc</span>
        </a>
      </div>

      {/* Filter */}
      {isAtTop ? (
        <StaysExperiencesFilter />
      ) : (
        <SmallFilter onOpenFilter={onOpenFilter} />
      )}
      <ProfileButton />
    </section>
  );
}
