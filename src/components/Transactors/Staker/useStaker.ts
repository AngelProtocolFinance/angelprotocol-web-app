import { useCallback } from "react";
import { Props } from "@types-component/staker";
import { useSetModal } from "components/Modal/Modal";
import Transactor, { TxProps } from "../Transactor";
import Staker from "./Staker";

export default function useStaker() {
  const { showModal } = useSetModal();
  const showStaker = useCallback(
    (is_stake: boolean) => () => {
      showModal<TxProps<Props>>(Transactor, {
        inModal: true,
        Content: Staker,
        contentProps: { isStake: is_stake },
      });
    },
    //eslint-disable-next-line
    []
  );
  return showStaker;
}
