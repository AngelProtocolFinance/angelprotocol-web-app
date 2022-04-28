import { useCallback } from "react";
import { TagPayloads } from "services/transaction/types";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import ExecuteForm, { Props } from "./ExecuteForm";

export default function useProposalExecutor(
  proposal_id: number,
  tagPayloads?: TagPayloads
) {
  const { showModal } = useSetModal();
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
