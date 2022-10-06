import { BroadcastStage } from "slices/transaction/types";
import Loader from "components/Loader";
import { getTxUrl } from "helpers";

export default function Broadcast({
  chainId,
  message,
  txHash,
}: BroadcastStage) {
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-[15rem] content-center">
      <p className="text-center text-gray-d2 mb-2">{message}</p>
      <a
        href={getTxUrl(chainId, txHash)}
        target="_blank"
        rel="noreferrer noopener"
        className="text-center text-blue cursor-pointer mb-6"
      >
        view transaction status
      </a>
      <Loader bgColorClass="bg-gray-d2" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
