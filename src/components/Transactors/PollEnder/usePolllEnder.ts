import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
import EnderForm from "./EnderForm";

export default function usePollEnder(poll_id: number) {
  const { showModal } = useSetModal();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<{ poll_id: number }>>(Transactor, {
      inModal: true,
      Content: EnderForm,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showPollEnder;
}
