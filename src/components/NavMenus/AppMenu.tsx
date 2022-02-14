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
        <Link
          to={`https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37`}
          {...linkStyles}
        >
          SUPPORT
        </Link>
      </li>
      <li>
        <Link
          to={`https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37`}
          {...linkStyles}
        >
          FEEDBACK
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
    </ul>
  );
}
