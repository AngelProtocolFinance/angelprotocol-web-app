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
        <button
          {...linkStyles}
          type="button"
          id="governanceDropdown"
          data-dropdown-toggle="gDropdown"
          ref={govButtonRef}
          onClick={() =>
            showDropdown ? closeDropdown() : openDropdwonPopover()
          }
        >
          Governance
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          id="gDropdown"
          ref={govDropdownRef}
          className={`${
            showDropdown ? "block" : "hidden"
          } absolute top-10 left-0 bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-1" aria-labelledby="governanceDropdown">
            <li>
              <NavLink
                to={`${url}${app.auction}`}
                href="##"
                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Staking (Gov page)
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${url}${app.auction}`}
                href="##"
                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                HALO Swap (AMM page)
              </NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li className="mr-4">
        <NavLink to={`app/${app.tca}`} {...linkStyles}>
          Leaderboards
        </NavLink>
      </li>
    </ul>
  );
}
