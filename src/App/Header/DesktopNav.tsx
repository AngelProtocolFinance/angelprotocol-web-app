import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

export default function DesktopNav({ classes = "" }: { classes?: string }) {
  return (
    <nav className={`${classes} items-center justify-end font-body text-base`}>
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
  "px-4 text-sm text-white hover:text-orange transition ease-in-out duration-300 uppercase font-heading font-bold",
  "pointer-events-none text-orange"
);
