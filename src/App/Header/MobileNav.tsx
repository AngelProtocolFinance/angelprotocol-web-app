import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { AP_ID, REVIEWER_ID } from "services/juno/custom";
import Icon from "components/Icon";
import { AdminLink } from "components/admin";
import { createNavLinkStyler } from "helpers";
import { appRoutes } from "constants/routes";

const styler = createNavLinkStyler(
  "text-white/75 uppercase inline-flex items-center font-heading",
  "text-angel-orange"
);

export default function MobileNav() {
  return (
    <Menu as={Fragment}>
      <Menu.Button className="text-white-grey ml-2 lg:hidden">
        {({ open }) => (
          <Icon type={open ? "Close" : "Menu"} className="text-2xl" />
        )}
      </Menu.Button>
      <Menu.Items
        as="nav"
        className="lg:hidden flex flex-col items-end col-span-3 rounded-sm w-full font-extrabold text-base gap-1 pt-2"
      >
        <Menu.Item as={Fragment}>
          <NavLink to={appRoutes.index} className={styler} end>
            Marketplace
          </NavLink>
        </Menu.Item>
        <Menu.Item as={Fragment}>
          <NavLink to={appRoutes.leaderboard} className={styler}>
            Leaderboard
          </NavLink>
        </Menu.Item>
        <Menu.Item as={Fragment}>
          <AdminLink label="admin" className={styler} id={AP_ID} />
        </Menu.Item>
        <Menu.Item as={Fragment}>
          <AdminLink label="applications" className={styler} id={REVIEWER_ID} />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
