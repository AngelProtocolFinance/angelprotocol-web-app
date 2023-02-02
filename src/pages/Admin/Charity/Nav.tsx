import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";

export default function Nav() {
  return (
    <div className="grid content-start border-r border-prim p-6">
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>

      <NavLink end to={adminRoutes.withdraw} className={styler}>
        Withdraw
      </NavLink>
      <NavLink end to={adminRoutes.contributions} className={styler}>
        Contributions
      </NavLink>
      <NavLink end to={adminRoutes.invest_dashboard} className={styler}>
        Invest dashboard
      </NavLink>
      <NavLink end to={adminRoutes.liquid_account} className={styler}>
        Liquid Account
      </NavLink>
      <NavLink end to={adminRoutes.locked_account} className={styler}>
        Locked Account
      </NavLink>
      <NavLink end to={adminRoutes.settings} className={styler}>
        Settings
      </NavLink>
      <NavLink end to={adminRoutes.investments} className={styler}>
        Investments
      </NavLink>
      <NavLink end to={adminRoutes.edit_profile} className={styler}>
        Edit Profile
      </NavLink>
      <NavLink end to={adminRoutes.proposals} className={styler}>
        Proposals
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "p-2 uppercase text-sm font-semibold font-heading",
  "text-orange-l1"
);
