import { NavLink, useRouteMatch } from "react-router-dom";
import { web, site } from "types/routes";

//Will be for WebNav
export default function MobileNav() {
  //url = /
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `uppercase hover:text-opacity-75`,
  };

  return (
    <ul className="bg-white md:hidden p-5 rounded-sm shadow-lg fixed top-28 right-0 flex flex-col items-end w-full max-w-xs font-body text-base">
      <li className="mr-4">
        <NavLink
          to={`${url}${web.charities}`}
          className={`${linkStyles.className} text-angel-blue`}
        >
          For Charities
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink
          to={`${url}${web.donors}`}
          className={`${linkStyles.className} text-angel-blue`}
        >
          For Donors
        </NavLink>
      </li>
      <li className="mr-4 mt-3">
        <NavLink
          to={`${site.app}/`}
          className={`${linkStyles.className} text-white border py-2 px-4 border-opacity-40 border-angel-orange rounded-md bg-angel-orange hover:bg-white hover:text-angel-orange`}
        >
          Donate
        </NavLink>
      </li>
    </ul>
  );
}
