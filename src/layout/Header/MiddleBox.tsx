import NavMenu from "components/NavMenu/NavMenu";
import { useLocation } from "react-router";
import { routes } from "types/types";

export default function MiddleBox() {
  const location = useLocation();
  switch (location.pathname) {
    case routes.login:
      return <div></div>;
    default:
      return <NavMenu />;
  }
}
