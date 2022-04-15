import { useCallback } from "react";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Voter from "./Voter";
import VoterForm from "./VoterForm";
import { Props } from "./types";

export default function useVoter(poll_id: number) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(Transactor, {
      inModal: true,
      Content: Voter,
      contentProps: { Form: VoterForm, poll_id },
    });
    //eslint-disable-next-line
  }, [poll_id]);

  return showVoter;
}
