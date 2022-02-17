import { NavLink, useRouteMatch } from "react-router-dom";
import { web } from "constants/routes";

//Will be for WebNav
export default function MobileNav() {
  //url = /
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `uppercase text-angel-grey hover:text-angel-blue font-semibold font-heading px-2 py-1 rounded-md`,
    activeClassName:
      "bg-angel-blue bg-opacity-10 shadow-inner pointer-events-none",
  };

  return (
    <div className="col-start-2 col-span-2  grid sm:hidden justify-items-end gap-1 bg-white font-body">
      <NavLink to={`${url}${web.charities}`} {...linkStyles}>
        For Charities
      </NavLink>
      <NavLink to={`${url}${web.donors}`} {...linkStyles}>
        For Donors
      </NavLink>
    </div>
  );
}
