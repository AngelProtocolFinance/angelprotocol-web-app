import { Link, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";

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
        <Link to={`/contact`} {...linkStyles}>
          REGISTER
        </Link>
      </li>
      <li>
        <Link to={`${url}/${app.tca}`} {...linkStyles}>
          Donate
        </Link>
      </li>
    </ul>
  );
}
