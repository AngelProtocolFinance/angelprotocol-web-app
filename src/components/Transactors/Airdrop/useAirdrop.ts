import { useCallback } from "react";
import { Airdrops } from "types/server/aws";
import { useAirdrop as useAirdropQuery } from "services/terra/multicall/queriers";
import { useModalContext } from "contexts/ModalContext";
import Transactor, { TxProps } from "components/Transactors";
import Catcher from "./Catcher";

export default function useAirdrop() {
  const { showModal } = useModalContext();
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
