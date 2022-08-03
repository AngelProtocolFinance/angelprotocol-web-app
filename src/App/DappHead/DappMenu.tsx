import { NavLink } from "react-router-dom";
import { useMember } from "services/juno/admin/queriers";
import createNavLinkStyler from "helpers/createNavLinkStyler";
import { appRoutes, siteRoutes } from "constants/routes";

export default function DappMenu() {
  const { member } = useMember("apTeam");
  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink
        className={styler}
        to={`${siteRoutes.index}/${appRoutes.marketplace}`}
      >
        Marketplace
      </NavLink>
      {/* 
      NOTE: Governance will be reenabled when we relaunch the $HALO token
      <NavLink to={`${siteRoutes.index}/${appRoutes.govern}`} className={styler}>
        Governance
      </NavLink> */}
      <NavLink
        to={`${siteRoutes.index}/${appRoutes.leaderboard}`}
        className={styler}
      >
        Leaderboard
      </NavLink>
      {member.weight && (
        <NavLink
          to={`${siteRoutes.index}/${appRoutes.admin}`}
          className={styler}
        >
          Admin
        </NavLink>
      )}
    </nav>
  );
}

const styler = createNavLinkStyler(
  "py-3 px-4 text-white-grey hover:text-white-grey/75 uppercase inline-flex items-center font-heading font-semibold",
  "rounded-md bg-white/10 shadow-inner pointer-events-none"
);
