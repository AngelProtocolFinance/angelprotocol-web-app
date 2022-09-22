import Decimal from "decimal.js";
import { useMemo } from "react";
import { Airdrops } from "types/aws";
import { apesTags, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { govTags, junoTags } from "services/juno/tags";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Airdrop from "contracts/Airdrop";
import { condense } from "helpers";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { wallet } = useGetWallet();
  const dispatch = useSetter();

  const totalClaimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => condense(airdrop.haloTokens).add(result),
        new Decimal(0)
      ),
    [airdrops]
  );

  const claimAirdrop = (isStake: boolean) => () => {
    const airdropContract = new Airdrop(wallet);
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
          ]),
          invalidateApesTags([{ type: apesTags.chain }]),
        ],
      })
    );
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop };
}
