import { NavLink } from "react-router-dom";
import { web } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

export default function WebMenu() {
  return (
    <nav className="hidden sm:flex justify-self-end items-center font-body text-sm lg:text-base">
      <NavLink to={`${web.charities}`} className={styler}>
        For Charities
      </NavLink>

      <NavLink to={`${web.donors}`} className={styler}>
        For Donors
      </NavLink>
    </nav>
  );
}

const styler = createNavLinkStyler(
  "hover:text-angel-orange uppercase inline-flex items-center text-angel-blue p-2 rounded-md",
  "shadow-inner bg-angel-blue/10 pointer-events-none"
);
