import Icon from "components/Icon";
import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { Link, useLocation } from "react-router-dom";
import type { Link as TLink } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";

type Props = { links: TLink[]; classes?: string };

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
      <div className="grid items-center grid-cols-[auto_1fr_auto] gap-4 padded-container bg-white rounded-full py-2">
        <DappLogo classes="w-48 h-12" />
        {location.pathname !== appRoutes.marketplace && (
          <Link
            to={appRoutes.marketplace}
            className="justify-self-center btn-blue capitalize items-center px-4 py-1 text-sm gap-1 rounded-full font-heading"
          >
            <Icon type="Search" className="mr-1 text-lg" />
            <span>Explore all causes</span>
          </Link>
        )}
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
