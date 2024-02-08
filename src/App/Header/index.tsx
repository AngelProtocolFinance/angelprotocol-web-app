import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";
import useHeaderClassNames from "./useHeaderClassNames";

const HEADER_ID = "navbar";

type Props = { classes: string; links: Link[] };

export default function Header({ classes, links }: Props) {
  const location = useLocation();

  const headerClassNames = useHeaderClassNames(HEADER_ID);

  return (
    <header id={HEADER_ID} className={`${classes} ${headerClassNames}`}>
      <div className="grid gap-4 px-8 grid-cols-2 h-full w-full max-w-6xl mx-auto rounded-full bg-white">
        <Logo />
        <div className="flex gap-2 md:gap-4 justify-self-end items-center">
          {!(
            location.pathname === appRoutes.signin ||
            location.pathname === appRoutes.auth_redirector
          ) && <UserMenu />}
          <NavDropdown links={links} />
        </div>
      </div>
    </header>
  );
}
