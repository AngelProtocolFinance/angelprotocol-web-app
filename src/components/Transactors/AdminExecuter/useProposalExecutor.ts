import { useCallback } from "react";
import { TagPayloads } from "services/transaction/types";
import { useModalContext } from "components/ModalContext/ModalContext";
import Transactor, { TxProps } from "../Transactor";
import ExecuteForm, { Props } from "./ExecuteForm";

export default function useProposalExecutor(
  proposal_id: number,
  tagPayloads?: TagPayloads
) {
  const { showModal } = useModalContext();
  const showPollEnder = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: ExecuteForm,
      contentProps: { proposal_id, tagPayloads },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showPollEnder;
}
