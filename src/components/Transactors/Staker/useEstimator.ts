import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
// import useTerraBalance from "hooks/useTerraBalance";
import { useBalances, useHaloBalance } from "services/terra/queriers";
import { useGovStaker } from "services/terra/gov/queriers";
import { Values } from "./types";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import useStakerBalance from "./useStakerBalance";

export default function useEstimator() {
  const { watch, getValues } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const [tx, setTx] = useState<CreateTxOptions>();
  const dispatch = useSetter();
  const { main: UST_balance } = useBalances(denoms.uusd);
  const is_stake = getValues("is_stake");
  const { balance, locked } = useStakerBalance(is_stake);
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

        if (is_stake) {
          //check $HALO balance
          if (balance.div(1e6).lt(debounced_amount)) {
            dispatch(setFormError("Not enough Halo balance"));
            return;
          }
        } else {
          if (balance.sub(locked).div(1e6).sub(debounced_amount).lt(0)) {
            dispatch(setFormError("Not enough staked less locked"));
            return;
          }
        }

        dispatch(setFormLoading(true));

        let tx: CreateTxOptions;
        const contract = new Halo(wallet);

        if (is_stake) {
          tx = await contract.createGovStakeTx(debounced_amount);
        } else {
          tx = await contract.createGovUnstakeTx(debounced_amount);
        }
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

    return () => {
      dispatch(setFormError(""));
    };
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, balance, locked]);

  return tx;
}
