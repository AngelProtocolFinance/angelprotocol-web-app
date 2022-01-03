import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import { useBalances, useGovStaker } from "services/terra/queriers";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import toCurrency from "helpers/toCurrency";

export default function useEstimator() {
  const { watch, formState: isValid } = useFormContext<Values>();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const gov_staker = useGovStaker();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;
        dispatch(setFormError(""));
        if (!wallet) {
          dispatch(setFormError("Wallet is disconnected"));
          return;
        }

        dispatch(setFormLoading(true));

        let tx: CreateTxOptions;
        const contract = new Halo(wallet);
        tx = await contract.createGovClaimTx();

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
  }, [wallet, UST_balance]);

  return tx;
}
