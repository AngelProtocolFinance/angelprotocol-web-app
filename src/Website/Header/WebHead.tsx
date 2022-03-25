import { useState } from "react";
import { Link } from "react-router-dom";
import betaBlueLogo from "assets/images/angelprotocol-beta-horiz-blu.png";
import useScrollShadow from "hooks/useScrollShadow";
import heart_icon from "assets/icons/broken_heart.svg";
import ua_icon from "assets/icons/ukraine.svg";
import { site, app } from "constants/routes";
import MobileNav from "./MobileNav";
import WebMenu from "./WebMenu";
import Icon from "components/Icons/Icons";

export default function WebHead() {
  const shadowRef = useScrollShadow();
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  //mb-4 grid grid-cols-a1a lg:grid-cols-aa1 items-center w-full z-10 padded-container pt-3
  return (
    <header className="fixed bg-white w-full z-10 ">
      <div className="grid grid-cols-a1a items-center w-full padded-container py-2">
        <Link to={site.home} title="to home">
          <img src={betaBlueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
        <WebMenu />
        <Link
          to={`${site.app}/${app.marketplace}`}
          className={`justify-self-end border border-opacity-40 border-angel-orange rounded-md bg-angel-orange text-white uppercase transform hover:scale-105 hover:shadow-lg transition active:translate-x-1 active:shadow-md ml-0 md:ml-2 py-2 px-4 `}
        >
          Donate
        </Link>
        <button
          className="text-angel-grey block sm:hidden ml-2 justify-self-end"
          onClick={toggleNav}
        >
          {navShown ? (
            <Icon type="Close" className="text-2xl" />
          ) : (
            <Icon type="Menu" className="text-2xl" />
          )}
        </button>
        {navShown && <MobileNav />}
      </div>

      <a
        ref={shadowRef}
        href={`https://ukraine.angelprotocol.io/`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-shadow absolute bottom-0 transform translate-y-full font-heading cursor-pointer hover:bg-black bg-angel-grey w-full p-2 flex items-center justify-center text-white text-xs"
      >
        <Word icon={heart_icon} title="" />
        <span className="flex w-fit items-center mr-2 md:uppercase">
          Donate now to humanitarian relief in Ukraine
        </span>
        <Word icon={ua_icon} title="" />
        <Icon type="ExternalLink" className="text-lg" />
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
