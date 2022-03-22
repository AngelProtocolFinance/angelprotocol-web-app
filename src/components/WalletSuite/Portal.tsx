import { Link } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { app, site } from "constants/routes";

export default function Portal() {
  const wallet = useConnectedWallet();
  return (
    <Link
      to={`${site.app}/${app.donations}/${wallet?.walletAddress}`}
      className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
    >
      MY DONATIONS
    </Link>
  );
}
