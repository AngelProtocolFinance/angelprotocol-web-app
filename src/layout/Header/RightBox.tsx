import MobileNav from "components/MobileNav/MobileNav";
import TerraConnector from "components/TerraConnector/TerraConnector";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "types/types";
import { useHeaderColors } from "contexts/HeaderColorProvider";

export default function RightBox() {
  const { textColor } = useHeaderColors();
  const [navShown, showNav] = useState(false);
  function toggleNav() {
    showNav((prevState) => !prevState);
  }

  const location = useLocation();
  let varNode = <></>; //init type with ReactNode
  switch (location.pathname) {
    case routes.tca: {
      varNode = (
        <div className="flex">
          <TerraConnector />
          <button
            className={`text-${textColor} block md:hidden ml-5`}
            onClick={toggleNav}
          >
            <FiMenu className="text-2xl" />
          </button>
          {navShown && <MobileNav />}
        </div>
      );
      break;
    }
    case routes.home:
      varNode = <></>;
      break;
    case routes.login:
      varNode = (
        <p className="font-bold text-white font-lg uppercase">
          give once, give forever
        </p>
      );
      break;
    default:
      varNode = (
        <div className="flex">
          <button
            className={`text-${textColor} block md:hidden ml-5`}
            onClick={toggleNav}
          >
            <FiMenu className="text-2xl" />
          </button>
          {navShown && <MobileNav />}
        </div>
      );
  }

  return <>{varNode}</>;
}
