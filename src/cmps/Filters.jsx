import { useState, useEffect } from "react";
import { UpperFilter } from "../cmps/UpperFilter.jsx";
import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
import { MobileFilter } from "../cmps/MobileFilter.jsx";
import useIsMobile from "../hooks/useIsMobile";
import useScrollTop from "../hooks/useScrollTop.jsx";


export function Filters({ filterBy, onSetFilter }) {
  const isMobile = useIsMobile(); // Check if screen width is <= 768px
  const isAtTop =  useScrollTop();

  return (
    <>
      {isMobile ? (
        <MobileFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      ) : (
              <>
              <UpperFilter isAtTop={isAtTop} filterBy={filterBy} onSetFilter={onSetFilter}/>
              {isAtTop && <MiddleFilter filterBy={filterBy} onSetFilter={onSetFilter}/>}
            </>
      )}
    </>
  );
}
