import { Popover } from "@headlessui/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { setIsMobileNavOpen } from "slices/components/mobileNav";
import { createNavLinkStyler } from "helpers";
import { adminRoutes, appRoutes } from "constants/routes";

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
        className="lg:hidden rounded-sm min-w-max gap-1 absolute p-4 z-10 bg-zinc-50 right-0 top-full mt-1 rounded-lg shadow-xl grid grid-cols-2"
      >
        <AppLinks />
        <div id={adminMobileNavId} />
      </Popover.Panel>
    </Popover>
  );
}

const styler = createNavLinkStyler(
  "text-zinc-600 inline-flex items-center",
  "text-angel-orange"
);

function AppLinks() {
  const dispatch = useSetter();
  useEffect(() => {
    //set open state after portal node has been mounted
    dispatch(setIsMobileNavOpen(true));

    return () => {
      dispatch(setIsMobileNavOpen(false));
    };
  }, [dispatch]);

  return (
    <div className="grid justify-items-start content-start uppercase font-extrabold font-heading">
      <NavLink to={appRoutes.index} className={styler} end>
        Marketplace
      </NavLink>
      <NavLink to={appRoutes.leaderboard} className={styler}>
        Leaderboard
      </NavLink>
      {/*<NavLink to={appRoutes.register} className={styler}>
        Register
      </NavLink>*/}
    </div>
  );
}

export const adminMobileNavId = "admin_mobile_nav";
export function AdminMobileNavPortal({ id }: { id: number }) {
  const { isMobileNavOpen } = useGetter((state) => state.component.mobileNav);
  return (
    (isMobileNavOpen &&
      createPortal(
        <div className="border-l border-zinc-600/20 pl-4 ml-4">
          <h4 className="uppercase text-sm font-bold text-angel-grey mb-2">
            Admin
          </h4>
          <div className="grid justify-items-start uppercase text-sm font-heading gap-1">
            <NavLink end to={`${appRoutes.admin}/${id}`} className={styler}>
              Dashboard
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.withdraws}`}
              className={styler}
            >
              Withdraws
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.edit_profile}`}
              className={styler}
            >
              Edit Profile
            </NavLink>
            <NavLink
              end
              to={`${appRoutes.admin}/${id}/${adminRoutes.proposals}`}
              className={styler}
            >
              Proposals
            </NavLink>
          </div>
        </div>,
        document.querySelector(`#${adminMobileNavId}`)!
      )) ||
    null
  );
}
