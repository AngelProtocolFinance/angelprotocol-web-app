import { NavLink, Link } from "react-router-dom";
import { app, site } from "types/routes";

export default function DappMenu() {
  const linkStyles = {
    className: `text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
    activeClassName: "font-bold",
  };

  return (
    <nav
      className={`hidden sm:flex row-start-2 col-span-2 md:row-start-1 md:col-span-1 md:col-start-2 flex gap-2 justify-self-end items-center font-body text-sm lg:text-base ml-2`}
    >
      <Link className={linkStyles.className} to={`${site.home}`}>
        About us
      </Link>
      <NavLink to={`${site.app}/${app.charity}`} {...linkStyles}>
        Donate now
      </NavLink>
      <NavLink to={`${site.app}/${app.govern}`} {...linkStyles}>
        Governance
      </NavLink>
      <NavLink to={`${site.app}/${app.leaderboard}`} {...linkStyles}>
        Leaderboard
      </NavLink>
    </nav>
  );
}
