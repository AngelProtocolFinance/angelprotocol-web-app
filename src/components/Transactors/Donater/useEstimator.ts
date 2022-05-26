import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import useDebouncer from "hooks/useDebouncer";
import { getProvider } from "helpers/getProvider";
import getTokenBalance from "helpers/getTokenBalance";
import { ap_wallets } from "constants/ap_wallets";
import { DonateValues } from "./types";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { providerId, coins } = useGetWallet();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const token = watch("token");

  const [ethTx, setEthTx] = useState<TransactionRequest>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!providerId) {
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

        const provider = new ethers.providers.Web3Provider(
          getProvider(providerId) as any
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
        const minFee = gasLimit.mul(gasPrice);
        const fee = ethers.utils.formatUnits(minFee, token.decimals);

        setEthTx(tx);
        dispatch(setFee(parseFloat(fee)));
        dispatch(setFormLoading(false));

        //CW20 token estimate
      } catch (err) {
        dispatch(setFormError("tx simulation failed"));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, token, coins]);

  return { ethTx };
}
