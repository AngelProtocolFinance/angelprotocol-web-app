import { useErrorContext } from "contexts/ErrorContext";
import { useSetWallet } from "contexts/WalletContext";

type Props = {
  label: string;
  connectorName: string;
};
export default function WalletConnector({ label, connectorName }: Props) {
  const { connections } = useSetWallet();
  const { handleError } = useErrorContext();
  const connection = connections.find((c) => c.name === connectorName)!;
  async function handleConnect() {
    try {
      //wallet is connected at this point
      //keplr connection is single connection
      await connection!.connect!();
    } catch (err: any) {
      handleError(err);
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center border border-prim w-full p-4 mb-2 rounded"
    >
      <img
        src={connection.logo}
        alt=""
        className="w-8 h-8 object-contain mr-4"
      />
      <span className="font-heading font-bold text-lg">{label}</span>
    </button>
  );
}
