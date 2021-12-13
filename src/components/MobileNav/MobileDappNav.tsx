import { NavLink, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";

//Will be for WebNav
export default function MobileDappNav() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `text-black hover:text-opacity-75 uppercase inline-flex items-center font-heading`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-angel-blue bg-white md:hidden p-5 rounded-sm shadow-lg fixed top-28 right-0 flex flex-col items-end w-full max-w-xs font-body text-base`}
    >
      <li className="mr-4">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/"
          {...linkStyles}
        >
          About us
        </a>
      </li>
      <li className="mr-4">
        <NavLink to={`${url}${app.marketplace}`} {...linkStyles}>
          For donors
        </NavLink>
      </li>
      <li className="mr-4 relative">
        <NavLink to={`${url}${app.govern}`} {...linkStyles}>
          Governance
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={`${url}${app.leaderboard}`} {...linkStyles}>
          Leaderboard
        </NavLink>
      </li>
    </ul>
  );
}
