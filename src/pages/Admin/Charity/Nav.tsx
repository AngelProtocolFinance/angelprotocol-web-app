import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";
import { routes } from "./routes";

export default function Nav() {
  return (
    <div className="grid gap-3 content-start">
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>
      <NavLink to={adminRoutes.withdraws} className={styler}>
        Withdraws
      </NavLink>
      <NavLink to={adminRoutes.edit_profile} className={styler}>
        Edit Profile
      </NavLink>
      <NavLink to={routes.invest} className={styler}>
        Invest dashboard
      </NavLink>
      <NavLink to={adminRoutes.proposals} className={styler}>
        Proposals
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm font-semibold font-heading",
  "text-orange-l1"
);
