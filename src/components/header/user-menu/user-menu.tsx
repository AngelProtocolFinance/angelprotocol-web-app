import { MenuItem } from "@headlessui/react";
import {
  Building2Icon,
  CircleDollarSign,
  LandmarkIcon,
  PieChartIcon,
} from "lucide-react";
import { Form, Link, href, useNavigation } from "react-router";
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
        Welcome, {user.first_name || user.email}!
      </p>
      <div className="w-64 min-h-[5rem] p-5">
        <MenuItem
          as={Link}
          to={href("/dashboard/donations")}
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
              to={href("/applications")}
              className="hover:text-blue-d1 text-sm flex items-center gap-x-2 mt-2"
            >
              <Building2Icon size={18} />
              <span>NPO Applications</span>
            </MenuItem>
          )}
          {user.groups.includes("ap-admin") && (
            <MenuItem
              as={Link}
              to={href("/banking-applications")}
              className="hover:text-blue-d1 text-sm flex items-center gap-x-2 mt-2"
            >
              <LandmarkIcon size={18} />
              <span>Banking Applications</span>
            </MenuItem>
          )}
          {user.groups.includes("ap-admin") && (
            <MenuItem
              as={Link}
              to={href("/fund-mgmt")}
              className="hover:text-blue-d1 text-sm flex items-center gap-x-2 mt-2"
            >
              <PieChartIcon size={16} />
              <span>Fund Management</span>
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
