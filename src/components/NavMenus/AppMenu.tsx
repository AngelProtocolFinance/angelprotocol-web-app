import { Link } from "react-router-dom";
import { site, web } from "types/routes";

export default function AppMenu() {
  const linkStyles = {
    className:
      "text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2",
  };
  return (
    <ul className="flex lg:items-center">
      <li>
        <Link to="/ap-litepaper.pdf" {...linkStyles} target="_blank" download>
          Litepaper
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
