import { MenuItem, MenuSection } from "@headlessui/react";
import {
  Building2Icon,
  LandmarkIcon,
  LogOutIcon,
  PieChartIcon,
} from "lucide-react";
import { Form, Link, href, useNavigation } from "react-router";
import type { DetailedUser } from "types/auth";
import { UserAvatar } from "../user-avatar";
import { Bookmarks } from "./bookmarks";
import { Organizations } from "./organizations";

type Props = {
  classes?: string;
  user: DetailedUser;
};
export function UserMenu({ user, classes }: Props) {
  const navigation = useNavigation();
  return (
    <MenuSection
      className={`${classes} bg-gradient-to-br from-gray-l5 to-white text-gray grid grid-cols-[auto_1fr] auto-rows-min grid-rows-[auto_1fr] content-start gap-x-2 p-4`}
    >
      <MenuItem
        as={Link}
        to={href("/dashboard/donations")}
        className="mb-6 hover:text-blue-d1 text-sm whitespace-nowrap grid grid-cols-subgrid col-span-2 items-center"
      >
        <UserAvatar avatar={user.avatar} classes="w-5" />
        <span>My Dashboard</span>
      </MenuItem>

      <Organizations user={user} classes="hidden [&:has(a)]:grid mb-4" />
      <Bookmarks user={user} classes="hidden [&:has(a)]:grid mb-4" />
      <div className="hidden [&:has(a)]:grid content-start grid-cols-subgrid col-span-2 mt-2">
        <h5 className="uppercase text-xs text-gray col-span-2">BG Admin</h5>
        {user.groups.includes("ap-admin") && (
          <MenuItem
            as={Link}
            to={href("/applications")}
            className="hover:text-blue-d1 text-sm grid grid-cols-subgrid col-span-2 items-center mt-2"
          >
            <Building2Icon size={18} />
            <span>NPO Applications</span>
          </MenuItem>
        )}
        {user.groups.includes("ap-admin") && (
          <MenuItem
            as={Link}
            to={href("/banking-applications")}
            className="hover:text-blue-d1 text-sm grid grid-cols-subgrid col-span-2 items-center mt-2"
          >
            <LandmarkIcon size={18} />
            <span>Banking Applications</span>
          </MenuItem>
        )}
        {user.groups.includes("ap-admin") && (
          <MenuItem
            as={Link}
            to={href("/fund-mgmt")}
            className="hover:text-blue-d1 text-sm grid grid-cols-subgrid col-span-2 items-center mt-2"
          >
            <PieChartIcon size={16} />
            <span>Fund Management</span>
          </MenuItem>
        )}
      </div>
      <Form className="contents" method="POST" action="/logout">
        <button
          disabled={navigation.state !== "idle"}
          type="submit"
          className="mt-4 self-end text-xs font-black grid grid-cols-subgrid col-span-2 text-blue uppercase disabled:text-gray"
        >
          <LogOutIcon size={16} />
          <span className="col-start-2 text-left">Logout</span>
        </button>
      </Form>
    </MenuSection>
  );
}
