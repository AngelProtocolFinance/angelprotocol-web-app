import { Link } from "react-router-dom";
import { ProviderId } from "types/lists";
import { useSetWallet } from "contexts/WalletContext";
import { steps } from "../../../routes";
import { useRegState } from "../../StepGuard";
import WalletConnector from "./WalletConnector";

const supportedProviderIds: ProviderId[] = [
  "web3auth-torus",
  "metamask",
  "evm-wc",
];

export default function ChooseWallet() {
  const { data } = useRegState<3>();
  const { connections } = useSetWallet();

  const supportedConnections = connections.filter((c) =>
    supportedProviderIds.includes(c.providerId)
  );

  return (
    <div className="w-full grid">
      <h3 className="text-lg">Choose a wallet</h3>
      <p className="mb-8 text-sm text-gray-d1 dark:text-gray mt-2">
        We recommend using a new wallet to access your Angel Giving account. If
        you have not had a Polygon wallet before, we recommend using Web3 Auth.
        This simple method does not use a{" "}
        <span className="italic">seedphrase</span> and will enable you to use an
        email address or one of your social media accounts to log in.
      </p>
      {supportedConnections.map((connection) => (
        <WalletConnector key={connection.providerId} {...connection} />
      ))}
      <Link
        to={`../${steps.doc}`}
        state={data.init}
        className="mt-8 max-w-[8rem] btn btn-outline-filled btn-reg"
      >
        Back
      </Link>
    </div>
  );
}
