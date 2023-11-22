import { signOut } from "@aws-amplify/auth";
import { Popover } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import Menu from "./Menu";

export default function UserMenu() {
  const user = useGetter((state) => state.auth.user);

  const location = useLocation();

  if (!user || user === "loading") {
    return (
      <Link
        to={appRoutes.signin}
        state={{ from: location }}
        className="btn-orange px-3 h-10 rounded-lg text-sm"
        aria-disabled={user === "loading"}
      >
        Login
      </Link>
    );
  }

  return (
    <Popover className="relative">
      <Popover.Button className="cursor-pointer contents">
        <Icon size={24} type="User" className="text-white disabled:text-gray" />
      </Popover.Button>

      <Popover.Panel className="mt-2 absolute z-10 w-max right-0">
        <Menu userEmail={user.id} signOut={signOut} />
      </Popover.Panel>
    </Popover>
  );
}
