import { useState } from "react";
import { Link } from "react-router-dom";
import betaBlueLogo from "assets/images/angelprotocol-beta-horiz-blu.png";
import Icon from "components/Icon";
import { appRoutes, siteRoutes } from "constants/routes";
import MobileNav from "./MobileNav";
import WebMenu from "./WebMenu";

export default function WebHead() {
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  return (
    <header className="fixed bg-white w-full z-10 ">
      <div className="grid grid-cols-a1a items-center w-full padded-container py-2">
        <Link to={siteRoutes.home} title="to home">
          <img src={betaBlueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
        <WebMenu />
        <Link
          to={`${siteRoutes.app}/${appRoutes.marketplace}`}
          className={`justify-self-end border border-angel-orange/40 rounded-md bg-angel-orange text-white uppercase transform hover:scale-105 hover:shadow-lg transition active:translate-x-1 active:shadow-md ml-0 md:ml-2 py-2 px-4 `}
        >
          Web app
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
    </header>
  );
}
