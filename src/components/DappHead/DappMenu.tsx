import { NavLink } from "react-router-dom";
import { appRoutes, siteRoutes } from "types/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

export default function DappMenu() {
  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink
        className={styler}
        to={`${siteRoutes.app}/${appRoutes.marketplace}`}
      >
        Marketplace
      </NavLink>
      <NavLink to={`${siteRoutes.app}/${appRoutes.govern}`} className={styler}>
        Governance
      </NavLink>
      <NavLink
        to={`${siteRoutes.app}/${appRoutes.leaderboard}`}
        className={styler}
      >
        Leaderboard
      </NavLink>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "py-3 px-4 text-white-grey hover:text-white-grey/75 uppercase inline-flex items-center font-heading font-semibold",
  "rounded-md bg-white/10 shadow-inner pointer-events-none"
);
