import { NavLink } from "react-router-dom";
import { app, site, web } from "types/routes";
import { useRouteMatch } from "react-router-dom";

export default function WebMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `hover:text-angel-orange uppercase inline-flex items-center text-angel-blue p-2 rounded-md`,
    activeClassName:
      "shadow-inner bg-angel-blue bg-opacity-10 pointer-events-none",
  };
  return (
    <div className="hidden md:flex justify-self-end items-center font-body text-sm lg:text-base">
      <NavLink to={`${url}${web.charities}`} {...linkStyles}>
        For Charities
      </NavLink>

      <NavLink to={`${url}${web.donors}`} {...linkStyles}>
        For Donors
      </NavLink>

      <NavLink
        to={`${site.app}/${app.marketplace}`}
        className={`border ml-4 py-2 px-4 border-opacity-40 border-angel-orange rounded-md bg-angel-orange text-white transform hover:scale-105 hover:shadow-lg active:translate-x-1 active:shadow-md`}
      >
        Donate
      </NavLink>
    </div>
  );
}
