import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Halo from "contracts/Halo";
import extractFeeNum from "helpers/extractFeeNum";
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
  const { main: UST_balance } = useBalances(denoms.uusd);
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
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        if (feeNum >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(feeNum));
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
  }, [
    debounced_amount,
    wallet,
    UST_balance,
    balance,
    locked,
    isValid,
    isDirty,
  ]);

  return { tx, wallet };
}
