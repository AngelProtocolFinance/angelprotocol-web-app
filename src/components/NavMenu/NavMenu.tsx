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
      className={`text-${textColor} hidden md:flex justify-self-end  font-body text-base mr-4`}
    >
      <li className="mr-4">
        <NavLink to={routes.tca} {...linkStyles}>
          Donate
        </NavLink>
      </li>
      <li>
        <NavLink to={routes.contact} {...linkStyles}>
          Contact Us
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
