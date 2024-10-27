import { appRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import { useFundContext } from "../FundContext";

export default function DonateButton({ className = "" }) {
  const fund = useFundContext();

  return (
    <Link
      aria-disabled={!fund.active}
      to={appRoutes.donate_fund + `/${fund.id}`}
      className={`${className} btn-blue h-12 px-6 text-base lg:text-sm`}
    >
      Donate now
    </Link>
  );
}
