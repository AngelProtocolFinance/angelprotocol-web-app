import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
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

  //mb-4 grid grid-cols-a1a lg:grid-cols-aa1 items-center w-full z-10 padded-container pt-3
  return (
    <header
      ref={shadowRef}
      className="fixed bg-white w-full z-10 transition-shadow"
    >
      <div className="grid grid-cols-a1 items-center w-full padded-container py-2">
        <Link to={site.home} title="to home">
          <img src={betaBlueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
        <WebMenu />
        <button
          className="text-angel-grey block sm:hidden ml-5 justify-self-end"
          onClick={toggleNav}
        >
          {navShown ? (
            <IoClose className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
        {navShown && <MobileNav />}
      </div>

      <a
        href={`${site.app}/markeplace`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 transform translate-y-full font-heading cursor-pointer hover:bg-black bg-angel-grey w-full p-2 flex items-center justify-center text-white text-xs"
      >
        <span className="hidden md:block flex w-fit items-center mr-2 md:uppercase">
          Charity Marketplace is now live!
        </span>
        <Word icon={star_icon} title="Select" />
        <Word icon={heart_icon} title="Connect" />
        <Word icon={earth_icon} title="Donate" />
        <GoLinkExternal className="text-lg" />
      </a>
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
