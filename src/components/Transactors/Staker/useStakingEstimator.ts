import { CreateTxOptions, MsgExecuteContract } from "@terra-money/terra.js";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
// import useTerraBalance from "hooks/useTerraBalance";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import useDebouncer from "hooks/useDebouncer";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { denoms } from "constants/currency";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { providerId, coins, walletAddr } = useGetWallet();
  const is_stake = getValues("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
  const amount = Number(watch("amount")) || 0;
  const [debounced_amount] = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        if (providerId === "unknown") {
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
        const contract = new Gov(walletAddr);

        if (is_stake) {
          govMsg = contract.createGovStakeMsg(debounced_amount);
        } else {
          govMsg = contract.createGovUnstakeMsg(debounced_amount);
        }

        const fee = await contract.estimateFee([govMsg]);
        const feeNum = extractFeeNum(fee);

        //2nd balance check including fees
        const ustBalance = getTokenBalance(coins, denoms.uusd);
        if (feeNum >= ustBalance) {
          setError("amount", {
            message: "not enough UST to pay for fees",
          });
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
  }, [debounced_amount, coins, balance, locked, isValid, isDirty]);

  return { tx, providerId };
}
