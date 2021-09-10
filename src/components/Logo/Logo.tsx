import whiteLogo from "../../assets/images/angelprotocol-horiz-wht.png";
import blueLogo from "../../assets/images/angelprotocol-horiz-blu.png";

import { routes } from "types/types";
import { useLocation } from "react-router-dom";
export default function Logo() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.contact:
    case routes.home:
      return <img src={blueLogo} alt="" width="150" />;
    default:
      return <img src={whiteLogo} alt="" width="150" />;
  }
}
