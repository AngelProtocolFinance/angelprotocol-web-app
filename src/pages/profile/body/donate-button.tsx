import { NavLink } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { useProfileContext } from "../profile-context";

export default function DonateButton({
  className = "",
}: {
  className?: string;
}) {
  const profile = useProfileContext();

  return (
    <NavLink
      to={appRoutes.donate + `/${profile.id}`}
      className={`${className} btn-blue h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </NavLink>
  );
}
