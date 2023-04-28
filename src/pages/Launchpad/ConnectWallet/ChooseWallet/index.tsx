import { Link } from "react-router-dom";
import { steps } from "pages/Launchpad/constants";
import WalletConnector from "./WalletConnector";

export default function ChooseWallet() {
  return (
    <div className="w-full grid">
      <h3 className="text-lg">Choose a wallet</h3>
      <p className="mb-8 text-sm text-gray-d1 dark:text-gray mt-2">
        We recommend using a new wallet.
      </p>
      <WalletConnector name="Keplr" label="Socal login or email" />
      <WalletConnector name="Web3 Auth" label="Socal login or email" />
      <WalletConnector name="Metamask" label="Metamask" />
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
