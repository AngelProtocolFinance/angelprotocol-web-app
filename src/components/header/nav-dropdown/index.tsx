import {
  Menu as HuiMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { appRoutes } from "constants/routes";
import { ChevronDown, CornerDownRight, MenuIcon } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";
import type { DetailedUser } from "types/auth";
import { UserMenu } from "../user-menu";
import { styler } from "./common";

interface Props {
  auth_links: ReactNode | undefined;
  user: DetailedUser | null;
}

export function NavDropdown({ user, auth_links }: Props) {
  return (
    <HuiMenu>
      <MenuButton
        data-testid="nav_dropdown"
        className="text-white data-open:text-white/90 group flex justify-center items-center hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75"
        aria-label="Navigation Menu"
      >
        <MenuIcon
          size={24}
          className="text-gray data-open:text-gray/70 sm:hidden transition duration-150 ease-in-out group-hover:text-gray/80"
          aria-hidden="true"
        />
        <ChevronDown
          size={20}
          className="text-blue-d7 data-open:text-blue-d7/70 max-sm:hidden transition duration-150 ease-in-out group-hover:text-blue-d7/80"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom end", gap: 10 }}
        as="nav"
        className="grid isolate z-40 rounded-lg bg-gray-l6 drop-shadow-2xl scroller origin-top transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="p-5 grid gap-y-2 w-80">
          <MenuItem>
            <NavLink to={appRoutes.home} end className={styler}>
              Home
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.nonprofit_info} className={styler}>
              For Nonprofits
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to={appRoutes.register + (user ? "/" : "/welcome")}
              className={styler}
            >
              <CornerDownRight strokeWidth={1.5} size={15} />
              <span>Register NPO</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.donor_info} className={styler}>
              For Donors
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.marketplace} className={styler}>
              <CornerDownRight strokeWidth={1.5} size={15} />
              <span>Marketplace</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.funds} className={styler} end>
              <CornerDownRight strokeWidth={1.5} size={15} />
              Fundraisers
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.blog} className={styler}>
              Blog
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="referral-program" className={styler}>
              Referral Program
            </NavLink>
          </MenuItem>
          {auth_links}
        </div>
        {user ? <UserMenu user={user} /> : null}
      </MenuItems>
    </HuiMenu>
  );
}
