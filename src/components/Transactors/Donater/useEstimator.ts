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
import ERC20Abi from "abi/ERC20.json";
import { ap_wallets } from "constants/ap_wallets";
import { DonateValues } from "./types";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { providerId, chainId } = useGetWallet();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const selectedToken = watch("token");

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

        if (debounced_amount > +selectedToken.balance) {
          setError("amount", { message: "not enough balance" });
          return;
        }

        if (chainId !== selectedToken.chainId) return; //network selection prompt is shown to user

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

        let gasLimit: ethers.BigNumber;
        if (selectedToken.contractAddr) {
          const ER20Contract: any = new ethers.Contract(
            selectedToken.contractAddr,
            ERC20Abi,
            signer
          );
          gasLimit = await ER20Contract.estimateGas.transfer(tx.to, wei_amount);
        } else {
          gasLimit = await signer.estimateGas(tx);
        }

        const minFee = gasLimit.mul(gasPrice);
        const fee = ethers.utils.formatUnits(minFee, selectedToken.decimals);

        setEthTx(tx);
        dispatch(setFee(parseFloat(fee)));
        dispatch(setFormLoading(false));

        //CW20 token estimate
      } catch (err) {
        console.error(err);
        dispatch(setFormError("tx simulation failed"));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, selectedToken, providerId, chainId]);

  return { ethTx };
}
