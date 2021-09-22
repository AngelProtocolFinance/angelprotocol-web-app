import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `text-${textColor} hover:text-opacity-75 font-semibold`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-${textColor} hidden md:flex justify-self-end items-center font-body text-sm lg:text-base mr-4`}
    >
      <li className="mr-4">
        <NavLink to={routes.donors} {...linkStyles}>
          For Donors
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={routes.charities} {...linkStyles}>
          For Charities
        </NavLink>
      </li>
      <li className="mr-4 bg-angel-blue rounded-sm shadow-md">
        <NavLink
          to={routes.tca}
          className="text-center text-white-grey text-sm font-black py-1 w-24 block"
        >
          Donate
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
