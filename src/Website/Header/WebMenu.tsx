import { NavLink } from "react-router-dom";
import { web } from "constants/routes";
import { useRouteMatch } from "react-router-dom";

export default function WebMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `hover:text-angel-orange uppercase inline-flex items-center text-angel-blue p-2 rounded-md`,
    activeClassName:
      "shadow-inner bg-angel-blue bg-opacity-10 pointer-events-none",
  };
  return (
    <nav className="hidden sm:flex justify-self-end items-center font-body text-sm lg:text-base">
      <NavLink to={`${url}${web.charities}`} {...linkStyles}>
        For Charities
      </NavLink>

      <NavLink to={`${url}${web.donors}`} {...linkStyles}>
        For Donors
      </NavLink>
    </nav>
  );
}
