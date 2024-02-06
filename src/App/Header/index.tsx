import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import { Opener as MobileNavOpener } from "./MobileNav";
import UserMenu from "./UserMenu";

type Props = { classes: string; links: Link[] };

export default function Header({ classes, links }: Props) {
  const location = useLocation();
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
    <header
      className={`${classes} ${
        isScrolled ? "shadow-lg bg-white dark:bg-blue-d3" : ""
      } transition-shadow ease-in-out duration-300 w-full h-20 mb-0`}
    >
      <div className="grid place-items-center gap-4 px-5 grid-cols-3 h-full w-full max-w-6xl mx-auto rounded-full bg-white">
        <div className="w-80"></div>
        <DappLogo classes="w-32 sm:w-48" />
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
