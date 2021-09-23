import { useHeaderColors } from "contexts/HeaderColorProvider";
import { NavLink } from "react-router-dom";
import { routes } from "types/types";

export default function MobileNav() {
  const { textColor, bgColor } = useHeaderColors();
  const linkStyles = {
    className: `uppercase ${textColor}`,
    activeClassName: "font-bold",
  };

  return (
    <ul
      className={`text-${textColor} bg-${bgColor} md:hidden p-5 rounded-sm shadow-lg fixed top-28 right-0 flex flex-col items-end w-full max-w-xs font-body text-base`}
    >
      <li className="mb-2">
        <NavLink to={routes.tca} {...linkStyles}>
          Donate
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink to={routes.dashboard} {...linkStyles}>
          Charities
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink to={routes.about_unsdgs} {...linkStyles}>
          UNSDGs
        </NavLink>
      </li>
      <li>
        <NavLink to={`${routes.register}/index`} {...linkStyles}>
          Register
        </NavLink>
      </li>
    </ul>
  );
}
