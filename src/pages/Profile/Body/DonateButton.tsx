import { Link } from "react-router-dom";
import { PAYMENT_WORDS, titleCase } from "constants/common";
import { appRoutes } from "constants/routes";
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
      aria-disabled={true}
      className={`${className} btn-orange h-12 px-6 text-base lg:text-sm`}
    >
      {titleCase(PAYMENT_WORDS.verb)} now
    </Link>
  );
}
