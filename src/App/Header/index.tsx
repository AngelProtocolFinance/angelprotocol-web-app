import Airdrop from "App/Header/Airdrop";
import TransactionHint from "App/Header/TransactionHint";
import { useEffect, useRef, useState } from "react";
import WalletSuite from "../WalletSuite";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
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
    <header className="items-center w-full padded-container gap-5">
      <Logo />
      <DesktopNav />
      <div>
        <ThemeToggle />
        <TransactionHint />
        <WalletSuite />
        <Airdrop />
      </div>
      <MobileNav />
    </header>

    // <div
    //   className={`${
    //     isScrolled ? "bg-blue dark:bg-blue-d3 shadow-lg" : ""
    //   } py-2 fixed transition ease-in-out duration-300 w-full z-20`}
    // >
    //   <DesktopHeader />
    //   {/* <MobileHeader /> */}
    // </div>
  );
}
