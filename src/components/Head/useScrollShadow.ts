import { useEffect, useRef } from "react";

export default function useCheckScroll() {
  const ref = useRef<HTMLDivElement>(null);

  function handleScroll() {
    ref.current?.classList.toggle("shadow-md", window.scrollY > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return ref;
}
