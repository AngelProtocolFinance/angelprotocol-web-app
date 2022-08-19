import { Popover } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Icon from "components/Icon";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

const styler = createNavLinkStyler(
  "text-white/75 uppercase inline-flex items-center font-heading",
  "text-angel-orange"
);

export default function MobileNav() {
  return (
    <Popover as={Fragment}>
      <Popover.Button className="text-white-grey ml-2 lg:hidden">
        {({ open }) => (
          <Icon type={open ? "Close" : "Menu"} className="text-2xl" />
        )}
      </Popover.Button>
      <Popover.Panel
        as="nav"
        className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2"
      >
        <NavLink to={appRoutes.index} className={styler} end>
          Marketplace
        </NavLink>
        <NavLink to={appRoutes.leaderboard} className={styler}>
          Leaderboard
        </NavLink>
      </Popover.Panel>
    </Popover>
  );
}
