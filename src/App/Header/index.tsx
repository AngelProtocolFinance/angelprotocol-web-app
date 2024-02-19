import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";
import useHeaderClassNames from "./useHeaderClassNames";

const HEADER_ID = "navbar";

type Props = { links: Link[] };

export default function Header({ links }: Props) {
  const location = useLocation();

  const headerClassNames = useHeaderClassNames(HEADER_ID);

  return (
    <header id={HEADER_ID} className={headerClassNames}>
      <div className="padded-container">
        <div className="grid gap-4 px-8 grid-cols-2 h-full w-full rounded-full bg-white">
          <DappLogo classes="w-32 sm:w-48 h-12 sm:h-[76px]" />
          <div className="flex gap-2 md:gap-4 justify-self-end items-center">
            {!(
              location.pathname === appRoutes.signin ||
              location.pathname === appRoutes.auth_redirector
            ) && <UserMenu />}
            <NavDropdown links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
