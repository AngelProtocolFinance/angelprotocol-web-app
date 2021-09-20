import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `uppercase text-${textColor} hover:text-opacity-75`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-${textColor} hidden md:flex justify-self-end  font-body text-base mr-4`}
    >
      <li className="mr-4">
        <NavLink to={routes.tca} {...linkStyles}>
          Donate
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={routes.charities} {...linkStyles}>
          Charities
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
