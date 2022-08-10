import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

//Will be for WebNav
export default function MobileDappNav() {
  const styler = createNavLinkStyler(
    "text-white/75 uppercase inline-flex items-center font-heading",
    "text-angel-orange"
  );

  return (
    <nav className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2">
      <NavLink to={appRoutes.marketplace} className={styler}>
        Marketplace
      </NavLink>
      {/* 
      NOTE: Governance will be reenabled when we relaunch the $HALO token
      <NavLink to={appRoutes.govern} className={styler}>
        Governance
      </NavLink> */}
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      <NavLink to={appRoutes.admin} className={styler}>
        Admin
      </NavLink>
    </nav>
  );
}
