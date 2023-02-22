import { adminRoutes } from "@ap/constants";
import { useAdminResources } from "@ap/contexts/admin";
import { createNavLinkStyler } from "@ap/helpers";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const { id } = useAdminResources();

  return (
    <div className="grid gap-3 content-start">
      <NavLink end to={adminRoutes.index} className={styler}>
        Dashboard
      </NavLink>
      <NavLink to={adminRoutes.withdraws} className={styler}>
        Withdraws
      </NavLink>
      <NavLink to={adminRoutes.invest} className={styler}>
        Invest dashboard
      </NavLink>
      <NavLink to={adminRoutes.account + "/liquid"} className={styler}>
        Liquid Account
      </NavLink>
      <NavLink to={adminRoutes.account + "/locked"} className={styler}>
        Locked Account
      </NavLink>
      <NavLink end to={adminRoutes.settings} className={styler}>
        Settings
      </NavLink>
      <NavLink end to={adminRoutes.edit_profile} className={styler}>
        Edit Profile
      </NavLink>
      <NavLink to={adminRoutes.proposals} className={styler}>
        Proposals
      </NavLink>
      <NavLink end to={`${adminRoutes.widget_config}/${id}`} className={styler}>
        Embed Widget
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm font-semibold font-heading",
  "text-orange-l1"
);
