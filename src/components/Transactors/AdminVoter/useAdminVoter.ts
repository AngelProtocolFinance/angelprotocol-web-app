import { useCallback } from "react";
import { Props } from "@types-component/admin-voter";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import AdminVoter from "./AdminVoter";

export default function useAdminVoter(proposal_id: number) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: AdminVoter,
      contentProps: { proposal_id },
    });
    //eslint-disable-next-line
  }, [proposal_id]);

  return showVoter;
}
