import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `text-${textColor} hover:text-opacity-75 uppercase`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-${textColor} hidden md:flex justify-self-end items-center font-body text-sm lg:text-base mr-4`}
    >
      <li className="mr-4">
        <NavLink to={routes.dashboard} {...linkStyles}>
          Charities
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={routes.about_unsdgs} {...linkStyles}>
          UNSDGs
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={`${routes.register}/index`} {...linkStyles}>
          Register
        </NavLink>
      </li>
      <li className="">
        <NavLink to={routes.donate} {...linkStyles}>
          Donate
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
