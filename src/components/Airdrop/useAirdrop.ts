import { useSetModal } from "components/Nodal/Nodal";
import Catcher, { Props as CatchProps } from "./Catcher";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "contracts/types";
import { useAirdropQuery } from "services/aws/airdrop/airdrop";
import { useCallback } from "react";

export default function useAirdrop() {
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data = [] } = useAirdropQuery(
    {
      wallet_addr: wallet?.walletAddress!,
      is_test: true,
    },
    { skip: !is_test || wallet?.walletAddress === undefined }
  );

  const showDetails = useCallback(() => {
    showModal<CatchProps>(Catcher, { airdrops: data });
  }, [data]);

  return { airdrop_shown: !!wallet && data.length > 0, showDetails };
}
