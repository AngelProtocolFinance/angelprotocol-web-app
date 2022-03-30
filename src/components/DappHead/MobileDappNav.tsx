import { NavLink } from "react-router-dom";
import { app, site } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

//Will be for WebNav
export default function MobileDappNav() {
  const styler = createNavLinkStyler(
    "text-white/75 uppercase inline-flex items-center font-heading",
    "text-angel-orange"
  );

  return (
    <nav className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2">
      <NavLink to={`${site.app}/${app.marketplace}`} className={styler}>
        Marketplace
      </NavLink>
      <NavLink to={`${site.app}/${app.govern}`} className={styler}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.leaderboard}`} className={styler}>
        Leaderboard
      </NavLink>
      <NavLink to={`${site.app}/${app.admin}`} className={styler}>
        Admin
      </NavLink>
    </nav>
  );
}
