import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";
import useHeaderClassNames from "./useHeaderClassNames";

type Props = { links: Link[]; classes?: string };

export default function Header({ links, classes }: Props) {
  const location = useLocation();
  const headerClassNames = useHeaderClassNames(classes);

  return (
    <header className={headerClassNames}>
      <div className="grid items-center grid-cols-2 gap-4 padded-container">
        <DappLogo classes="w-48 h-12" />
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.signup ||
            location.pathname === appRoutes.reset_password ||
            location.pathname === appRoutes.auth_redirector
          ) && <UserMenu />}
          <NavDropdown links={links} />
        </div>
      </div>
    </header>
  );
}
