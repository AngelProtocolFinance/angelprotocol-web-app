import { NavLink, useRouteMatch } from "react-router-dom";
import { web, site } from "types/routes";

//Will be for WebNav
export default function MobileNav() {
  //url = /
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `uppercase hover:text-opacity-75 text-angel-grey`,
    activeClassName: "text-angel-orange",
  };

  return (
    <div className="grid mt-2 w-56 rounded-md justify-items-end gap-2 bg-white md:hidden p-4 rounded-sm font-body">
      <NavLink to={`${url}${web.charities}`} {...linkStyles}>
        For Charities
      </NavLink>
      <NavLink to={`${url}${web.donors}`} {...linkStyles}>
        For Donors
      </NavLink>
      <NavLink
        to={`${site.app}/`}
        className={`text-white text-center uppercase font-bold border py-2 px-4 border-opacity-40 border-angel-orange rounded-md bg-angel-orange hover:bg-white hover:text-angel-orange`}
      >
        Donate
      </NavLink>
    </div>
  );
}
