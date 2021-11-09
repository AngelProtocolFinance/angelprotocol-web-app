import { useConnectedWallet } from "@terra-dev/use-wallet";
import { CreateTxOptions } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useDebouncer from "./useDebouncer";

export default function useTerraEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();

  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not UST
        if (currency !== denoms.uusd) {
          return;
        }

        setValue("form_error", "");
        if (!wallet) {
          setValue("form_error", "Terra wallet is not connected");
          return;
        }
        if (!debounced_amount) {
          setValue("fee", 0);
          return;
        }

        setValue("loading", true);
        const contract = new Indexfund(wallet);
        const tcaMembers = await contract.getTCAList();
        const isTca = tcaMembers.includes(wallet.walletAddress);
        if (!isTca) {
          setValue("form_error", "Wallet not included in TCA list");
          return;
        }

        const tx = await contract.createDepositTx(debounced_amount, 0);
        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        if (estimatedFee + debounced_amount > UST_balance) {
          setValue("form_error", "Not enough balance");
          return;
        }

        setValue("fee", estimatedFee);
        setTx(tx);
      } catch (err) {
        console.error(err);
        setValue("form_error", "Error estimating transaction");
      } finally {
        setValue("loading", false);
      }
    })();
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, currency]);

  return tx;
}
