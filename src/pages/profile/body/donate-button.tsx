import { app_routes } from "constants/routes";
import { NavLink } from "react-router";
import { useProfileContext } from "../profile-context";

export default function DonateButton({
  className = "",
}: {
  className?: string;
}) {
  const profile = useProfileContext();

  return (
    <NavLink
      to={`${app_routes.donate}/${profile.id}`}
      className={`${className} btn btn-blue h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </NavLink>
  );
}
