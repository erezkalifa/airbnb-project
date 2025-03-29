import { useState, useEffect } from "react";
import { UpperFilter } from "../cmps/UpperFilter.jsx";
import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
import { MobileFilter } from "../cmps/MobileFilter.jsx";

export function Filters() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if screen width is <= 768px

  // Function to handle window resize and update the state
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount and unmount

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
