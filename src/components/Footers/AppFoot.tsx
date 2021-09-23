import { Link } from "react-router-dom";
import { routes } from "types/types";

export default function AppFoot() {
  const linkStyles = {
    className:
      "text-white-grey text-sm px-1 lg:text-base font-heading uppercase font-semibold lg:px-2",
  };
  return (
    <div className="fixed bottom-0  w-full px-5 py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between xl:container xl:mx-auto ">
      <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
        <ul className="flex lg:items-center">
          <li>
            <Link to={routes.home} {...linkStyles}>
              About us
            </Link>
          </li>
          <li>
            <Link to={routes.donors} {...linkStyles}>
              For Donors
            </Link>
          </li>
          <li>
            <Link to={routes.charities} {...linkStyles}>
              For Charities
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
        Copyright 2021 Angel Protocol. All rights reserved
      </p>
    </div>
  );
}
