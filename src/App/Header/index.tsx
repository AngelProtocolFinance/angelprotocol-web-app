import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";
import useHeaderClassNames from "./useHeaderClassNames";

type Props = { links: Link[] };

export default function Header({ links }: Props) {
  const location = useLocation();
  const headerClassNames = useHeaderClassNames();

  return (
    <header className={headerClassNames}>
      <div className="px-0 md:py-2 h-full w-full bg-white">
        <div className="grid grid-cols-2 gap-4 padded-container">
          <DappLogo classes="w-48 h-12" />
          <div className="flex gap-2 md:gap-4 justify-self-end items-center">
            {!(
              location.pathname === appRoutes.signin ||
              location.pathname === appRoutes.signup ||
              location.pathname === appRoutes.auth_redirector
            ) && <UserMenu />}
            <NavDropdown links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
