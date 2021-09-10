import Search from "components/Search/Search";
import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `uppercase text-${textColor} py-1 border-b border-transparent`,
    activeClassName: "border-current",
  };

  return (
    <ul
      className={`text-${textColor} hidden md:flex justify-self-end font-body text-sm lg:text-base mr-4`}
    >
      <li className="mr-4">
        <NavLink to={routes.donate} {...linkStyles}>
          Donate
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
