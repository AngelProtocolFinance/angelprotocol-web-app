import { NavLink } from "react-router-dom";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { app, site } from "constants/routes";

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
      <NavLink to={`${site.app}/${app.leaderboard}`} className={styler}>
        Leaderboard
      </NavLink>
    </nav>
  );
}
