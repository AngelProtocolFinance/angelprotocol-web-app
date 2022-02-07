import { Link } from "react-router-dom";
import { app } from "types/routes";
import { useRouteMatch } from "react-router-dom";

export default function AppMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className:
      "text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2",
  };

  return (
    <ul className="flex lg:items-center">
      <li>
        <Link to={`/`} {...linkStyles}>
          ABOUT US
        </Link>
      </li>
      <li>
        <Link to={`${url}/${app.leaderboard}`} {...linkStyles}>
          LEADERBOARD
        </Link>
      </li>
      <li>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/contact"
          {...linkStyles}
        >
          REGISTER
        </a>
      </li>
      <li>
        <Link to={`${url}/${app.tca}`} {...linkStyles}>
          DONATE
        </Link>
      </li>
    </ul>
  );
}
