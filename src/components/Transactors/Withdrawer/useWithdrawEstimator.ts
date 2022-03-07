import { useEffect, useState } from "react";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { useSetter } from "store/accessors";

import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import Account from "contracts/Account";
import useDebouncer from "hooks/useDebouncer";
import { Source } from "contracts/types";
import processEstimateError from "helpers/processEstimateError";
import extractFeeNum from "helpers/extractFeeNum";
import useFieldsAndLimits from "./useFieldsAndLimits";
import { VaultFieldIds, WithdrawValues, AmountInfo } from "./types";

export default function useWithrawEstimator() {
  const {
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { isValid, isDirty },
  } = useFormContext<WithdrawValues>();

  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const wallet = useConnectedWallet();

  const anchor1_amount = watch(VaultFieldIds.anchor1_amount) || "0";
  const anchor2_amount = watch(VaultFieldIds.anchor2_amount) || "0";
  const account_addr = getValues("account_addr");

  //query fresh exchange rate upon opening form
  const { vaultLimits } = useFieldsAndLimits(account_addr);

  const debAnchor1Amount = useDebouncer<string>(anchor1_amount, 300);
  const debAnchor2Amount = useDebouncer<string>(anchor2_amount, 300);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isDirty || !isValid) return;
        //any field input after this validation, can either be valid input or "0",
        //for n fields, only 1 is required to be valid, so others may be "0"

        //NOTE: change this pre-construction on addition on future vaults
        const fieldInputs: AmountInfo[] = [
          {
            fieldId: VaultFieldIds.anchor1_amount,
            amount: new Dec(debAnchor1Amount || "0"),
          },
          {
            fieldId: VaultFieldIds.anchor2_amount,
            amount: new Dec(debAnchor2Amount || "0"),
          },
        ];

        //remove blank inputs casted to 0
        const filteredInputs = fieldInputs.filter((fieldInput) =>
          fieldInput.amount.gt(0)
        );
        //if all fields are blank, return
        if (filteredInputs.length <= 0) {
          dispatch(setFee(0));
          setValue("total_ust", 0);
          setValue("total_receive", 0);
          return;
        }

        const sources: Source[] = [];
        const usdValues: Dec[] = [];
        for (const fieldInput of filteredInputs) {
          const fieldId = fieldInput.fieldId;
          const { limit, addr, rate } = vaultLimits[fieldId];
          if (fieldInput.amount.gt(limit)) {
            setError(fieldId, { message: "not enough balance" });
          } else {
            clearErrors(fieldId);
            usdValues.push(fieldInput.amount);
            sources.push({
              vault: addr,
              locked: "0",
              liquid: fieldInput.amount.mul(1e6).div(rate).toInt().toString(),
            });
          }
        }

        //don't continue if no withdraw args
        if (sources.length <= 0) {
          dispatch(setFormError("No valid withdraw amount is set"));
          return;
        }

        dispatch(setFormLoading(true));

        const account = new Account(account_addr, wallet);
        const withdrawMsg = account.createWithdrawMsg(sources);
        const fee = await account.estimateFee([withdrawMsg]);
        const feeNum = extractFeeNum(fee);

        //get usd total of of sources
        const usdTotal = usdValues
          .reduce((result, val) => result.add(val), new Dec(0))
          .toNumber();

        if (feeNum > usdTotal) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receiveAmount = usdTotal - feeNum;

        setValue("total_ust", usdTotal);
        setValue("total_receive", receiveAmount);
        dispatch(setFee(feeNum));
        setTx({ msgs: [withdrawMsg], fee });
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError(processEstimateError(err)));
      }
    })();
    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [wallet, debAnchor1Amount, debAnchor2Amount, vaultLimits]);

  return { tx, wallet };
}
