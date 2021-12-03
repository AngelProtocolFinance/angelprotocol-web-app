import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
import useTerraBalance from "hooks/useTerraBalance";
import useHaloBalance from "hooks/useHaloBalance";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";

export default function useEstimator() {
  const { watch } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useTerraBalance(denoms.uusd);
  const halo_balance = useHaloBalance();
  const wallet = useConnectedWallet();

  const amount = Number(watch("amount")) || 0;
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }
        //get $halo balance

        //initial balance check to successfully run estimate
        if (debounced_amount >= halo_balance) {
          dispatch(setFormError("Not enough Halo balance"));
          return;
        }

        dispatch(setFormLoading(true));
        const contract = new Halo(wallet);
        const tx = await contract.createGovStakeTx(debounced_amount);

        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (estimatedFee >= UST_balance) {
          dispatch(setFormError("Not enough UST to pay fees"));
          return;
        }

        dispatch(setFee(estimatedFee));
        setTx(tx);
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transcation"));
      }
    })();
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, halo_balance]);

  return tx;
}
