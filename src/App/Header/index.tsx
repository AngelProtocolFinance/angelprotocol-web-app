import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import { Link } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";

type Props = { links: Link[]; classes?: string };

export default function Header({ links, classes }: Props) {
  const location = useLocation();

  return (
    <header
      className={classes}
      ref={(node) => {
        if (!node) return;
        const observer = new IntersectionObserver(
          ([e]) => {
            const isIntersecting = e.intersectionRatio < 1;
            e.target.classList.toggle("bg-white", isIntersecting);
            e.target.classList.toggle("shadow-lg", isIntersecting);
            e.target.classList.toggle("px-4", !isIntersecting);
          },
          { threshold: [1] }
        );
        observer.observe(node);
      }}
    >
      <div className="grid items-center grid-cols-2 gap-4 padded-container bg-white rounded-full py-2">
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
