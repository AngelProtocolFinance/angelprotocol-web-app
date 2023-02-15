import { NavLink } from "react-router-dom";
import { createNavLinkStyler } from "helpers";
import { adminRoutes } from "constants/routes";
import { useAdminResources } from "../Guard";

export default function Nav() {
  const { id } = useAdminResources();
  const {
    index,
    proposals,
    withdraws,
    invest,
    settings,
    edit_profile,
    widget_config,
  } = adminRoutes;

  return (
    <div className="grid gap-3 content-start">
      <NavLink end to={index.url} className={styler}>
        Dashboard
      </NavLink>
      <NavLink to={withdraws.url} className={styler}>
        Withdraws
      </NavLink>
      <NavLink to={invest.url} className={styler}>
        Invest dashboard
      </NavLink>
      <NavLink end to={settings.url} className={styler}>
        Settings
      </NavLink>
      <NavLink end to={edit_profile.url} className={styler}>
        Edit Profile
      </NavLink>

      <NavLink to={proposals.url} className={styler}>
        Proposals
      </NavLink>
      <NavLink end to={`${widget_config.url}/${id}`} className={styler}>
        Embed Widget
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "px-2 uppercase text-sm font-semibold font-heading",
  "text-orange-l1"
);
