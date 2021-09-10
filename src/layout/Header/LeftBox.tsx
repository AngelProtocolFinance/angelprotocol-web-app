import whiteLogo from "../../assets/images/angelprotocol-horiz-wht.png";
import blueLogo from "../../assets/images/angelprotocol-horiz-blu.png";
import { useLocation } from "react-router";
import { routes } from "types/types";
import { Link } from "react-router-dom";

export default function LeftBox() {
  const location = useLocation();
  let varNode = <></>; //initialize variable with ReactNode
  switch (location.pathname) {
    case routes.contact:
    case routes.home:
      varNode = <img src={blueLogo} alt="" className="w-32 sm:w-36" />;
      break;
    default:
      varNode = <img src={whiteLogo} alt="" className="w-32 sm:w-36" />;
  }

  return <Link to={routes.home}>{varNode}</Link>;
}
