// import { useState, useEffect } from "react";
// import { UpperFilter } from "../cmps/UpperFilter.jsx";
// import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
// import { MobileFilter } from "../cmps/MobileFilter.jsx";
// import useIsMobile from "../hooks/useIsMobile";
// import useScrollTop from "../hooks/useScrollTop.jsx";

// export function Filters({ filterBy, onSetFilter }) {
//   const isMobile = useIsMobile();
//   const isAtTop = useScrollTop();

//   const [isMiddleFilterOpen, setIsMiddleFilterOpen] = useState(isAtTop);

//   const handleOpenFilter = () => {
//     console.log("Opening middle filter");
//     setIsMiddleFilterOpen(true);
//   };

//   useEffect(() => {
//     if (isAtTop) setIsMiddleFilterOpen(true);
//   }, [isAtTop]);


//   return (
//     <>
//       {isMobile ? (
//         <MobileFilter filterBy={filterBy} onSetFilter={onSetFilter} />
//       ) : (
//         <>
//           <UpperFilter
//             isAtTop={isAtTop}
//             filterBy={filterBy}
//             onSetFilter={onSetFilter}
//             onOpenFilter={handleOpenFilter}
//           />
//           {(isAtTop || isMiddleFilterOpen) && (<MiddleFilter
//                       filterBy={filterBy}
//                       onSetFilter={onSetFilter}/>) }
//         </>
//       )}
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { UpperFilter } from "../cmps/UpperFilter.jsx";
import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
import { MobileFilter } from "../cmps/MobileFilter.jsx";
import useIsMobile from "../hooks/useIsMobile";
import useScrollTop from "../hooks/useScrollTop.jsx";

export function Filters({ filterBy, onSetFilter }) {
  const isMobile = useIsMobile();
  const isAtTop = useScrollTop();

  const [isMiddleFilterOpen, setIsMiddleFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsMiddleFilterOpen(true);
  };

  useEffect(() => {
    // When scrolling to top, MiddleFilter is always visible
    if (isAtTop) {
      setIsMiddleFilterOpen(true);
    } else {
      setIsMiddleFilterOpen(false); // hide it when scrolling down
    }
  }, [isAtTop]);

  return (
    <>
      {isMobile ? (
        <MobileFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      ) : (
        <>
          <UpperFilter
            isAtTop={isAtTop}
            filterBy={filterBy}
            onSetFilter={onSetFilter}
            onOpenFilter={handleOpenFilter}
          />
          {(!isAtTop && isMiddleFilterOpen) && (
            <MiddleFilter
              filterBy={filterBy}
              onSetFilter={onSetFilter}
            />
          )}
          {isAtTop && (
            <MiddleFilter
              filterBy={filterBy}
              onSetFilter={onSetFilter}
            />
          )}
        </>
      )}
    </>
  );
}
