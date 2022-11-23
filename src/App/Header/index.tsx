import Airdrop from "App/Header/Airdrop";
import { useEffect, useRef, useState } from "react";
import { Location, matchRoutes, useLocation } from "react-router-dom";
import { appRoutes } from "constants/routes";
import WalletSuite from "../WalletSuite";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { Opener as MobileNavOpener } from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header({ classes = "" }: { classes?: string }) {
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
        isScrolled ? "bg-blue dark:bg-blue-d3 shadow-lg" : ""
      } ${
        hasBanner(location) ? "-mb-[6.5rem]" : "bg-blue dark:bg-blue-d3 mb-0"
      } transition ease-in-out duration-300 w-full`}
    >
      <div className="grid items-center gap-4 padded-container grid-cols-[auto_1fr_auto] py-4">
        <Logo />
        <DesktopNav classes="hidden lg:flex" />
        <div className="flex gap-4 justify-self-end">
          <ThemeToggle classes="hidden lg:flex" />
          <WalletSuite />
          <Airdrop />
        </div>
        <MobileNavOpener classes="flex ml-2 lg:hidden" />
      </div>
    </header>
  );
}

function hasBanner(location: Location): boolean {
  return !!matchRoutes(
    [
      /**routes with banner */
      appRoutes.index,
      appRoutes.donate,
      appRoutes.profile + "/*",
    ].map((r) => ({ path: r })),
    location
  );
}
