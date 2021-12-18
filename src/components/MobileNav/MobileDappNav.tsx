import { NavLink } from "react-router-dom";
import { app, site } from "types/routes";

//Will be for WebNav
export default function MobileDappNav() {
  const linkStyles = {
    className: `text-white hover:text-opacity-75 uppercase inline-flex items-center font-heading`,
    activeClassName: "font-bold",
  };
  return (
    <nav
      className={`lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2`}
    >
      <a
        rel="noreferrer"
        target="_blank"
        href="https://www.angelprotocol.io/"
        {...linkStyles}
      >
        About us
      </a>
      <NavLink to={`${site.app}/${app.marketplace}`} {...linkStyles}>
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
