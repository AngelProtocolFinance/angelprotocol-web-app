import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Popover } from "@headlessui/react";
import Icon from "components/Icon";
import Menu from "./Menu";

export default function UserMenu() {
  const { user, signOut } = useAuthenticator((context) => [context.route]);
  return (
    <Popover className="relative">
      {user ? (
        <Popover.Button className="cursor-pointer contents">
          <Icon type="User" size={24} className="text-white" />
        </Popover.Button>
      ) : (
        <Popover.Button className="btn-orange px-3 h-10 rounded-lg text-sm">
          Login
        </Popover.Button>
      )}
      <Popover.Panel className="mt-2 absolute z-10 w-max max-sm:fixed-center sm:right-0">
        {user ? <Menu user={user} signOut={signOut} /> : <Authenticator />}
      </Popover.Panel>
    </Popover>
  );
}
