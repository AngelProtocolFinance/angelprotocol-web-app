import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useProfileContext } from "../ProfileContext";

export default function DonateButton({
  className = "",
}: {
  className?: string;
}) {
  const profile = useProfileContext();

  return (
    <Link
      to={appRoutes.donate + `/${profile.id}`}
      className={`${className} btn-orange h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </Link>
  );
}
