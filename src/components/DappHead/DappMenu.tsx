import { NavLink } from "react-router-dom";
import { app, site } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

export default function DappMenu() {
  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink className={styler} to={`${site.app}/${app.marketplace}`}>
        Marketplace
      </NavLink>
      <NavLink to={`${site.app}/${app.govern}`} className={styler}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.leaderboard}`} className={styler}>
        Leaderboard
      </NavLink>
      <NavLink to={`${site.app}/${app.dashboard}`} className={styler}>
        Dashboard
      </NavLink>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "py-3 px-4 text-white-grey hover:text-white-grey/75 uppercase inline-flex items-center font-heading font-semibold",
  "rounded-md bg-white/10 shadow-inner pointer-events-none"
);
