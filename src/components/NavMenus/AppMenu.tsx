import { Link, useRouteMatch } from "react-router-dom";
import { site, web, app } from "types/routes";

export default function AppMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className:
      "text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2",
  };
  return (
    <ul className="flex lg:items-center">
      <li>
        <Link to={`${url}${app.index}`} {...linkStyles}>
          Leaderboards
        </Link>
      </li>
      <li>
        <Link to={`${site.home}${web.index}`} {...linkStyles}>
          About
        </Link>
      </li>
      <li>
        <Link to={`${site.home}${web.charities}`} {...linkStyles}>
          For charities
        </Link>
      </li>
      <li>
        <Link to={`${site.home}${web.donors}`} {...linkStyles}>
          For donors
        </Link>
      </li>
    </ul>
  );
}
