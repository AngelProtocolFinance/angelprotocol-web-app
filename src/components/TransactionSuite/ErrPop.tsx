import { AiOutlineInfoCircle } from "react-icons/ai";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { useGetter, useSetter } from "store/accessors";

export default function ErrPop() {
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  function acknowledge() {
    dispatch(setStage({ step: Step.form, content: null }));
  }
  return (
    <div className="bg-white grid p-4 rounded-md w-full shadow-lg min-h-115 content-center place-items-center">
      <AiOutlineInfoCircle className="text-angel-grey text-2xl mb-2 " />
      <p className="text-center text-angel-grey mb-2 ">
        {stage.content?.message}
      </p>
      {stage.content?.url && (
        <a
          href={stage.content?.url}
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
