import { NavLink } from "react-router-dom";
import { appRoutes, siteRoutes } from "types/routes";

//Will be for WebNav
export default function MobileDappNav() {
  const linkStyles = {
    className: `text-white hover:text-white/75 uppercase inline-flex items-center font-heading`,
    activeClassName: "text-angel-orange",
  };
  return (
    <nav className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2">
      <NavLink
        to={`${siteRoutes.app}/${appRoutes.marketplace}`}
        {...linkStyles}
      >
        Marketplace
      </NavLink>
      <NavLink to={`${siteRoutes.app}/${appRoutes.govern}`} {...linkStyles}>
        Governance
      </NavLink>
      <NavLink
        to={`${siteRoutes.app}/${appRoutes.leaderboard}`}
        {...linkStyles}
      >
        Leaderboard
      </NavLink>
    </nav>
  );
}
