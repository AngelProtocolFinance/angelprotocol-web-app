import { DonaterProps } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactor";
import Donater from "./Donater";

export default function useDonater() {
  const { showModal } = useModalContext();
  return (props: DonaterProps) => {
    showModal<TxProps<DonaterProps>>(Transactor, {
      Content: Donater,
      contentProps: props,
    });
  };
}
