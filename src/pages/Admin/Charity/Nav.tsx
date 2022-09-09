import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";
import { routes } from "./routes";

export default function Nav() {
  return (
    <div className="flex justify-end">
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>
      <NavLink end to={routes.investments} className={styler}>
        Investments
      </NavLink>
      <NavLink end to={routes.withdraws} className={styler}>
        Withdraws
      </NavLink>
      <NavLink end to={routes.edit_profile} className={styler}>
        Edit Profile
      </NavLink>
      <NavLink end to={adminRoutes.proposals} className={styler}>
        Proposals
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm text-center font-semibold font-heading text-white-grey",
  "text-angel-orange"
);
