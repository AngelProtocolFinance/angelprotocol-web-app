import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
import { currency_text, MAIN_DENOM } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
// import useTerraBalance from "hooks/useTerraBalance";
import { useBalances } from "services/terra/queriers";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useSetter } from "store/accessors";
import { HaloStakingValues } from "./types";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const {
    watch,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const { wallet } = useWalletContext();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: mainBalance } = useBalances(MAIN_DENOM);
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
          dispatch(setFee(0));
          return;
        }

        if (is_stake) {
          //check $HALO balance
          if (balance.div(1e6).lt(debounced_amount)) {
            dispatch(setFormError("Not enough Halo balance"));
            return;
          }
        } else {
          if (balance.sub(locked).div(1e6).lt(debounced_amount)) {
            dispatch(setFormError("Not enough staked halo less locked"));
            return;
          }
        }

        dispatch(setFormLoading(true));

        let govMsg: MsgExecuteContract;
        const contract = new Halo(wallet);

        if (is_stake) {
          govMsg = contract.createGovStakeMsg(debounced_amount);
        } else {
          govMsg = contract.createGovUnstakeMsg(debounced_amount);
        }

        const fee = await contract.estimateFee([govMsg]);
        const { feeAmount, feeDenom } = extractFeeData(fee);

        //2nd balance check including fees
        if (feeAmount >= mainBalance.amount) {
          dispatch(
            setFormError(`Not enough ${currency_text[feeDenom]} to pay fees`)
          );
          return;
        }

        dispatch(setFee(feeAmount));
        setTx({ msgs: [govMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, mainBalance, balance, locked]);

  return { tx, wallet };
}
