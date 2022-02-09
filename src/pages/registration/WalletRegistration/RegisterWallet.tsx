import { Link } from "react-router-dom";
import { useGetter } from "store/accessors";
import { app, registration, site } from "types/routes";

export default function RegisterWallet() {
  const connectedWalletAddress = useGetter(
    (state) => state.registration.connectedWalletAddress
  );

  return (
    <div className="h-full">
      <h1>Your wallet: {connectedWalletAddress}</h1>
      <Link
        to={`${site.app}/${app.register}/${registration.wallet_check}`}
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Click here to go to wallet creation screen
      </Link>
    </div>
  );
}
