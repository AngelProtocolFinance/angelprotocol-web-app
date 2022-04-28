import { useCallback } from "react";
import { Props } from "@types-component/voter";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Voter from "./Voter";

export default function useVoter(poll_id: number) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Voter,
      contentProps: { poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showVoter;
}
