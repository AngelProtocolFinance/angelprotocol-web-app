import { NavLink } from "react-router-dom";
import { web } from "constants/routes";

export default function WebMenu() {
  const linkStyles = {
    className: `hover:text-angel-orange uppercase inline-flex items-center text-angel-blue p-2 rounded-md`,
    activeClassName: "shadow-inner bg-angel-blue/10 pointer-events-none",
  };
  const getClassNames = ({ isActive }: { isActive: boolean }) =>
    `${linkStyles.className} ${isActive ? linkStyles.activeClassName : ""}`;

  return (
    <nav className="hidden sm:flex justify-self-end items-center font-body text-sm lg:text-base">
      <NavLink to={`${web.charities}`} className={getClassNames}>
        For Charities
      </NavLink>

      <NavLink to={`${web.donors}`} className={getClassNames}>
        For Donors
      </NavLink>
    </nav>
  );
}
