import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import MobileNav from "components/MobileNav/MobileNav";
import useScrollShadow from "hooks/useScrollShadow";
import Logo from "components/Logo/Logo";
import WebMenu from "components/NavMenus/WebMenu";
import { GoLinkExternal } from "react-icons/go";
import heart_icon from "assets/icons/broken_heart.svg";
import ua_icon from "assets/icons/ukraine.svg";
import { site } from "types/routes";

export default function WebHead() {
  const shadowRef = useScrollShadow();
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }
  return (
    <header
      ref={shadowRef}
      className="grid fixed bg-white w-full h-24 z-10 transition-shadow "
    >
      <nav className="w-full grid grid-cols-a1a items-center justify-items-end md:justify-items-center md:padded-container">
        <Logo />
        <WebMenu />
        <button
          className="text-angel-grey block md:hidden ml-5"
          onClick={toggleNav}
        >
          <FiMenu className="text-2xl" />
        </button>
        {navShown && <MobileNav />}
        <a
          href={`https://ukraine.angelprotocol.io/`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-6 font-heading cursor-pointer hover:bg-black bg-angel-grey w-full p-2 flex items-center justify-center text-white text-xs"
        >
          <Word icon={heart_icon} title="" />
          <span className="flex w-fit items-center mr-2 md:uppercase">
            Donate now to humanitarian relief in Ukraine
          </span>
          <Word icon={ua_icon} title="" />
          <GoLinkExternal className="text-lg" />
        </a>
      </nav>
    </header>
  );
}

function Word(props: { icon: string; title: string }) {
  return (
    <div className="flex items-center mr-2">
      <img src={props.icon} alt="" className="w-4 h-4 mr-1" />
      <span className="md:uppercase">{props.title}</span>
    </div>
  );
}
