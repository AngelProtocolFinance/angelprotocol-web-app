import { Link } from "react-router-dom";
import useWalletContext from "hooks/useWalletContext";
import { appRoutes, siteRoutes } from "constants/routes";

export default function Portal() {
  const { wallet } = useWalletContext();
  return (
    <Link
      to={`${siteRoutes.app}/${appRoutes.donations}/${wallet?.address}`}
      className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
    >
      MY DONATIONS
    </Link>
  );
}
