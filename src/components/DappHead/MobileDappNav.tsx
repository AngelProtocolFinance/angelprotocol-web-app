import { NavLink } from "react-router-dom";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { appRoutes, siteRoutes } from "constants/routes";

//Will be for WebNav
export default function MobileDappNav() {
  const styler = createNavLinkStyler(
    "text-white/75 uppercase inline-flex items-center font-heading",
    "text-angel-orange"
  );

  return (
    <nav className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2">
      <NavLink
        to={`${siteRoutes.app}/${appRoutes.marketplace}`}
        className={styler}
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
      <NavLink to={`${siteRoutes.app}/${appRoutes.admin}`} className={styler}>
        Admin
      </NavLink>
    </nav>
  );
}
