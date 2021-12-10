import { NavLink } from "react-router-dom";
import { app } from "types/routes";
import { useRouteMatch } from "react-router-dom";
import { createRef, useState } from "react";
import { createPopper } from "@popperjs/core/lib/createPopper";

export default function DappMenu() {
  const { url } = useRouteMatch();
  const linkStyles = {
    className: `text-white-grey hover:text-opacity-75 uppercase inline-flex items-center font-heading font-semibold`,
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
  const path = url.split("/").length >= 2 ? "/app" : "";

  return (
    <ul
      className={`hidden md:flex justify-self-end items-center font-body text-sm lg:text-base`}
    >
      <li className="mr-8">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.angelprotocol.io/"
          {...linkStyles}
        >
          About us
        </a>
      </li>
      <li className="mr-8">
        <NavLink to={`${path}/${app.charity}`} {...linkStyles}>
          Donate now
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${path}/${app.govern}`} {...linkStyles}>
          Governance
        </NavLink>
      </li>
      <li className="mr-8">
        <NavLink to={`${path}/${app.tca}`} {...linkStyles}>
          Leaderboards
        </NavLink>
      </li>
    </ul>
  );
}
