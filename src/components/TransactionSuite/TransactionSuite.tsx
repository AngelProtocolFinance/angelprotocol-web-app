import { useGetter } from "store/accessors";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Broadcast from "./Broadcast";
import Success from "./Success";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Modal/Modal";
import {
  BroadcastStage,
  ErrorStage,
  ReceiptStage,
  Step,
  SubmitStage,
  SuccessStage,
} from "services/transaction/types";
import { Display, TxProps } from "./types";
import useTxUpdator from "services/transaction/updators";
import { useMemo } from "react";
import Receipter from "components/Receipter/Receipter";
import ReceiptForm from "components/Receipter/ReceiptForm";

export default function TransactionSuite<C>(props: TxProps<C>) {
  const { hideModal } = useSetModal();
  const { updateTx } = useTxUpdator();
  const { stage } = useGetter((state) => state.transaction);

  const display: Display = useMemo(
    () => ({
      [Step.form]: <props.Context {...props.contextProps} />,
      [Step.submit]: <Submit {...(stage as SubmitStage)} />,
      [Step.broadcast]: <Broadcast {...(stage as BroadcastStage)} />,
      [Step.success]: <Success {...(stage as SuccessStage)} />,
      [Step.error]: <ErrPop {...(stage as ErrorStage)} />,
      [Step.receipt]: (
        <Receipter {...(stage as ReceiptStage)}>
          <ReceiptForm />
        </Receipter>
      ),
    }),
    [props, stage]
  );

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
          <MdOutlineClose size={25} />
        </button>
      )}
      {display[stage.step]}
    </div>
  );
}
