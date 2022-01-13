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
    console.log(is_stake);
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

      console.log(estimatedFee);

      alert("done checks");

      // dispatch(
      //   setStage({
      //     step: Step.submit,
      //     content: { message: "Submitting transaction..." },
      //   })
      // );
    } catch (err) {
      console.error(err);
    }
  }

  return { total_claimable: total_claimable.toNumber(), claim };
}
