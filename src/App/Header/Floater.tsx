import { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function Floater({ children }: PropsWithChildren<{}>) {
  const isScrolledRef = useRef<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const _isScrolled = window.scrollY > 0;
      if (_isScrolled !== isScrolledRef.current) {
        setIsScrolled(_isScrolled);
        isScrolledRef.current = _isScrolled;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScrolled ? "bg-blue dark:bg-blue-d5 shadow-lg" : ""
      } p-2 fixed transition ease-in-out duration-300 w-full z-20`}
      onScroll={(e) => {
        console.log(e);
      }}
    >
      {children}
    </div>
  );
}
