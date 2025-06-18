import { MenuItem } from "@headlessui/react";
import { NavLink } from "@remix-run/react";
import { appRoutes } from "constants/routes";
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
          to={appRoutes.signin + `?redirect=${to}`}
          className={`${styles} ${classes}`}
        >
          Login
        </NavLink>
      </MenuItem>

      <MenuItem>
        <NavLink
          to={appRoutes.signup + `?redirect=${to}`}
          className={`${styles} ${classes}`}
        >
          Sign up
        </NavLink>
      </MenuItem>
    </>
  );
}
