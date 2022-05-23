import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "./types";
import { useGetter, useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import useDebouncer from "hooks/useDebouncer";
import getInjectedProvider from "helpers/getInjectedProvider";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { coins } = useGetter((state) => state.wallet);

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const token = watch("token");

  const [ethTx, setEthTx] = useState<TransactionRequest>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (activeProvider === "none") {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        const tokenBalance = getTokenBalance(coins, token.min_denom);
        if (debounced_amount > tokenBalance) {
          setError("amount", { message: "not enough balance" });
          return;
        }

        dispatch(setFormLoading(true));

        if (token.min_denom === denoms.wei || token.min_denom === denoms.bnb) {
          const provider = new ethers.providers.Web3Provider(
            getInjectedProvider(activeProvider)
          );
          //no network request
          const signer = provider.getSigner();
          const sender = await signer.getAddress();

          const gasPrice = await signer.getGasPrice();
          const wei_amount = ethers.utils.parseEther(`${debounced_amount}`);

          const tx: TransactionRequest = {
            from: sender,
            to: ap_wallets.eth,
            value: wei_amount,
          };

          const gasLimit = await signer.estimateGas(tx);
          const fee_wei = gasLimit.mul(gasPrice);
          const fee_eth = ethers.utils.formatEther(fee_wei);

          setEthTx(tx);
          dispatch(setFee(parseFloat(fee_eth)));
        }

        dispatch(setFormLoading(false));
        return;

        //CW20 token estimate
      } catch (err) {
        const formError = processEstimateError(err);
        dispatch(setFormError(formError));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, token, coins]);

  return { ethTx };
}
