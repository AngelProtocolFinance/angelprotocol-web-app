import { MenuItem } from "@headlessui/react";
import { NavLink, href } from "react-router";
import { styles } from "./common";

interface Props {
  to: string | undefined;
  classes?: string;
}

export function AuthLinks({ to, classes = "" }: Props) {
  return (
    <>
      <MenuItem>
        <NavLink
          to={`${href("/login")}?redirect=${to}`}
          className={`${styles} ${classes} text-blue`}
        >
          Login
        </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink
          to={`${href("/signup")}?redirect=${to}`}
          className={`${styles} ${classes} text-blue`}
        >
          Sign up
        </NavLink>
      </MenuItem>
    </>
  );
}
