import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import AppLinks from "./AppLinks";
import {
  ADMIN_INVESTMENTS_PORTAL_ID,
  ADMIN_NAV_PORTAL_ID,
} from "./portals/admin";

export default function MobileNav() {
  return (
    <Popover className="relative">
      <Popover.Button className="text-white-grey ml-2 lg:hidden">
        {({ open }) => (
          <Icon type={open ? "Close" : "Menu"} className="text-2xl" />
        )}
      </Popover.Button>
      <Popover.Panel
        as="nav"
        className="lg:hidden min-w-max absolute top-full right-0 mt-1 p-4 z-20 bg-zinc-50 rounded-lg shadow-xl"
      >
        <AppLinks />
        <div
          id={ADMIN_NAV_PORTAL_ID}
          className="empty:hidden border-t mt-4 pt-2"
        />
        <div
          id={ADMIN_INVESTMENTS_PORTAL_ID}
          className="empty:hidden border-t mt-4 pt-2"
        />
      </Popover.Panel>
    </Popover>
  );
}
