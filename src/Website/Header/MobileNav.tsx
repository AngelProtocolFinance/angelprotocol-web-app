import { NavLink } from "react-router-dom";
import { web } from "constants/routes";
import createNavLinkStyler from "helpers/createNavLinkStyler";

//Will be for WebNav
export default function MobileNav() {
  return (
    <div className="col-start-2 col-span-2  grid sm:hidden justify-items-end gap-1 bg-white font-body">
      <NavLink to={`${web.charities}`} className={styler}>
        For Charities
      </NavLink>
      <NavLink to={`${web.donors}`} className={styler}>
        For Donors
      </NavLink>
    </div>
  );
}

const styler = createNavLinkStyler(
  "uppercase text-angel-grey hover:text-angel-blue font-semibold font-heading px-2 py-1 rounded-md",
  "bg-angel-blue/10 shadow-inner pointer-events-none"
);
