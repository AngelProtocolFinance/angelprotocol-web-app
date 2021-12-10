import { NavLink, useRouteMatch } from "react-router-dom";
import { createRef, useState } from "react";
import { app } from "types/routes";
import { createPopper } from "@popperjs/core/lib/createPopper";

//Will be for WebNav
export default function MobileDappNav() {
  //url = /
  const { url } = useRouteMatch();

  const linkStyles = {
    className: `text-black hover:text-opacity-75 uppercase inline-flex items-center font-heading`,
    activeClassName: "font-bold",
  };
  const govButtonRef = createRef<any>();
  const govDropdownRef = createRef<any>();
  const [showDropdown, setShowDropdown] = useState(false);

  const openDropdwonPopover = () => {
    createPopper(govButtonRef.current, govDropdownRef.current, {
      placement: "bottom-start",
    });
    setShowDropdown(true);
  };

  const closeDropdown = () => setShowDropdown(false);
  return (
    <ul
      className={`text-angel-blue bg-white md:hidden p-5 rounded-sm shadow-lg fixed top-28 right-0 flex flex-col items-end w-full max-w-xs font-body text-base`}
    >
      <li className="mr-4">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/"
          {...linkStyles}
        >
          About us
        </a>
      </li>
      <li className="mr-4">
        <NavLink to={`app/${app.marketplace}`} {...linkStyles}>
          For donors
        </NavLink>
      </li>
      <li className="mr-4 relative">
        <NavLink to={`app/${app.govern}`} {...linkStyles}>
          Governance
        </NavLink>
      </li>
      <li className="mr-4">
        <NavLink to={`app/${app.tca}`} {...linkStyles}>
          Leaderboards
        </NavLink>
      </li>
    </ul>
  );
}
