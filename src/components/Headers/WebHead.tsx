import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import MobileNav from "components/MobileNav/MobileNav";
import useScrollShadow from "hooks/useScrollShadow";
import Logo from "components/Logo/Logo";
import WebMenu from "components/NavMenus/WebMenu";

export default function WebHead() {
  const shadowRef = useScrollShadow();
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }
  return (
    <header
      ref={shadowRef}
      className={`grid fixed bg-white w-full h-24 z-10 transition-shadow `}
    >
      <nav className="w-full grid grid-cols-a1a items-center justify-items-end md:justify-items-center padded-container">
        <Logo />
        <WebMenu />
        <button
          className={`text-angel-grey block md:hidden ml-5`}
          onClick={toggleNav}
        >
          <FiMenu className="text-2xl" />
        </button>
        {navShown && <MobileNav />}
      </nav>
    </header>
  );
}
