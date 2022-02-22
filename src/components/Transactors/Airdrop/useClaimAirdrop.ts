import { useCallback, useMemo } from "react";
import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { Airdrops } from "services/aws/airdrop/types";
import { useBalances } from "services/terra/queriers";
import { claimAirdrop } from "services/transaction/transactors/claimAirdrop";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { useSetter } from "store/accessors";
import { denoms } from "constants/currency";

export default function useCatcher(airdrops: Airdrops) {
  const { main: ustBalance } = useBalances(denoms.uusd);
  const { showModal } = useSetModal();
  const wallet = useConnectedWallet();
  const dispatch = useSetter();

  const totalClaimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => new Dec(airdrop.haloTokens).div(1e6).add(result),
        new Dec(0)
      ),
    [airdrops]
  );

  const claim = useCallback(
    (isStake = false) => {
      dispatch(claimAirdrop({ airdrops, isStake, wallet, ustBalance }));
      showModal(TransactionPrompt, {});
    },
    //eslint-disable-next-line
    [wallet, ustBalance, airdrops]
  );

  return { totalClaimable: totalClaimable.toNumber(), claim };
}
