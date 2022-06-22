import { useCallback } from "react";
import { Airdrops } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Transactor from "components/Transactor";
import Catcher from "./Catcher";

export default function useAirdrop() {
  const { showModal } = useModalContext();
  const airdrops: Airdrops = []; //FUTURE: reenable when multicall for terra v2.0 is available

  const showDetails = useCallback(() => {
    showModal(Transactor, {
      Content: Catcher,
      contentProps: { airdrops },
    });
    //eslint-disable-next-line
  }, [airdrops]);

  return { airdrop_shown: airdrops.length > 0, showDetails };
}
