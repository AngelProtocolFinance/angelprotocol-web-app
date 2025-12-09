import { MenuItem, MenuSection } from "@headlessui/react";
import { NavLink, href } from "react-router";

interface Props {
  to: string | undefined;
  classes?: string;
}

export function AuthLinks({ to, classes = "" }: Props) {
  return (
    <MenuSection className={`${classes} grid grid-cols-[2fr_3fr] p-1 gap-x-1`}>
      <MenuItem>
        <NavLink
          to={`${href("/login")}?redirect=${to}`}
          className="btn btn-outline text-sm py-2 normal-case"
        >
          Log in
        </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink
          to={`${href("/signup")}?redirect=${to}`}
          className="btn btn-blue text-sm py-2 normal-case"
        >
          Join us today!
        </NavLink>
      </MenuItem>
    </MenuSection>
  );
}
