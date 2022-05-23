import { Link } from "react-router-dom";
import { appRoutes, siteRoutes } from "constants/routes";

export default function Portal() {
  const placeHolderAddr = "0x56FB95Bd20CC1Db9E0e9847c1C18a927fc284c5B";
  return (
    <Link
      to={`${siteRoutes.app}/${appRoutes.donations}/${placeHolderAddr}`}
      className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
    >
      MY DONATIONS
    </Link>
  );
}
