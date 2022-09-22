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
        className="lg:hidden rounded-sm min-w-max max-w-[90vw] flex flex-wrap gap-1 absolute p-4 z-10 bg-zinc-50 right-0 top-full mt-1 rounded-lg shadow-xl"
      >
        <AppLinks />
        <div id={ADMIN_NAV_PORTAL_ID} />
        <div id={ADMIN_INVESTMENTS_PORTAL_ID} />
      </Popover.Panel>
    </Popover>
  );
}
