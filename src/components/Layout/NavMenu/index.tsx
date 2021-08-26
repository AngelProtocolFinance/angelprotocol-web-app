import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const linkStyles = {
  className: "uppercase text-white",
  activeClassName: "font-bold",
};

const NavMenu = () => {
  return (
    <ul className="flex">
      <li className="mr-4">
        <NavLink to={routes.login} {...linkStyles}>
          Login
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={routes.donate} {...linkStyles}>
          Donate Now
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={routes.dashboard} {...linkStyles}>
          For Charities
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.about_unsdgs} {...linkStyles}>
          About UNSDGs
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
