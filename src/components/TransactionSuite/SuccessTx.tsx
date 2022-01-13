import { AiOutlineCheckCircle } from "react-icons/ai";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { useGetter, useSetter } from "store/accessors";

//** basically same with the previouse success component except with an option to print receit
export default function SuccessTx() {
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();

  function requestReceipt() {
    dispatch(setStage({ step: Step.receipt, content: stage.content }));
  }

  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center place-items-center">
      <AiOutlineCheckCircle className="text-blue-accent text-3xl mb-1" />
      <p className="text-center text-blue-accent mb-2 font-bold">
        {stage.content?.message}
      </p>
      {stage.content?.url && (
        <a
          href={stage.content?.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </a>
      )}
      <button
        onClick={requestReceipt}
        className="bg-angel-orange text-white rounded-md uppercase py-1 px-4"
      >
        get receipt
      </button>
    </div>
  );
}
