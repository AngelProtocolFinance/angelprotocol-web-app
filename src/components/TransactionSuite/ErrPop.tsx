import { AiOutlineInfoCircle } from "react-icons/ai";
import getTxUrl from "helpers/getTxUrl";
import useTxUpdator from "services/transaction/updators";
import { Step, ErrorStage } from "services/transaction/types";

export default function ErrPop(props: ErrorStage) {
  if (props.step !== Step.error) throw new Error("wrong component rendered");
  const { updateTx } = useTxUpdator();
  const { message, chainId, txHash } = props;

  function acknowledge() {
    updateTx({ step: Step.form });
  }

  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center place-items-center">
      <AiOutlineInfoCircle className="text-angel-grey text-2xl mb-2 " />
      <p className="text-center text-angel-grey mb-2 ">{message}</p>
      {chainId && txHash && (
        <a
          href={getTxUrl(chainId, txHash)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-center text-red-400 cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </a>
      )}
      <button
        onClick={acknowledge}
        className="bg-angel-orange text-white rounded-md uppercase py-1 px-4 mt-4"
      >
        ok
      </button>
    </div>
  );
}
