import { BroadcastStage } from "slices/transaction/types";
import Loader from "components/Loader";
import { getTxUrl } from "helpers";

export default function Broadcast({ chain, message, txHash }: BroadcastStage) {
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-[15rem] content-center">
      <p className="text-center text-angel-grey mb-2">{message}</p>
      <a
        href={getTxUrl(chain, txHash)}
        target="_blank"
        rel="noreferrer noopener"
        className="text-center text-angel-blue cursor-pointer mb-6"
      >
        view transaction status
      </a>
      <Loader bgColorClass="bg-angel-grey" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}
