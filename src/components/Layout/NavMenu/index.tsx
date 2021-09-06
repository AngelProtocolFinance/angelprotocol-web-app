import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

const NavMenu = () => {
  const { textColor } = useHeaderColors();
  const linkStyles = {
    className: `uppercase ${textColor}`,
    activeClassName: "font-bold",
  };

  return (
    <ul className={`w-9/12 ml-5 ${textColor} flex font-body text-base `}>
      <li className="mr-4">
        <NavLink to={routes.registration} {...linkStyles}>
          Register
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
