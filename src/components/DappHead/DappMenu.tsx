import { NavLink } from "react-router-dom";
import { app, site } from "types/routes";

export default function DappMenu() {
  const linkStyles = {
    className: `py-3 px-4 text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
    activeClassName:
      "rounded-md bg-white bg-opacity-10 shadow-inner pointer-events-none",
  };

  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <NavLink to={`${site.app}/${app.marketplace}`} {...linkStyles}>
        Marketplace
      </NavLink>
      <NavLink to={`${site.app}/${app.govern}`} {...linkStyles}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.leaderboard}`} {...linkStyles}>
        Leaderboard
      </NavLink>
      <NavLink to={`${site.app}/${app.admin}`} {...linkStyles}>
        Admin
      </NavLink>
    </nav>
  );
}
