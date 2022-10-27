import { DonaterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import { useGetter, useSetter } from "store/accessors";
import { resetTxFormState } from "slices/transaction/transactionSlice";
import Donater from "./Donater";

export default function useDonater() {
  const { showModal } = useModalContext();
  const step = useGetter((state) => state.transaction.stage.step);
  const dispatch = useSetter();

  return (props: DonaterProps) => {
    switch (step) {
      case "success":
      case "error":
        dispatch(resetTxFormState());
    }

    showModal<TxProps<DonaterProps>>(Transactor, {
      Content: Donater,
      contentProps: props,
    });
  };
}
