import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions, Dec } from "@terra-money/terra.js";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useDebouncer from "hooks/useDebouncer";
// import useTerraBalance from "hooks/useTerraBalance";
import {
  useBalances,
  useGovStaker,
  useHaloBalance,
} from "services/terra/queriers";
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
  const halo_balance = useHaloBalance();
  const is_stake = watch("is_stake");
  const amount = Number(watch("amount")) || 0;
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;
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
          if (debounced_amount > halo_balance) {
            dispatch(setFormError("Not enough Halo balance"));
            return;
          }
        } else {
          const staker_balance = new Dec(gov_staker.balance).div(1e6);
          if (staker_balance.lt(debounced_amount)) {
            dispatch(
              setFormError(
                `Current balance is ${toCurrency(
                  staker_balance.toNumber(),
                  2
                )} HALO`
              )
            );
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
    //eslint-disable-next-line
  }, [debounced_amount, wallet, UST_balance, halo_balance]);

  return tx;
}
