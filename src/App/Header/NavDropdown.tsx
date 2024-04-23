import { Popover, Transition } from "@headlessui/react";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import LoaderRing from "components/LoaderRing";
import { createNavLinkStyler } from "helpers";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "slices/auth";
import { useGetter, useSetter } from "store/accessors";
import { Link } from "../types";
import Menu from "./UserMenu/Menu";

type Props = { links: Link[] };

export default function NavDropdown({ links }: Props) {
  const user = useGetter((state) => state.auth.user);
  const dispatch = useSetter();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            data-testid="nav_dropdown"
            className={`${
              open ? "text-white" : "text-white/90"
            } group flex justify-center items-center hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <Icon
              type="Menu"
              size={24}
              className={`${
                open ? "text-navy-l2" : "text-navy-l2/70"
              } sm:hidden transition duration-150 ease-in-out group-hover:text-navy-l2/80`}
              aria-hidden="true"
            />
            <Icon
              type="ChevronDown"
              size={24}
              className={`${
                open ? "text-blue-d7" : "text-blue-d7/70"
              } max-sm:hidden transition duration-150 ease-in-out group-hover:text-blue-d7/80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 sm:w-screen max-w-80 shadow-[0px_8px_20px] shadow-gray-d1 rounded-lg bg-gray-l6 dark:bg-blue-d6 transform">
              {({ close }) => (
                <nav className="overflow-hidden grid gap-y-2 w-full p-6">
                  {links.map((link) =>
                    link.external ? (
                      <ExtLink
                        key={`header-link-${link.title}`}
                        className={styles}
                        href={link.href}
                      >
                        {link.title}
                      </ExtLink>
                    ) : (
                      <NavLink
                        key={`header-link-${link.title}`}
                        className={styler}
                        to={link.href}
                        end={link.end}
                        onClick={() => close()}
                      >
                        {link.title}
                      </NavLink>
                    )
                  )}
                  {user && user !== "loading" && (
                    <Menu
                      user={user}
                      signOut={() => dispatch(logout())}
                      classes="mt-2 absolute z-10 w-max right-0"
                    />
                  )}
                  {user && user === "loading" && (
                    <LoaderRing thickness={10} classes="w-6" />
                  )}
                </nav>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

const styles =
  "text-blue font-body font-semibold w-full hover:underline hover:text-blue-d1 transition ease-in-out duration-300";
const styler = createNavLinkStyler(styles, "pointer-events-none text-navy-d4");
