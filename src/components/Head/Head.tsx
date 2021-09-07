import { Link } from "react-router-dom";
import Logo from "components/Logo/Logo";
import useScrollShadow from "./useScrollShadow";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import Wallet from "components/Wallet/Wallet";
import NavMenu from "components/Layout/NavMenu";
import MobileNav from "components/MobileNav/MobileNav";
import { useState } from "react";

const Head = () => {
  const [navShown, showNav] = useState(false);
  const shadowRef = useScrollShadow();
  const { bgColor } = useHeaderColors();

  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  return (
    <header
      ref={shadowRef}
      className={`grid fixed w-full ${bgColor} h-24 z-10 transition-shadow `}
    >
      <nav className="md:container md:mx-auto w-full grid grid-cols-nav items-center justify-items-end md:justify-items-center px-5">
        <Link to="/">
          <Logo />
        </Link>
        <NavMenu />
        <Wallet />
        <button className="block md:hidden ml-5" onClick={toggleNav}>
          menu
        </button>
        {navShown && <MobileNav />}
      </nav>
    </header>
  );
};

export default Head;
