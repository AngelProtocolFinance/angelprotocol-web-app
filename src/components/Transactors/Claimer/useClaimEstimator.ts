import { CreateTxOptions } from "@terra-money/terra.js";
<<<<<<< HEAD
=======
import { CURRENCIES } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useWalletContext from "hooks/useWalletContext";
>>>>>>> master
import { useEffect, useState } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
<<<<<<< HEAD
import Gov from "contracts/Gov";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
=======
>>>>>>> master

export default function useClaimEstimator() {
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { coins } = useGetter((state) => state.wallet);
  const gov_staker = useGovStaker();
  const { wallet } = useWalletContext();
<<<<<<< HEAD
=======
  const { displayCoin } = useGetter((state) => state.wallet);
>>>>>>> master

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
        const contract = new Gov(wallet);
        const claimMsg = contract.createGovClaimMsg();
        const fee = await contract.estimateFee([claimMsg]);
        const feeData = extractFeeData(fee);

        const ustBalance = getTokenBalance(coins, denoms.uusd);
        //2nd balance check including fees
<<<<<<< HEAD
        if (feeNum >= ustBalance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee({ fee: feeNum }));
=======
        if (feeData.amount >= displayCoin.amount) {
          dispatch(
            setFormError(
              `Not enough ${CURRENCIES[feeData.denom].ticker} to pay fees`
            )
          );
          return;
        }

        dispatch(setFee(feeData.amount));
>>>>>>> master
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
<<<<<<< HEAD
  }, [wallet, coins, gov_staker]);
=======
  }, [wallet, displayCoin, gov_staker]);
>>>>>>> master

  return { wallet, tx };
}
