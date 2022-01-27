import { useGetter } from "store/accessors";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Broadcast from "./Broadcast";
import Success from "./Success";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Nodal/Nodal";
import { Step } from "services/transaction/types";
import ClaimForm from "components/Claimer/ClaimForm";
import { Display } from "./types";
import useTxUpdator from "services/transaction/updators";

export default function ClaimSuite(props: { inModal?: true }) {
  const { hideModal } = useSetModal();
  const { updateTx } = useTxUpdator();
  const { stage } = useGetter((state) => state.transaction);
  const display: Display = {
    [Step.form]: <ClaimForm />,
    [Step.submit]: <Submit />,
    [Step.broadcast]: <Broadcast />,
    [Step.success]: <Success />,
    [Step.error]: <ErrPop />,
  };

  function close() {
    updateTx({ step: Step.form });
    hideModal();
  }

  return (
    <div
      className={`max-w-md w-full relative ${
        props.inModal ? "bg-white rounded-md pt-4" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose />
        </button>
      )}
      {display[stage.step]}
    </div>
  );
}
