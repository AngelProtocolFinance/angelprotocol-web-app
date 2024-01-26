import { useEffect, useRef, useState } from "react";
import { Location, matchRoutes, useLocation } from "react-router-dom";
import { Link } from "../types";
import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import DesktopNav from "./DesktopNav";
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

  const bg =
    !hasBanner(location) || isScrolled ? "bg-white dark:bg-blue-d3" : "";
  return (
    <header
      className={`${classes} ${isScrolled ? "shadow-lg" : ""} ${bg}
    transition-shadow ease-in-out duration-300 w-full h-[90px] mb-0`}
    >
      <div className="grid items-center gap-4 px-5 grid-cols-[auto_1fr_auto] h-full bg-white">
        <DappLogo />
        <DesktopNav
          classes="hidden lg:flex font-heading font-bold uppercase"
          links={links}
        />
        <div className="flex gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.auth_redirector
          ) && <UserMenu />}
        </div>
        <MobileNavOpener classes="flex ml-2 lg:hidden" links={links} />
      </div>
    </header>
  );
}

function hasBanner(location: Location): boolean {
  return !!matchRoutes(
    [
      /**routes with banner */
      appRoutes.marketplace,
      appRoutes.gift + "/*",
      appRoutes.donate + "/:id",
      appRoutes.profile + "/:id",
      appRoutes.marketplace + "/:id",
    ].map((r) => ({ path: r })),
    location,
  );
}
