import { BroadcastStage, Step } from "services/transaction/types";
import Loader from "components/Loader/Loader";
import getTxUrl from "helpers/getTxUrl";

export default function Broadcast(props: BroadcastStage) {
  if (props.step !== Step.broadcast) {
    throw new Error("component and stage mismatch");
  }
  const { message, chainId, txHash } = props;

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full shadow-lg min-h-115 content-center">
      <p className="text-center text-angel-grey mb-2">{message}</p>
      <a
        href={getTxUrl(chainId, txHash)}
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
