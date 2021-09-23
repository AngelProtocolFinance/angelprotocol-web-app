import whiteLogo from "assets/images/angelprotocol-horiz-wht.png";
import blueLogo from "assets/images/angelprotocol-horiz-blu.png";

import { site, web } from "types/routes";
import { Link, useLocation } from "react-router-dom";
export default function Logo() {
  const location = useLocation();
  switch (location.pathname) {
    case `${site.home}${web.index}`:
    case `${site.home}${web.charities}`:
    case `${site.home}${web.privacy}`:
    case `${site.home}${web.donors}`:
    case `${site.home}${web.about}`:
    case `${site.home}${web.contact}`:
      return (
        <Link to={site.home}>
          <img src={blueLogo} alt="" className="w-32 sm:w-36" />
        </Link>
      );
    default:
      return (
        <Link to={site.home}>
          <img src={whiteLogo} alt="" width="150" />
        </Link>
      );
  }
}
