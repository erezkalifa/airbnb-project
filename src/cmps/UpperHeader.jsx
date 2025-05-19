// import { useState, useEffect, useRef } from "react";
// import { Avatar } from "./Avatar.jsx";
// import { UserMenu } from "./UserMenu.jsx";
// import { ProfileButton } from "./ProfileButton.jsx";

// export function UpperHeader() {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const menuRef = useRef();

//   // useEffect(() => {
//   //   function handleClickOutside(event) {
//   //     if (menuRef.current && !menuRef.current.contains(event.target)) {
//   //       setIsMenuOpen(false);
//   //     }
//   //   }

//   //   document.addEventListener("click", handleClickOutside);
//   //   return () => document.removeEventListener("click", handleClickOutside);
//   // }, []);

//   // const handleSelect = (category) => {
//   //   setSelectedCategory(category);
//   // };

//   return (
//     <section className="upper-header">
//       <div className="logo">
//         <a href="/">
//           <img src="src/assets/img/logo-with-text.svg" alt="Logo" />
//         </a>
//       </div>

//       <div className="categories">
//         <span className="btn-wrapper">
//           <button
//             className={selectedCategory === "Stays" ? "selected" : ""}
//             onClick={() => handleSelect("Stays")}
//           >
//             Stays
//           </button>
//         </span>
//         <span className="btn-wrapper">
//           <button
//             className={selectedCategory === "Experiences" ? "selected" : ""}
//             onClick={() => handleSelect("Experiences")}
//           >
//             Experiences
//           </button>
//         </span>
//       </div>
//     </section>
//   );
// }
