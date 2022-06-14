import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { Airdrops } from "types/server/aws";
import { govTags, multicallTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import Airdrop from "contracts/Airdrop";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { walletAddr, displayCoin, providerId } = useGetWallet();
  const dispatch = useSetter();

  const totalClaimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => new Dec(airdrop.haloTokens).div(1e6).add(result),
        new Dec(0)
      ),
    [airdrops]
  );

  const claimAirdrop = (isStake: boolean) => () => {
    const airdropContract = new Airdrop(walletAddr);
    const claimAirdropMsgs = airdropContract.createAirdropClaimMsg(
      airdrops,
      isStake
    );

    dispatch(
      sendTerraTx({
        providerId,
        feeBalance: displayCoin.balance,
        msgs: claimAirdropMsgs,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov, id: govTags.staker },
            { type: terraTags.gov, id: govTags.halo_balance },
            { type: terraTags.multicall, id: multicallTags.endowmentBalance },
            { type: terraTags.multicall, id: multicallTags.airdrop },
          ]),
        ],
      })
    );
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop };
}
