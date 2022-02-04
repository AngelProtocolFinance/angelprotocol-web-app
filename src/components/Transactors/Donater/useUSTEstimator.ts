import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Account from "contracts/Account";
import Indexfund from "contracts/IndexFund";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useDebouncer from "../../../hooks/useDebouncer";
import { useSetter } from "store/accessors";
import {
  setFormError,
  setFormLoading,
  setFee,
} from "services/transaction/transactionSlice";
import { useBalances } from "services/terra/queriers";

export default function useUSTEstimator() {
  const dispatch = useSetter();
  const { watch, getValues } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const wallet = useConnectedWallet();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const currency = watch("currency");
  const debounced_amount = useDebouncer(amount, 500);
  const debounced_split = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (currency !== denoms.uusd) {
          return;
        }

        dispatch(setFormError(""));

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        //initial balance check to successfully run estimate
        if (debounced_amount >= UST_balance) {
          dispatch(setFormError("Not enough balance"));
          return;
        }

        dispatch(setFormLoading(true));
        const receiver = getValues("receiver");
        let tx: CreateTxOptions;
        if (typeof receiver === "undefined" || typeof receiver === "number") {
          const index_fund = new Indexfund(wallet, receiver);
          tx = await index_fund.createDepositTx(
            debounced_amount,
            debounced_split
          );
        } else {
          const account = new Account(receiver, wallet);
          tx = await account.createDepositTx(debounced_amount, debounced_split);
        }

        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (debounced_amount + estimatedFee >= UST_balance) {
          dispatch(setFormError("Not enough balance"));
          return;
        }
        dispatch(setFee(estimatedFee));
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        dispatch(setFormError("Error estimating transaction"));
      }
    })();
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, wallet, UST_balance, currency]);

  return tx;
}
