import { useConnectedWallet } from "@terra-dev/use-wallet";
import { CreateTxOptions } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Indexfund from "contracts/IndexFund";
import useUSTBalance from "hooks/useUSTBalance";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useDebouncer from "./useDebouncer";

export default function useEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();

  const amount = watch("amount");
  const debounced_amount = useDebouncer(amount, 1000);
  console.log("deb", debounced_amount);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          setValue("form_error", "Wallet is not connected");
          return;
        }
        if (debounced_amount === 0 || !debounced_amount) {
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
        const tx = await contract.createDepositTx(debounced_amount, 50);
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
        //if successful, and reaches this line, clear error
        setValue("form_error", "");
      } catch (err) {
        console.error(err);
        setValue("form_error", "Error estimating transaction");
      } finally {
        setValue("loading", false);
      }
    })();
  }, [debounced_amount, wallet, UST_balance]);
  return tx;
}
