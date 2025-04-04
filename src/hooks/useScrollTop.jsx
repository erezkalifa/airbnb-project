import { useEffect, useState } from "react";

export default function useScrollTop(threshold = 0) {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= threshold);
    };

    handleScroll(); // run on load

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isAtTop;
}
