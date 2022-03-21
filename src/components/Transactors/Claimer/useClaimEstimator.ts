import { useEffect, useState } from "react";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import { useBalances } from "services/terra/queriers";
import { useGovStaker } from "services/terra/gov/queriers";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import processEstimateError from "helpers/processEstimateError";
import extractFeeNum from "helpers/extractFeeNum";

export default function useClaimEstimator() {
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const gov_staker = useGovStaker();
  const wallet = useConnectedWallet();
  const { main: UST_balance } = useBalances(denoms.uusd);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if ((gov_staker?.claims || []).length <= 0) {
          dispatch(setFormError("No recent unstaked tokens"));
          return;
        }

        const hasClaim = !!gov_staker.claims?.find(
          (claim) => +claim.release_at.at_time <= Date.now() * 1e6
        );

        if (!hasClaim) {
          dispatch(setFormError("No claimable tokens at the moment"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const claimMsg = contract.createGovClaimMsg();
        const fee = await contract.estimateFee([claimMsg]);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        if (feeNum >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
        setTx({ msgs: [claimMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };

    //eslint-disable-next-line
  }, [wallet, UST_balance, gov_staker]);

  return { wallet, tx };
}
