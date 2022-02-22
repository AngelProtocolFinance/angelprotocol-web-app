import { useEffect, useState } from "react";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";

import { useSetter } from "store/accessors";
import { WithdrawValues, VaultFields } from "./types";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { useExchangeRate } from "services/terra/vaults/queriers";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import { useSetModal } from "components/Modal/Modal";
import useDebouncer from "hooks/useDebouncer";
import { AmountInfo, filter_infos } from "./helpers";
import { vault_field_map } from "constants/contracts";
import { Source } from "contracts/types";

export default function useWithrawEstimator() {
  const { hideModal } = useSetModal();
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

  const deb_anchor1_amount = useDebouncer<string>(anchor1_amount, 300);
  const deb_anchor2_amount = useDebouncer<string>(anchor2_amount, 300);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        //rates is needed to estimate transaction
        if (isRatesError) {
          return;
        }

        if (!isValid || !isDirty) {
          return;
        }

        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          hideModal();
          return;
        }
        const amountInfos: AmountInfo[] = [
          { field_id: VaultFields.anchor1_amount, amount: deb_anchor1_amount },
          { field_id: VaultFields.anchor2_amount, amount: deb_anchor2_amount },
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
        const transaction = await account.createWithdrawTx(sources);

        const estimatedFee = transaction
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //get usd total of of sources
        const usd_total = sources
          .reduce(
            (total, source) =>
              total.add(new Dec(source.liquid).mul(rates[source.vault] || "0")),
            new Dec(0)
          )
          .div(1e6)
          .toNumber();

        if (estimatedFee > usd_total) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receive_amount = usd_total - estimatedFee;

        setValue("total_ust", usd_total);
        setValue("total_receive", receive_amount);
        dispatch(setFee(estimatedFee));
        setTx(transaction);
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError("transaction simulation failed"));
      }
    })();
    return () => {
      dispatch(setFormError(""));
    };
    //eslint-disable-next-line
  }, [wallet, deb_anchor1_amount, deb_anchor2_amount, rates, holdings]);

  return { tx, wallet };
}
