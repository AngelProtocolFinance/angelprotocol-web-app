import { app_routes } from "constants/routes";
import { NavLink } from "react-router";

interface Props {
  id: number;
  classes?: string;
}

export function DonateButton({ classes = "", id }: Props) {
  return (
    <NavLink
      to={`${app_routes.donate}/${id}`}
      className={`${classes} btn btn-blue h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </NavLink>
  );
}
