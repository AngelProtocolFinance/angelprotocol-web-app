import { useEffect, useRef, useState } from "react";

export default function useHeaderClassNames(classes = "") {
  // The ref is used to compare the current and previous bool value
  // instead of the state (for the previous value); the reason is that
  // this makes it unnecessary to add the state value to the below useEffect's
  // dependency array.
  const isScrolledRef = useRef<boolean>(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const _isScrolled = window.scrollY > 0;
      if (_isScrolled !== isScrolledRef.current) {
        setScrolled(_isScrolled);
        isScrolledRef.current = _isScrolled;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return `${classes} grid bg-white transition ease-in-out duration-100 w-full ${
    isScrolled ? "shadow-lg" : ""
  }`;
}
