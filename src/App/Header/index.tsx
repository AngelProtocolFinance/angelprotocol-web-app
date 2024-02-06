import { appRoutes } from "constants/routes";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import Logo from "./Logo";
import { Opener as MobileNavOpener } from "./MobileNav";
import UserMenu from "./UserMenu";

const NAVBAR_ID = "navbar";

type Props = { classes: string; links: Link[] };

export default function Header({ classes, links }: Props) {
  const location = useLocation();
  // The ref is used to compare the current and previous bool value
  // instead of the state (for the previous value); the reason is that
  // this makes it unnecessary to add the state value to the below useEffect's
  // dependency array.
  const isStickyRef = useRef<boolean>(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const navbar = document.getElementById(NAVBAR_ID);
      if (!navbar) {
        return;
      }
      const _isSticky = window.scrollY >= navbar.offsetTop;
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

  return (
    <header
      id={NAVBAR_ID}
      className={`${classes} ${
        isSticky ? "shadow-lg bg-white dark:bg-blue-d3" : ""
      } transition ease-in-out duration-100 w-full h-20 mt-9 px-4 sm:px-6`}
    >
      <div className="grid place-items-center gap-4 pl-5 pr-10 grid-cols-3 h-full w-full max-w-6xl mx-auto rounded-full bg-white">
        <div className="w-80">{/** placeholder for search bar */}</div>
        <Logo />
        <div className="flex gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.auth_redirector
          ) && <UserMenu />}
          <MobileNavOpener links={links} />
        </div>
      </div>
    </header>
  );
}
