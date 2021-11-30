import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
import useTerraBalance from "hooks/useTerraBalance";
import useHaloBalance from "./useHaloBalance";
import { Values } from "./types";

export default function useEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const { main: UST_balance } = useTerraBalance(denoms.uusd);
  const halo_balance = useHaloBalance();
  const wallet = useConnectedWallet();

  const amount = Number(watch("amount")) || 0;
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        setValue("form_error", "");
        if (!wallet) {
          setValue("form_error", "Terra wallet is not connected");
          return;
        }

        if (!debounced_amount) {
          setValue("fee", 0);
          return;
        }
        //get $halo balance

        //initial balance check to successfully run estimate
        if (debounced_amount >= halo_balance) {
          setValue("form_error", "Not enough Halo balance");
          return;
        }

        setValue("loading", true);
        const contract = new Halo(wallet);
        const tx = await contract.createGovStakeTx(debounced_amount);

        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (estimatedFee >= UST_balance) {
          setValue("form_error", "Not enough UST to pay fees");
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
  }, [debounced_amount, wallet, UST_balance, halo_balance]);

  return tx;
}
