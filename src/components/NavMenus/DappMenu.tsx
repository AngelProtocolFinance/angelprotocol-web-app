import { NavLink, Link } from "react-router-dom";
import { app, site } from "types/routes";

export default function DappMenu() {
  const linkStyles = {
    className: `text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold ml-2 mr-2`,
    activeClassName: "font-bold",
  };

  return (
    <nav className="hidden lg:flex lg:row-start-1 lg:col-span-1 lg:col-start-2 flex gap-2 justify-self-end items-center font-body text-sm lg:text-base ml-2">
      <Link
        className={linkStyles.className}
        to={`${site.app}/${app.marketplace}`}
      >
        Marketplace
      </Link>
      {/*      <NavLink to={`${site.app}/${app.tca}`} {...linkStyles}>
        Donate now
      </NavLink>*/}
      <NavLink to={`${site.app}/${app.govern}`} {...linkStyles}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.index}`} {...linkStyles}>
        Leaderboard
      </NavLink>
      <NavLink to={`${site.app}/${app.admin}`} {...linkStyles}>
        Admin
      </NavLink>
    </nav>
  );
}
