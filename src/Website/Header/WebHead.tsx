import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import betaBlueLogo from "assets/images/angelprotocol-beta-horiz-blu.png";
import useScrollShadow from "hooks/useScrollShadow";
import earth_icon from "assets/icons/earth.svg";
import heart_icon from "assets/icons/heart.svg";
import star_icon from "assets/icons/star.svg";
import { site } from "types/routes";
import MobileNav from "./MobileNav";
import WebMenu from "./WebMenu";

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
      <nav className="w-full grid grid-cols-a1a items-center justify-items-end md:justify-items-center padded-container">
        <Link to={site.home} title="to home">
          <img src={betaBlueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
        <WebMenu />

        <button
          className="text-angel-grey block md:hidden ml-5"
          onClick={toggleNav}
        >
          <FiMenu className="text-2xl" />
        </button>
        {navShown && <MobileNav />}

        <a
          href={`${site.app}/markeplace`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -bottom-8 font-heading cursor-pointer hover:bg-black bg-angel-grey w-full p-2 flex items-center justify-center text-white text-xs"
        >
          <span className="hidden md:block flex w-fit items-center mr-2 md:uppercase">
            Charity Marketplace is now live!
          </span>
          <Word icon={star_icon} title="Select" />
          <Word icon={heart_icon} title="Connect" />
          <Word icon={earth_icon} title="Donate" />
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
