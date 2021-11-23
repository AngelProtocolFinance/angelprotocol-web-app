import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Account from "contracts/Account";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useDebouncer from "./useDebouncer";
import { useGetKeplr } from "wallets/Keplr";

export default function useUSTEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const { provider: keplr_provider, balance: keplr_balance } = useGetKeplr();
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();

  const keplr_ust = new Dec(
    keplr_balance.find((coin) => coin.denom === denoms.uusd)?.amount || "0"
  )
    .div(1e6)
    .toNumber();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const currency = watch("currency");
  const receiver = watch("receiver");

  const debounced_amount = useDebouncer(amount, 500);
  const debounced_split = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not UST
        if (currency !== denoms.uusd) {
          return;
        }

        setValue("form_error", "");

        if (!wallet && !keplr_provider) {
          setValue("form_error", "UST wallet is not connected");
          return;
        }

        //if the connected wallet is keplr, no need to estimate
        if (keplr_provider) {
          if (debounced_amount >= keplr_ust) {
            setValue("form_error", "Not enough balance");
            return;
          }
          return;
        }

        if (!debounced_amount) {
          setValue("fee", 0);
          return;
        }

        //initial balance check to successfully run estimate
        if (debounced_amount >= UST_balance) {
          setValue("form_error", "Not enough balance");
          return;
        }

        setValue("loading", true);
        let tx: CreateTxOptions;
        if (typeof receiver === "undefined" || typeof receiver === "number") {
          const index_fund = new Indexfund(wallet, receiver);
          const tcaMembers = await index_fund.getTCAList();
          const isTca = tcaMembers.includes(wallet!.walletAddress);
          if (!isTca) {
            setValue("form_error", "Wallet not included in TCA list");
            return;
          }
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
          setValue("form_error", "Not enough balance");
          return;
        }

        setValue("fee", estimatedFee);
        setTx(tx);
        setValue("loading", false);
      } catch (err) {
        console.error(err);
        setValue("loading", false);
        setValue("form_error", "Error estimating transaction");
      }
    })();
    //eslint-disable-next-line
  }, [
    debounced_amount,
    debounced_split,
    wallet,
    UST_balance,
    currency,
    keplr_provider,
  ]);

  return tx;
}
