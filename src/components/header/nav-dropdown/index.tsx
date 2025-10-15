import {
  Menu as HuiMenu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import bg_logo from "assets/images/bg-logo.webp";
import {
  BadgeCheck,
  GlobeIcon,
  LayoutGrid,
  LibraryIcon,
  MegaphoneIcon,
  MenuIcon,
  PanelsTopLeftIcon,
  SproutIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink, href } from "react-router";
import type { DetailedUser } from "types/auth";
import { UserAvatar } from "../user-avatar";
import { UserMenu } from "../user-menu";
import { styler } from "./common";

interface Props {
  auth_links: ReactNode | undefined;
  user: DetailedUser | undefined;
}

export function NavDropdown({ user, auth_links }: Props) {
  return (
    <HuiMenu>
      <MenuButton
        data-testid="nav_dropdown"
        className="group flex items-center gap-x-2"
        aria-label="Navigation Menu"
      >
        {user && (
          <UserAvatar
            avatar={user.avatar}
            classes="peer group-data-open:hidden"
          />
        )}
        <div className="peer-hover:text-blue hover:text-blue group-data-open:rotate-90 transition-transform ease-in-out">
          <MenuIcon
            size={24}
            className="group-data-open:hidden"
            aria-hidden="true"
          />
          <XIcon
            size={24}
            className="hidden group-data-open:block"
            aria-hidden="true"
          />
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom end", gap: 15 }}
        as="nav"
        className="relative grid grid-cols-[auto_1fr] isolate z-40 rounded-lg bg-gray-l6 drop-shadow-2xl origin-top transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="">
          <MenuSection className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-3 content-start p-4 sticky top-0 self-start">
            <p className="font-bold text-gray uppercase text-xs col-span-2">
              Nonprofit
            </p>
            <MenuItem>
              <NavLink
                to={user ? href("/register") : href("/register/welcome")}
                className={styler}
              >
                <BadgeCheck
                  size={19}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Become a Member!</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/donation-forms")} className={styler}>
                <PanelsTopLeftIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>All-In One Donation Form</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/fund-management")} className={styler}>
                <SproutIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Savings And Investments</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/fiscal-sponsorship")} className={styler}>
                <GlobeIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Fiscal Sponsorship</span>
              </NavLink>
            </MenuItem>

            <div className="w-full h-[1px] bg-gray-l3 mt-6 mb-1 col-span-full" />
            <MenuItem>
              <NavLink to={href("/marketplace")} className={styler}>
                <LayoutGrid
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Marketplace</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/fundraisers")} className={styler} end>
                <UsersIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Fundraisers</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/referral-program")} className={styler}>
                <MegaphoneIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Referral Program</span>
              </NavLink>
            </MenuItem>

            <div className="w-full mt-4 col-span-full" />
            <MenuItem>
              <NavLink to={href("/blog")} className={styler}>
                <LibraryIcon
                  size={18}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Blog</span>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={href("/about-us")} className={styler}>
                <img
                  src={bg_logo}
                  width={15}
                  height={15}
                  className="shrink-0 group-hover:-rotate-12 transition-transform group-hover:stroke-blue"
                />
                <span>Our Mission</span>
              </NavLink>
            </MenuItem>
          </MenuSection>
          {auth_links}
        </div>
        {user ? <UserMenu user={user} /> : null}
      </MenuItems>
    </HuiMenu>
  );
}
