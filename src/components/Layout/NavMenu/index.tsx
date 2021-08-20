import { NavLink } from "react-router-dom";

const linkStyles = {
  className: "uppercase text-white",
  activeClassName: "font-bold",
};

const NavMenu = () => {
  return (
    <ul className="flex">
      <li className="mr-4">
        <NavLink to="/about" {...linkStyles}>
          About
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/donate" {...linkStyles}>
          Donate Now
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to="/dashboard" {...linkStyles}>
          For Charities
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-unsdgs" {...linkStyles}>
          About UNSDGs
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
