import { MenuItem } from "@headlessui/react";
import { Form, Link, useNavigation } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { CircleDollarSign, Shield } from "lucide-react";
import type { DetailedUser } from "types/auth";
import { Bookmarks } from "./bookmarks";
import { Organizations } from "./organizations";

type Props = {
  classes?: string;
  user: DetailedUser;
};
export function UserMenu({ user, classes }: Props) {
  const navigation = useNavigation();
  return (
    <div className={`${classes} text-gray`}>
      <p className="text-sm p-3 bg-blue-l4">
        Welcome, {user.firstName || user.email}!
      </p>
      <div className="w-64 min-h-[5rem] p-5">
        <MenuItem
          as={Link}
          to={`${appRoutes.user_dashboard}/donations`}
          className=" hover:text-blue-d1 text-sm flex items-center gap-2"
        >
          <CircleDollarSign size={18} />
          <span>My Dashboard</span>
        </MenuItem>
        <Organizations user={user} classes="mt-6" />
        <Bookmarks user={user} classes="mt-6" />
        <div className="hidden [&:has(a)]:block mt-6">
          <h5 className="uppercase text-xs text-gray mb-1">BG Admin</h5>
          {user.groups.includes("ap-admin") && (
            <MenuItem
              as={Link}
              to={appRoutes.applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1"
            >
              <Shield size={18} />
              <span>Applications Dashboard</span>
            </MenuItem>
          )}
          {user.groups.includes("ap-admin") && (
            <MenuItem
              as={Link}
              to={appRoutes.banking_applications}
              className="hover:text-blue-d1 text-sm flex items-center gap-1 mt-1"
            >
              <Shield size={18} />
              <span>Banking applications</span>
            </MenuItem>
          )}
        </div>
      </div>

      <Form className="contents" method="POST" action="/logout">
        <button
          disabled={navigation.state !== "idle"}
          type="submit"
          className="btn btn-blue rounded-none w-full p-3 text-sm mt-4"
        >
          Log out
        </button>
      </Form>
    </div>
  );
}
