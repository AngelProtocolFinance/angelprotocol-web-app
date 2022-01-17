import { ReactNode } from "react";
import { useGetter, useSetter } from "store/accessors";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Broadcast from "./Broadcast";
import Success from "./Success";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Nodal/Nodal";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { Airdrops } from "services/aws/airdrop/types";
import Catcher from "components/Airdrop/Catcher";

type Display = { [key in Step]: ReactNode };

export type AirdropProps = { airdrops: Airdrops };
export default function AirdropSuite(props: AirdropProps) {
  const { hideModal } = useSetModal();
  const dispatch = useSetter();
  const { stage } = useGetter((state) => state.transaction);

  const display: Display = {
    [Step.form]: <Catcher airdrops={props.airdrops} />,
    [Step.submit]: <Submit />,
    [Step.broadcast]: <Broadcast />,
    [Step.success]: <Success />,
    [Step.error]: <ErrPop />,
  };

  function close() {
    dispatch(setStage({ step: Step.form, content: null }));
    hideModal();
  }

  return (
    <div
      className={`max-w-xs w-full relative bg-white rounded-md pt-4 overflow-hidden`}
    >
      <button
        onClick={close}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <MdOutlineClose />
      </button>

      {display[stage.step]}
    </div>
  );
}
