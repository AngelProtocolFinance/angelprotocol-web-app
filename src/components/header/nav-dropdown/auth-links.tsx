import { MenuItem } from "@headlessui/react";
import { app_routes } from "constants/routes";
import { NavLink } from "react-router";
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
          to={`${app_routes.signin}?redirect=${to}`}
          className={`${styles} ${classes}`}
        >
          Login
        </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink
          to={`${app_routes.signup}?redirect=${to}`}
          className={`${styles} ${classes}`}
        >
          Sign up
        </NavLink>
      </MenuItem>
    </>
  );
}
