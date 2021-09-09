import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `uppercase text-${textColor}`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-${textColor} hidden md:flex justify-self-end  font-body text-base mr-3`}
    >
      <li className="mr-4">
        <NavLink to={routes.tca} {...linkStyles}>
          Donate Now
        </NavLink>
      </li>
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
      <li>
        <NavLink to={routes.register} {...linkStyles}>
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
