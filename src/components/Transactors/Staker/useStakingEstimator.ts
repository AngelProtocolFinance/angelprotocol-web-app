import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HaloStakingValues } from "./types";
import { TxOptions } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Gov from "contracts/Gov";
import useDebouncer from "hooks/useDebouncer";
import extractFeeAmount from "helpers/extractFeeData";
import logger from "helpers/logger";
import processEstimateError from "helpers/processEstimateError";
import { symbols } from "constants/currency";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<HaloStakingValues>();
  const [tx, setTx] = useState<TxOptions>();
  const dispatch = useSetter();
  const { wallet } = useGetWallet();
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

        if (is_stake && balance.div(1e6).lt(debounced_amount)) {
          //check $HALO balance
          setError("amount", {
            message: `not enough ${symbols.halo} balance`,
          });
          return;
        } else if (balance.sub(locked).div(1e6).lt(debounced_amount)) {
          setError("amount", {
            message: "not enough unlocked staked balance",
          });
          return;
        }

        dispatch(setFormLoading(true));

        const contract = new Gov(wallet);

        const govMsg = is_stake
          ? contract.createGovStakeMsg(debounced_amount)
          : contract.createGovUnstakeMsg(debounced_amount);

        const fee = await contract.estimateFee([govMsg]);

        //2nd balance check including fees
        const feeAmount = extractFeeAmount(
          fee,
          wallet.chain.native_currency.token_id
        );
        dispatch(setFee(feeAmount));

        if (feeAmount >= wallet.chain.native_currency.balance) {
          setError("amount", {
            message: "Not enough balance to pay for fees",
          });
          return;
        }

        setTx({ msgs: [govMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        logger.error(err);
        dispatch(setFormError(processEstimateError(err)));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, balance, locked, isValid, isDirty]);

  return { tx, wallet };
}
