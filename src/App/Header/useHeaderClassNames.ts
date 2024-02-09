import { useEffect, useRef, useState } from "react";

export default function useHeaderClassNames(headerId: string) {
  // The ref is used to compare the current and previous bool value
  // instead of the state (for the previous value); the reason is that
  // this makes it unnecessary to add the state value to the below useEffect's
  // dependency array.
  const isStickyRef = useRef<boolean>(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const header = document.getElementById(headerId);
    const headerOffsetTop = header!.offsetTop;

    function handleScroll() {
      const _isSticky = window.scrollY >= headerOffsetTop;
      if (_isSticky !== isStickyRef.current) {
        setSticky(_isSticky);
        isStickyRef.current = _isSticky;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return `${
    isSticky
      ? "fixed top-0 shadow-lg bg-white dark:bg-blue-d3"
      : "absolute top-9"
  } transition ease-in-out duration-100 z-20 h-12 sm:h-20 w-full`;
}
