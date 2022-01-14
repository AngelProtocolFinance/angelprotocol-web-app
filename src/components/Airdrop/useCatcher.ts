import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useMemo } from "react";
import { Airdrops } from "services/aws/airdrop/types";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import { denoms } from "constants/currency";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import { useBalances } from "services/terra/queriers";
import Halo from "contracts/Halo";
import { terra } from "services/terra/terra";
import { aws } from "services/aws/aws";
import { tags as aws_tags } from "services/aws/tags";
import { tags, gov, user } from "services/terra/tags";
import handleTerraError from "helpers/handleTerraError";

export default function useCatcher(airdrops: Airdrops) {
  const { main: UST_balance } = useBalances(denoms.uusd);
  const wallet = useConnectedWallet();
  const dispatch = useSetter();
  const handleTxError = useTxErrorHandler();

  const total_claimable = useMemo(
    () =>
      airdrops.reduce(
        (result, airdrop) => new Dec(airdrop.haloTokens).div(1e6).add(result),
        new Dec(0)
      ),
    [airdrops]
  );

  async function claim(is_stake = false) {
    try {
      if (!wallet) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Wallet is disconnected" },
          })
        );
        return;
      }
      //create tx and estimate fee
      const contract = new Halo(wallet);
      const tx = await contract.createAirdropClaimTx(
        airdrops,
        is_stake,
        total_claimable.toString()
      );

      const estimatedFee = tx
        .fee!.amount.get(denoms.uusd)!
        .mul(1e-6)
        .amount.toNumber();

      //check if user has enough balance to pay for fees
      if (estimatedFee > UST_balance) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Not enough UST to pay for fees" },
          })
        );
        return;
      }

      const response = await wallet.post(tx!);

      dispatch(
        setStage({
          step: Step.broadcast,
          content: {
            message: "Waiting for transaction result",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
          },
        })
      );

      if (response.success) {
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          dispatch(
            setStage({
              step: Step.success,
              content: {
                message: `HALO successfully claimed${
                  is_stake ? " and staked" : ""
                }`,
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
          //refetch new data
          dispatch(
            terra.util.invalidateTags([
              { type: tags.gov, id: gov.staker },
              { type: tags.gov, id: gov.halo_balance },
              { type: tags.user, id: user.halo_balance },
            ])
          );
          dispatch(aws.util.invalidateTags([{ type: aws_tags.airdrop }]));
        } else {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
              },
            })
          );
        }
      }
    } catch (err) {
      console.error(err);
      handleTerraError(err, handleTxError);
    }
  }

  return { total_claimable: total_claimable.toNumber(), claim };
}
