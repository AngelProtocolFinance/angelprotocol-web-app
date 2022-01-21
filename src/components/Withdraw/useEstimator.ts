import { useEffect, useState, useMemo } from "react";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";

import { useSetter } from "store/accessors";
import { Values } from "./types";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useEndowmentHoldingsState } from "services/terra/states";
import { useExchangeRate } from "services/terra/vaults/queriers";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import { useSetModal } from "components/Nodal/Nodal";
import useDebouncer from "hooks/useDebouncer";

export default function useEstimator() {
  const { hideModal } = useSetModal();
  const { watch, setValue, getValues } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();

  const dispatch = useSetter();
  const wallet = useConnectedWallet();

  const token_amount = Number(watch("anchor1_amount")) || 0;
  const account_addr = getValues("account_addr");
  //query fresh exchange rate upon opening form
  const rates = useExchangeRate();
  const holdings = useEndowmentHoldingsState(account_addr);

  const total_token = useMemo(
    () =>
      holdings.liquid_cw20.reduce(
        (total, holding) => total.add(new Dec(holding.amount)),
        new Dec(0)
      ),
    [holdings.liquid_cw20]
  );

  const debounced_amount = useDebouncer(token_amount, 500);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          hideModal();
          return;
        }

        if (debounced_amount === 0) {
          dispatch(setFee(0));
          setValue("total_ust", 0);
          setValue("total_receive", 0);
        }

        if (debounced_amount > total_token.div(1e6).toNumber()) {
          dispatch(setFormError("Not enough token"));
          return;
        }

        dispatch(setFormLoading(true));

        const account = new Account(account_addr, wallet);
        const transaction = await account.createWithdrawTx(
          account_addr,
          debounced_amount
        );

        // Computing for fees
        const estimatedFee = transaction
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        const ust_amount = new Dec(token_amount)
          .mul(new Dec(rates[account_addr] || "0"))
          .div(1e6)
          .toNumber();

        if (estimatedFee > ust_amount) {
          dispatch(setFormError("Withdraw amount is too low to pay for fees"));
          return;
        }

        const receive_amount = ust_amount - estimatedFee;

        setValue("total_ust", ust_amount);
        setValue("total_receive", receive_amount);
        dispatch(setFee(estimatedFee));
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("transaction simulation failed"));
      }
    })();
    return () => {
      dispatch(setFormError(""));
    };
  }, [wallet, debounced_amount, rates, holdings.liquid_cw20]);

  return tx;
}
