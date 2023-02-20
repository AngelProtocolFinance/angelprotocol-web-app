import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import { BASE_DOMAIN } from "constants/common";

export default function DesktopNav({ classes = "" }: { classes?: string }) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
      <NavLink className={styler} to={BASE_DOMAIN}>
        For Non-Profits
      </NavLink>
      <NavLink className={styler} to={appRoutes.index}>
        Marketplace
      </NavLink>
      <NavLink to={`${BASE_DOMAIN}/csr-partners`} className={styler}>
        Giving Partners
      </NavLink>
      <NavLink to={`${BASE_DOMAIN}/about-angel-giving`} className={styler}>
        About
      </NavLink>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "px-4 text-sm text-white hover:text-orange-l1 active:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold",
  "pointer-events-none text-orange"
);
