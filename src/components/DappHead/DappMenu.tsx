import { NavLink } from "react-router-dom";
import { app, site } from "constants/routes";

export default function DappMenu() {
  const linkStyles = {
    className: `py-3 px-4 text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
    activeClassName:
      "rounded-md bg-white bg-opacity-10 shadow-inner pointer-events-none",
  };
  const getClassNames = ({ isActive }: { isActive: boolean }) =>
    `${linkStyles.className} ${isActive ? linkStyles.activeClassName : ""}`;

  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink className={getClassNames} to={`${site.app}/${app.marketplace}`}>
        Marketplace
      </NavLink>
      <NavLink to={`${site.app}/${app.govern}`} className={getClassNames}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.leaderboard}`} className={getClassNames}>
        Leaderboard
      </NavLink>
    </nav>
  );
}
