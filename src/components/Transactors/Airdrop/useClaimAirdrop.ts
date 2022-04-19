import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { awsTags } from "types/services/aws";
import { Airdrops } from "types/services/aws/airdrop";
import { govTags, terraTags, userTags } from "types/services/terra";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "services/transaction/transactors/sendTerraTx";
import { useSetModal } from "components/Modal/Modal";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetter } from "store/accessors";
import Halo from "contracts/Halo";
import useWalletContext from "hooks/useWalletContext";

export default function useClaimAirdrop(airdrops: Airdrops) {
  const { showModal } = useSetModal();
  const { wallet } = useWalletContext();
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
    const haloContract = new Halo(wallet);
    const claimAirdropMsgs = haloContract.createAirdropClaimMsg(
      airdrops,
      isStake
    );

    dispatch(
      sendTerraTx({
        wallet,
        msgs: claimAirdropMsgs,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: terraTags.gov, id: govTags.staker },
            { type: terraTags.gov, id: govTags.halo_balance },
            { type: terraTags.user, id: userTags.halo_balance },
          ]),
          aws.util.invalidateTags([{ type: awsTags.airdrop }]),
        ],
      })
    );
    showModal(TransactionPrompt, {});
  };

  return { totalClaimable: totalClaimable.toNumber(), claimAirdrop };
}
