import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useFundContext } from "../FundContext";

export default function DonateButton({ className = "" }) {
  const fund = useFundContext();

  return (
    <Link
      to={appRoutes.donate + `/${fund.id}`}
      className={`${className} btn-blue h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </Link>
  );
}
