import { useCallback } from "react";
import { TxProps } from "@types-component/transactor";
import { Airdrops } from "@types-server/aws";
import { useAirdrop as useAirdropQuery } from "services/terra/multicall/queriers";
import { useSetModal } from "components/Modal/Modal";
import Transactor from "../Transactor";
import Catcher from "./Catcher";

export default function useAirdrop() {
  const { showModal } = useSetModal();
  const { airdrops } = useAirdropQuery();

  const showDetails = useCallback(() => {
    showModal<TxProps<{ airdrops: Airdrops }>>(Transactor, {
      inModal: true,
      Content: Catcher,
      contentProps: { airdrops },
    });
    //eslint-disable-next-line
  }, [airdrops]);

  return { airdrop_shown: airdrops.length > 0, showDetails };
}
