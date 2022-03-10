import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSetModal } from "components/Modal/Modal";

export default function XDefiError() {
  const { hideModal } = useSetModal();

  function acknowledge() {
    hideModal();
  }

  return (
    <div className="bg-white-grey grid p-4 rounded-md w-full shadow-lg h-full content-center place-items-center">
      <AiOutlineInfoCircle className="text-angel-grey text-2xl mb-2 " />
      <p className="text-center text-angel-grey mb-2 ">
        Please De-Prioritize xDefi and Reload the Page
      </p>
      <button
        onClick={acknowledge}
        className="bg-angel-orange text-white rounded-md uppercase py-1 px-4 mt-4"
      >
        ok
      </button>
    </div>
  );
}
