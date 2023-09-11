import { Link } from "react-router-dom";
import { ProviderId } from "types/lists";
import { steps } from "pages/Launchpad/constants";
import { useSetWallet } from "contexts/WalletContext";
import WalletConnector from "./WalletConnector";

const supportedProviderIds: ProviderId[] = [
  "web3auth-torus",
  "metamask",
  "evm-wc",
];

export default function ChooseWallet() {
  const { connections } = useSetWallet();
  return (
    <div className="w-full grid">
      <h3 className="text-lg">Choose a wallet</h3>
      <p className="mb-8 text-sm text-gray-d1 dark:text-gray mt-2">
        We recommend using a new wallet.
      </p>
      {connections
        .filter((c) => supportedProviderIds.includes(c.providerId))
        .map((connection) => (
          <WalletConnector key={connection.providerId} {...connection} />
        ))}

      <div className="grid grid-cols-2 md:flex gap-3 items-center mt-8">
        <Link
          to={`../${steps[6]}`}
          className="min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
