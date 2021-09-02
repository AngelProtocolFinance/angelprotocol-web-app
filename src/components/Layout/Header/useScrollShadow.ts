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

/**
 * export let navBar = document.querySelector(".navigation__bar");

if (window.scrollY > 0 && !window.matchMedia("(max-width: 490px)").matches) {
  navBar.classList.add("navigation__bar_sticky");
}

window.addEventListener("scroll", function () {
  if (window.matchMedia("(max-width: 490px)").matches) {
    return; //don't toggle sticky when in mobile;
  } else {
    navBar.classList.toggle(
      "navigation__bar_sticky",

      window.scrollY > 0
    );
  }
});
 */
