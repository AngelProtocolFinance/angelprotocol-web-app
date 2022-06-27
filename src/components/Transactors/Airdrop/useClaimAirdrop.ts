import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { Airdrops } from "types/server/aws";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags, multicallTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors/sendCosmosTx";
import Airdrop from "contracts/Airdrop";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { wallet } = useGetWallet();
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
    const airdropContract = new Airdrop(wallet?.address);
    const claimAirdropMsgs = airdropContract.createAirdropClaimMsg(
      airdrops,
      isStake
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: claimAirdropMsgs,
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.gov, id: govTags.staker },
            { type: junoTags.gov, id: govTags.halo_balance },
            { type: junoTags.multicall, id: multicallTags.endowmentBalance },
            { type: junoTags.multicall, id: multicallTags.airdrop },
          ]),
        ],
      })
    );
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop };
}
