import { NavLink } from "react-router-dom";
import { app, site, web } from "types/routes";
import { useRouteMatch } from "react-router-dom";

export default function WebMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `text-angel-blue hover:text-opacity-75 uppercase inline-flex items-center`,
    activeClassName: "font-bold",
  };
  return (
    <ul className="hidden md:flex justify-self-end items-center font-body text-sm lg:text-base">
      <li className="mr-4">
        <NavLink to={`${url}${web.charities}`} {...linkStyles}>
          For Charities
        </NavLink>
      </li>
      <li className="mr-4 relative">
        <NavLink to={`${url}${web.donors}`} {...linkStyles}>
          For Donors
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink
          to={`${site.app}${app.index}`}
          className={`${linkStyles.className} border py-2 px-4 border-opacity-40 border-angel-orange rounded-md bg-white hover:bg-angel-orange hover:text-white text-orange`}
        >
          Donate
        </NavLink>
      </li>
    </ul>
  );
}
