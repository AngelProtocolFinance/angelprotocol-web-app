import { CreateTxOptions } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";

export default function useClaimEstimator() {
  const { coins } = useGetWallet();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { providerId, walletAddr } = useGetWallet();
  const gov_staker = useGovStaker();

  useEffect(() => {
    (async () => {
      try {
        if (providerId === "unknown") {
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
        const contract = new Gov(walletAddr);
        const claimMsg = contract.createGovClaimMsg();
        const fee = await contract.estimateFee([claimMsg]);
        const feeNum = extractFeeNum(fee);

        const ustBalance = getTokenBalance(coins, denoms.uusd);
        //2nd balance check including fees
        if (feeNum >= ustBalance) {
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
  }, [walletAddr, providerId, coins, gov_staker]);

  return { tx, providerId };
}
