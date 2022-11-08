import Airdrop from "App/Header/Airdrop";
import { useEffect, useRef, useState } from "react";
import WalletSuite from "../WalletSuite";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { Opener as MobileNavOpener } from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header({ classes = "" }: { classes?: string }) {
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
      } py-3 transition ease-in-out duration-300 w-full`}
    >
      <div className="flex items-center lg:grid lg:grid-cols-[auto_1fr_auto_auto] padded-container">
        <Logo />
        <DesktopNav classes="hidden lg:flex" />
        <div className="flex gap-x-2 ml-auto lg:ml-0">
          <ThemeToggle classes="hidden lg:flex" />
          <WalletSuite />
          <Airdrop />
        </div>
        <MobileNavOpener classes="flex ml-2 lg:hidden" />
      </div>
    </header>
  );
}
