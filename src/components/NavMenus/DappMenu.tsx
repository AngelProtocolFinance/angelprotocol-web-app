import { NavLink } from "react-router-dom";
import { app, site } from "types/routes";

export default function DappMenu() {
  const linkStyles = {
    className: `text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`hidden lg:flex justify-self-end items-center font-body text-sm lg:text-base`}
    >
      <li className="mr-8">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/"
          className={linkStyles.className}
        >
          About us
        </a>
      </li>
      <li className="mr-8">
        {/* use abs path since this menu is rendered on diff urls
         * and will result on unusual url e.g `app/leaderboard/govern
         */}
        <NavLink to={`${site.app}/${app.charity}`} {...linkStyles}>
          Donate now
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${site.app}/${app.govern}`} {...linkStyles}>
          Governance
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${site.app}/${app.leaderboard}`} {...linkStyles}>
          Leaderboard
        </NavLink>
      </li>
    </ul>
  );
}
