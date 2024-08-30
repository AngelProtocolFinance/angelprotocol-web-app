import {
  Menu as HuiMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { createNavLinkStyler } from "helpers";
import { NavLink } from "react-router-dom";
import { logout } from "slices/auth";
import { useGetter, useSetter } from "store/accessors";
import type { Link } from "../types";
import Menu from "./UserMenu/Menu";

type Props = { links: Link[] };

export default function NavDropdown({ links }: Props) {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();

  return (
    <HuiMenu>
      <MenuButton
        data-testid="nav_dropdown"
        className="text-white data-[open]:text-white/90 group flex justify-center items-center hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        <Icon
          type="Menu"
          size={24}
          className="text-navy-l2 data-[open]:text-navy-l2/70 sm:hidden transition duration-150 ease-in-out group-hover:text-navy-l2/80"
          aria-hidden="true"
        />
        <Icon
          type="ChevronDown"
          size={24}
          className="text-blue-d7 data-[open]:text-blue-d7/70 max-sm:hidden transition duration-150 ease-in-out group-hover:text-blue-d7/80"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        anchor={{ to: "bottom end", gap: 10 }}
        as="nav"
        className="grid isolate z-40 rounded-lg bg-gray-l6 drop-shadow-2xl scroller"
      >
        <div className="p-5 grid gap-y-2 w-72">
          {links.map((link) => (
            <MenuItem key={link.title}>
              <NavLink to={link.href} end={link.end} className={styler}>
                {link.title}
              </NavLink>
            </MenuItem>
          ))}
        </div>
        {user && user !== "loading" && (
          <Menu user={user} signOut={() => dispatch(logout())} classes="" />
        )}
        {user && user === "loading" && (
          <div className="p-5">
            <LoaderRing thickness={10} classes="w-6" />
          </div>
        )}
      </MenuItems>
    </HuiMenu>
  );
}

const styles =
  "text-blue font-body font-semibold w-full hover:underline hover:text-blue-d1";
const styler = createNavLinkStyler(styles, "pointer-events-none text-navy-d4");
