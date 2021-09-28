import { NavLink } from "react-router-dom";
import { app, site, web } from "types/routes";
import { useRouteMatch } from "react-router-dom";

export default function WebMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `text-angel-blue hover:text-opacity-75 uppercase`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`hidden md:flex justify-self-end items-center font-body text-sm lg:text-base`}
    >
      <li className="mr-4">
        <NavLink to={`${url}${web.charities}`} {...linkStyles}>
          For Charities
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={`${url}${web.donors}`} {...linkStyles}>
          For Donors
        </NavLink>
      </li>
      {/* <li className="">
        <NavLink
          to={`${site.app}/${app.tca}`}
          className="uppercase block w-24 text-center p-1 rounded-lg text-white bg-angel-blue"
        >
          Donate
        </NavLink>
      </li> */}
    </ul>
  );
}
