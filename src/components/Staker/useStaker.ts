import { useSetModal } from "components/Nodal/Nodal";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import { TxProps } from "components/TransactionSuite/types";
import { useCallback } from "react";
import StakeForm from "./StakeForm";
import Staker from "./Staker";
import { Props } from "./types";

export default function useStaker() {
  const { showModal } = useSetModal();
  const showStaker = useCallback(
    (is_stake: boolean) => () => {
      showModal<TxProps<Props>>(TransactionSuite, {
        inModal: true,
        Context: Staker,
        contextProps: { Form: StakeForm, stake: is_stake },
      });
    },
    []
  );
  return showStaker;
}
