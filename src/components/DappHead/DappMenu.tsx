import { NavLink } from "react-router-dom";
import { app, site } from "constants/routes";
import { useMember } from "services/terra/admin/queriers";
import createNavLinkStyler from "helpers/createNavLinkStyler";

export default function DappMenu() {
  const { member } = useMember("apTeam");

  const styler = createNavLinkStyler(
    "py-3 px-4 text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold",
    "rounded-md bg-white bg-opacity-10 shadow-inner pointer-events-none"
  );

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
      {member.weight && (
        <NavLink to={`${site.app}/${app.admin}`} className={styler}>
          Admin
        </NavLink>
      )}
    </nav>
  );
}
