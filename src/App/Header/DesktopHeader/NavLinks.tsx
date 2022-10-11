import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

export default function NavLinks() {
  return (
    <nav className="flex justify-self-start items-center font-body text-base">
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
      {/*<NavLink to={appRoutes.register} className={styler}>
          Register
        </NavLink>*/}
    </nav>
  );
}

const styler = createNavLinkStyler(
  "px-3 text-md text-white hover:text-orange-l5 uppercase font-heading font-semibold",
  "pointer-events-none text-orange-l2"
);
