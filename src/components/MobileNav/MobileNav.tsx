import { NavLink, useRouteMatch } from "react-router-dom";
import { app, web, site } from "types/routes";

//Will be for WebNav
export default function MobileNav() {
  //url = /
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `uppercase text-angel-blue`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-angel-blue bg-white md:hidden p-5 rounded-sm shadow-lg fixed top-28 right-0 flex flex-col items-end w-full max-w-xs font-body text-base`}
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
      <li className="mr-4">
        <NavLink to={`${site.app}/${app.register}`} {...linkStyles}>
          Register
        </NavLink>
      </li>
      <li className="">
        <NavLink to={`${site.app}/${app.tca}`} {...linkStyles}>
          Donate
        </NavLink>
      </li>
    </ul>
  );
}
