import Icon from "components/Icon";
import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import { useLocation } from "react-router-dom";
import type { Link as TLink } from "../types";
import NavDropdown from "./NavDropdown";
import UserMenu from "./UserMenu";

type Props = { links: TLink[]; classes?: string };

export default function Header({ links, classes }: Props) {
  const location = useLocation();

  return (
    <header
      className={`${classes} group`}
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
      <div className="grid relative items-center grid-cols-2 gap-4 padded-container bg-white rounded-full py-2">
        <DappLogo classes="w-48 h-12" />
        {location.pathname !== appRoutes.marketplace && (
          <div className="max-md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center px-4 py-1 text-sm gap-1 rounded-full font-heading">
            <label htmlFor="__endow-search">
              <Icon type="Search" className="mr-1 text-lg" />
            </label>
            <input
              id="__endow-search"
              type="text"
              placeholder="Search causes..."
              className="focus:outline-none"
            />
          </div>
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
      <div className="absolute hidden group-has-[input:focus]:block bg-white mt-4 container left-1/2 -translate-x-1/2">
        form
      </div>
    </header>
  );
}
