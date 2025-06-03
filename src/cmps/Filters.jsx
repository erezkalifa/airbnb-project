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

  const handleOpenFilter = (section) => {
    console.log("Opening middle filter for section:", section);
    console.log("filterBy in MiddleFilter:", filterBy);
    setIsMiddleFilterOpen(true);
  };

  useEffect(() => {
    if (isAtTop) {
      setIsMiddleFilterOpen(true);
    } else {
      setIsMiddleFilterOpen(false);
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
            onOpenFilter={handleOpenFilter}
          />
          {(!isAtTop && isMiddleFilterOpen) && (
            <MiddleFilter
              filterBy={filterBy}
              onSetFilter={onSetFilter}
              className={`${isMiddleFilterOpen ? "visible" : "hidden"} ${isAtTop ? "sticky" : ""}`}
            />
          )}
          {isAtTop && (
            <MiddleFilter
              filterBy={filterBy}
              onSetFilter={onSetFilter}
              isSticky={true}
              className={`${isMiddleFilterOpen ? "visible" : "hidden"} ${isAtTop ? "sticky" : ""}`}
            />
          )}
        </>
      )}
    </>
  );
}

