import { useState, useEffect } from "react";
import { UpperFilter } from "../cmps/UpperFilter.jsx";
import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
import { MobileFilter } from "../cmps/MobileFilter.jsx";
import useIsMobile from "../hooks/useIsMobile";

export function Filters() {
  const isMobile = useIsMobile(); // Check if screen width is <= 768px

  return (
    <>
      {!isMobile ? (
        <>
          <UpperFilter />
          <MiddleFilter />
        </>
      ) : (
        <MobileFilter />
      )}
    </>
  );
}
