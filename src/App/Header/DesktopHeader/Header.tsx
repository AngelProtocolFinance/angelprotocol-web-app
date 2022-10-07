import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <nav className="flex w-full justify-between ml-2">
      <div className="justify-self-start items-center font-body text-base">
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
      </div>

      <ThemeToggle />
    </nav>
  );
}

const styler = createNavLinkStyler(
  "px-3 text-md text-white-grey hover:text-white-grey/75 uppercase font-heading font-semibold",
  "pointer-events-none text-angel-orange"
);
