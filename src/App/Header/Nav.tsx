import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

export default function Nav() {
  return (
    <nav className="hidden lg:flex flex justify-self-start items-center font-body text-sm lg:text-base ml-2">
      <NavLink className={styler} to={appRoutes.index}>
        Marketplace
      </NavLink>
      {/* 
      NOTE: governance will be reenabled when we relaunch the $HALO token
      <NavLink to={appRoutes.govern} className={styler}>
        Governance
      </NavLink> */}
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      <NavLink to={appRoutes.register} className={styler}>
        Register
      </NavLink>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "px-3 text-md text-white hover:text-white/75 uppercase font-heading font-semibold",
  "pointer-events-none text-orange"
);
