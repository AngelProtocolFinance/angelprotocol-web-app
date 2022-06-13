import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
<<<<<<< HEAD
=======
import { CURRENCIES } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
>>>>>>> master
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import useTerraBalance from "hooks/useTerraBalance";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
<<<<<<< HEAD
import Gov from "contracts/Gov";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
=======
>>>>>>> master
import { HaloStakingValues } from "./types";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const { wallet } = useWalletContext();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
<<<<<<< HEAD
  const { coins } = useGetter((state) => state.wallet);
=======
  const { displayCoin } = useGetter((state) => state.wallet);
>>>>>>> master
  const is_stake = getValues("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if (!isValid || !isDirty) return;

        if (!debounced_amount) {
          dispatch(setFee({ fee: 0 }));
          return;
        }

        if (is_stake) {
          //check $HALO balance
          if (balance.div(1e6).lt(debounced_amount)) {
            setError("amount", { message: "not enough HALO balance" });
            return;
          }
        } else {
          if (balance.sub(locked).div(1e6).lt(debounced_amount)) {
            setError("amount", {
              message: "not enough staked halo less locked",
            });
            return;
          }
        }

        dispatch(setFormLoading(true));

        let govMsg: MsgExecuteContract;
        const contract = new Gov(wallet);

        if (is_stake) {
          govMsg = contract.createGovStakeMsg(debounced_amount);
        } else {
          govMsg = contract.createGovUnstakeMsg(debounced_amount);
        }

        const fee = await contract.estimateFee([govMsg]);
        const feeData = extractFeeData(fee);

        //2nd balance check including fees
<<<<<<< HEAD
        const ustBalance = getTokenBalance(coins, denoms.uusd);
        if (feeNum >= ustBalance) {
          setError("amount", {
            message: "not enough UST to pay for fees",
          });
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
        setTx({ msgs: [govMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
<<<<<<< HEAD
  }, [debounced_amount, wallet, coins, balance, locked, isValid, isDirty]);
=======
  }, [debounced_amount, wallet, displayCoin, balance, locked]);
>>>>>>> master

  return { tx, wallet };
}
