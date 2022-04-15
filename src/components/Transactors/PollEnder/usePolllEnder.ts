import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import EnderForm, { Props } from "./EnderForm";

export default function usePollEnder(poll_id: number) {
  const { showModal } = useSetModal();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: EnderForm,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showPollEnder;
}
