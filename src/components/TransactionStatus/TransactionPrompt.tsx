import { ReactNode, useMemo } from "react";
import { setStage } from "slices/transaction/transactionSlice";
import {
  BroadcastStage,
  ErrorStage,
  ReceiptStage,
  Step,
  SubmitStage,
  SuccessStage,
} from "types/slices/transaction";
import Icon from "components/Icons/Icons";
import { useSetModal } from "components/Modal/Modal";
import ReceiptForm from "components/Receipter/ReceiptForm";
import Receipter from "components/Receipter/Receipter";
import { useGetter, useSetter } from "store/accessors";
import Broadcast from "./Broadcast";
import ErrPop from "./ErrPop";
import Submit from "./Submit";
import Success from "./Success";

export default function TransactionPrompt() {
  const stage = useGetter((state) => state.transaction.stage);
  const dispatch = useSetter();
  const { hideModal } = useSetModal();
  const prompts: Prompts = useMemo(
    () => ({
      [Step.submit]: <Submit {...(stage as SubmitStage)} />,
      [Step.broadcast]: <Broadcast {...(stage as BroadcastStage)} />,
      [Step.success]: <Success {...(stage as SuccessStage)} />,
      [Step.error]: <ErrPop {...(stage as ErrorStage)} />,
      //TODO: remove receipt to transactionPrompt to its own page
      [Step.receipt]: (
        <Receipter {...(stage as ReceiptStage)}>
          <ReceiptForm />
        </Receipter>
      ),
    }),
    [stage]
  );

  function closePrompt() {
    if (
      stage.step === Step.success ||
      stage.step === Step.receipt ||
      stage.step === Step.error
    ) {
      dispatch(setStage({ step: Step.form }));
      hideModal();
    } else {
      hideModal();
    }
  }

  return (
    <div className="relative bg-white-grey rounded-md pt-4 w-full max-w-md">
      <button
        onClick={closePrompt}
        className="absolute right-2 top-2 text-angel-grey hover:text-black"
      >
        <Icon type="Close" size={25} />
      </button>

      {prompts[stage.step]}
    </div>
  );
}

type Prompts = { [key in Step]?: ReactNode };
