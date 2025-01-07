import {
  Menu as HuiMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import LoaderRing from "components/LoaderRing";
import { ChevronDown, CornerDownRight, MenuIcon } from "lucide-react";
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
        <MenuIcon
          size={24}
          className="text-navy-l2 data-[open]:text-navy-l2/70 sm:hidden transition duration-150 ease-in-out group-hover:text-navy-l2/80"
          aria-hidden="true"
        />
        <ChevronDown
          size={20}
          className="text-blue-d7 data-[open]:text-blue-d7/70 max-sm:hidden transition duration-150 ease-in-out group-hover:text-blue-d7/80"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor={{ to: "bottom end", gap: 10 }}
        as="nav"
        className="grid isolate z-40 rounded-lg bg-gray-l6 drop-shadow-2xl scroller origin-top transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="p-5 grid gap-y-2 w-80">
          {links.map((link) => (
            <MenuItem key={link.title}>
              <NavLink
                to={link.href}
                end={link.end}
                className={({ isActive }) =>
                  `${link.sub ? "flex items-center gap-2" : ""} text-blue font-body font-semibold w-full hover:underline hover:text-blue-d1 ${isActive ? "pointer-events-none text-navy-d4" : ""}`
                }
              >
                {link.sub ? (
                  <CornerDownRight strokeWidth={1.5} size={15} />
                ) : null}{" "}
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
