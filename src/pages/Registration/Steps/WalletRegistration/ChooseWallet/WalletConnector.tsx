import { useErrorContext } from "contexts/ErrorContext";
import { Connection } from "contexts/WalletContext";

export default function WalletConnector({
  connect,
  logo,
  name,
  providerId,
}: Connection) {
  const { handleError } = useErrorContext();
  return (
    <button
      onClick={() => connect().catch(handleError)}
      className="flex items-center border border-prim w-full p-4 mb-2 rounded"
    >
      <img src={logo} alt="" className="w-8 h-8 object-contain mr-4" />
      <span className="font-heading font-bold text-lg">
        {providerId === "web3auth-torus"
          ? "Register with Email (Web3 Auth)"
          : name}
      </span>
    </button>
  );
}
