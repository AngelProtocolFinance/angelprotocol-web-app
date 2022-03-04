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
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { useExchangeRate } from "services/terra/vaults/queriers";
import Account from "contracts/Account";
import useDebouncer from "hooks/useDebouncer";
import { vault_field_map } from "constants/contracts";
import { Source } from "contracts/types";
import { AmountInfo, filter_infos } from "./helpers";
import { WithdrawValues, VaultFields } from "./types";
import processEstimateError from "helpers/processEstimateError";
import extractFeeNum from "helpers/extractFeeNum";

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

  const anchor1_amount = watch("anchor1_amount");
  const anchor2_amount = watch("anchor2_amount");
  const account_addr = getValues("account_addr");

  //query fresh exchange rate upon opening form
  const { rates, isRatesError } = useExchangeRate();
  const { holdings } = useEndowmentHoldingsState(account_addr);

  const debAnchor1Amount = useDebouncer<string>(anchor1_amount, 300);
  const debAnchor2Amount = useDebouncer<string>(anchor2_amount, 300);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(null));

        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isDirty || !isValid) return;
        //rates is needed to estimate transaction
        if (isRatesError) return;

        const amountInfos: AmountInfo[] = [
          { field_id: VaultFields.anchor1_amount, amount: debAnchor1Amount },
          { field_id: VaultFields.anchor2_amount, amount: debAnchor2Amount },
        ];

        const filtered_infos = filter_infos(amountInfos);
        //if all fields are zero or undefined
        if (filtered_infos.length <= 0) {
          dispatch(setFee(0));
          setValue("total_ust", 0);
          setValue("total_receive", 0);
          return;
        }

        //check withraw amount per vault and construct withdraw arg
        const sources: Source[] = [];
        const liq_holdings = holdings.liquid_cw20;
        for (const holding of liq_holdings) {
          const field = vault_field_map[holding.address] as VaultFields;
          //a holding may be present but user may opt not to withdraw
          const to_withdraw = new Dec(getValues(field) || "0");
          if (to_withdraw.mul(1e6).gt(new Dec(holding.amount))) {
            setError(field, { message: "not enough token" });
          } else {
            clearErrors(field);
            if (!to_withdraw.eq(0)) {
              sources.push({
                vault: holding.address,
                locked: "0",
                liquid: to_withdraw.mul(1e6).toInt().toString(),
              });
            }
          }
        }

        //don't continue of no withdraw args
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
        const usd_total = sources
          .reduce(
            (total, source) =>
              total.add(new Dec(source.liquid).mul(rates[source.vault] || "0")),
            new Dec(0)
          )
          .div(1e6)
          .toNumber();

        if (feeNum > usd_total) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receive_amount = usd_total - feeNum;

        setValue("total_ust", usd_total);
        setValue("total_receive", receive_amount);
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
  }, [wallet, debAnchor1Amount, debAnchor2Amount, rates, holdings]);

  return { tx, wallet };
}
