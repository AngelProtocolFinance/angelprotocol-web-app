import { useCallback } from "react";
import { TxProps } from "components/TransactionSuite/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { useSetModal } from "components/Nodal/Nodal";
import Voter from "./Voter";
import VoterForm from "./VoterForm";
import { Props } from "./types";

export default function useVoter(poll_id?: string) {
  const { showModal } = useSetModal();
  const showVoter = useCallback(() => {
    showModal<TxProps<Props>>(TransactionSuite, {
      Context: Voter,
      contextProps: { Form: VoterForm, poll_id },
    });
  }, [poll_id]);

  return showVoter;
}
