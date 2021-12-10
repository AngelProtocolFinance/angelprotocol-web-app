import { NavLink, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";

export default function DappMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`hidden md:flex justify-self-end items-center font-body text-sm lg:text-base`}
    >
      <li className="mr-8">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/"
          {...linkStyles}
        >
          About us
        </a>
      </li>
      <li className="mr-8">
        <NavLink to={`${url}/${app.charity}`} {...linkStyles}>
          Donate now
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${url}/${app.govern}`} {...linkStyles}>
          Governance
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${url}/${app.leaderboard}`} {...linkStyles}>
          Leaderboard
        </NavLink>
      </li>
    </ul>
  );
}
