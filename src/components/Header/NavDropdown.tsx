import {
  Menu as HuiMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { NavLink, useLocation } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { createNavLinkStyler } from "helpers";
import { ChevronDown, CornerDownRight, MenuIcon } from "lucide-react";
import type { DetailedUser } from "types/auth";
import Menu from "./UserMenu/Menu";

interface Props {
  isInAuth: boolean;
  user: DetailedUser | null;
}

export default function NavDropdown({ user, isInAuth }: Props) {
  const { pathname: p, search: s } = useLocation();
  const to = p + s;

  return (
    <HuiMenu>
      <MenuButton
        data-testid="nav_dropdown"
        className="text-white data-open:text-white/90 group flex justify-center items-center hover:text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white/75"
        aria-label="Navigation Menu"
      >
        <MenuIcon
          size={24}
          className="text-navy-l2 data-open:text-navy-l2/70 sm:hidden transition duration-150 ease-in-out group-hover:text-navy-l2/80"
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
            <NavLink to={appRoutes.funds} className={styler}>
              <CornerDownRight strokeWidth={1.5} size={15} />
              Fundraisers
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={appRoutes.blog} className={styler}>
              Blog
            </NavLink>
          </MenuItem>

          {!isInAuth && (
            <MenuItem>
              <NavLink
                to={appRoutes.signin + `?redirect=${to}`}
                className={styles + " sm:hidden"}
              >
                Login
              </NavLink>
            </MenuItem>
          )}
          {!isInAuth && (
            <MenuItem>
              <NavLink
                to={appRoutes.signup + `?redirect=${to}`}
                className={styles + " sm:hidden"}
              >
                Sign up
              </NavLink>
            </MenuItem>
          )}
        </div>
        {user ? <Menu user={user} /> : null}
      </MenuItems>
    </HuiMenu>
  );
}

const styles =
  "text-blue font-body font-semibold w-full hover:underline hover:text-blue-d1 flex items-center gap-x-2";
const styler = createNavLinkStyler(styles, "pointer-events-none text-navy-d4");
