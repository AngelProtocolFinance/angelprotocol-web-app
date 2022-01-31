import { useConnectedWallet } from "@terra-money/wallet-provider";
import { CreateTxOptions } from "@terra-money/terra.js";
import { denoms } from "constants/currency";
import Account from "contracts/Account";
import Indexfund from "contracts/IndexFund";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";
import useDebouncer from "../../../hooks/useDebouncer";
import { useGetter, useSetter } from "store/accessors";
import {
  setFormError,
  setFormLoading,
  setFee,
} from "services/transaction/transactionSlice";
import { Providers } from "services/provider/types";

export default function useEstimator() {
  const wallet = useConnectedWallet();
  const dispatch = useSetter();
  const { watch, getValues } = useFormContext<Values>();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { coins, supported_denoms } = useGetter((state) => state.wallet);

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const currency = watch("currency");

  const [terraTx, setTerraTx] = useState<CreateTxOptions>();

  const debounced_amount = useDebouncer(amount, 500);
  const debounced_split = useDebouncer(split_liq, 500);

  console.log(coins);

  useEffect(() => {
    (async () => {
      dispatch(setFormError(""));
      try {
        if (activeProvider === Providers.none) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!supported_denoms.includes(currency)) {
          dispatch(
            setFormError("Connected wallet doesn't support this currency")
          );
          return;
        }

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }
        //check if required balance is sufficient
        const balance =
          coins.find((coin) => coin.denom === currency)?.amount || 0;

        if (debounced_amount >= balance) {
          dispatch(setFormError("Not enough balance"));
          return;
        }

        //checks for uusd
        if (currency === denoms.uusd) {
          if (activeProvider === Providers.terra) {
            dispatch(setFormLoading(true));
            const receiver = getValues("receiver");
            let tx: CreateTxOptions;
            if (
              typeof receiver === "undefined" ||
              typeof receiver === "number"
            ) {
              const index_fund = new Indexfund(wallet, receiver);
              tx = await index_fund.createDepositTx(
                debounced_amount,
                debounced_split
              );
            } else {
              const account = new Account(receiver, wallet);
              tx = await account.createDepositTx(
                debounced_amount,
                debounced_split
              );
            }

            const estimatedFee = tx
              .fee!.amount.get(denoms.uusd)!
              .mul(1e-6)
              .amount.toNumber();

            //2nd balance check including fees
            if (debounced_amount + estimatedFee >= balance) {
              dispatch(setFormError("Not enough balance"));
              return;
            }
            dispatch(setFee(estimatedFee));
            setTerraTx(tx);
            dispatch(setFormLoading(false));
            return;
          }
        }

        if (currency === denoms.ether) {
        }
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transaction"));
      }
    })();
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, currency, coins, supported_denoms]);

  return terraTx;
}
