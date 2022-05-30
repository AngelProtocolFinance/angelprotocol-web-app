import { DonateValues } from "./types";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { Coin, CreateTxOptions, Dec, MsgSend } from "@terra-money/terra.js";
import { ap_wallets } from "constants/ap_wallets";
import { currency_text, denoms } from "constants/currency";
import Contract from "contracts/Contract";
import { ethers } from "ethers";
import extractFeeData from "helpers/extractFeeData";
import processEstimateError from "helpers/processEstimateError";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Dwindow, Providers } from "services/provider/types";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";

export default function useEstimator() {
  const { wallet } = useWalletContext();
  const dispatch = useSetter();
  const {
    watch,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { coins, supported_denoms } = useGetter((state) => state.wallet);

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const currency = watch("currency");

  const [terraTx, setTerraTx] = useState<CreateTxOptions>();
  const [ethTx, setEthTx] = useState<TransactionRequest>();
  const [bnbTx, setBnbTx] = useState<TransactionRequest>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (activeProvider === Providers.none) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;

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

        dispatch(setFormLoading(true));

        //checks for uluna
        if (currency === denoms.uluna) {
          if (activeProvider === Providers.terra) {
            //this block won't run if wallet is not connected
            //activeProvider === Providers.none
            const contract = new Contract(wallet);
            const sender = wallet!.address;
            const receiver = ap_wallets[denoms.uluna];
            const amount = new Dec(debounced_amount).mul(1e6);

            const msg = new MsgSend(sender, receiver, [
              new Coin(denoms.uluna, amount.toNumber()),
            ]);
            const aminoFee = await contract.estimateFee([msg]);
            const { feeAmount, feeDenom } = extractFeeData(aminoFee);

            if (debounced_amount + feeAmount >= balance) {
              dispatch(
                setFormError(
                  `Not enough ${currency_text[feeDenom]} balance to pay fees`
                )
              );
              return;
            }
            dispatch(setFee(feeAmount));
            setTerraTx({ msgs: [msg], fee: aminoFee });
          }
        }

        //estimates for eth
        if (currency === denoms.ether) {
          const dwindow = window as Dwindow;
          //provider is present at this point
          let provider: ethers.providers.Web3Provider;

          if (activeProvider === Providers.ethereum) {
            provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
          } else {
            provider = new ethers.providers.Web3Provider(
              dwindow.xfi?.ethereum!
            );
          }
          //no network request
          const signer = provider.getSigner();
          const sender = await signer.getAddress();

          const gasPrice = await signer.getGasPrice();
          const wei_amount = ethers.utils.parseEther(`${debounced_amount}`);

          const tx: TransactionRequest = {
            from: sender,
            to: ap_wallets[denoms.ether],
            value: wei_amount,
          };

          const gasLimit = await signer.estimateGas(tx);
          const fee_wei = gasLimit.mul(gasPrice);

          const fee_eth = ethers.utils.formatEther(fee_wei);

          setEthTx(tx);
          dispatch(setFee(parseFloat(fee_eth)));
        }

        //estimates for bnb
        if (currency === denoms.bnb) {
          const dwindow = window as Dwindow;
          //provider is present at this point
          let provider: ethers.providers.Web3Provider;

          if (activeProvider === Providers.binance) {
            provider = new ethers.providers.Web3Provider(dwindow.BinanceChain!);
          } else if (dwindow.xfi?.ethereum!) {
            provider = new ethers.providers.Web3Provider(
              dwindow.xfi?.ethereum!
            );
          } else throw new Error("Estimating BNB Fee Failed. Provider Error");

          //no network request
          const signer = provider.getSigner();
          const sender = await signer.getAddress();

          const gasPrice = await signer.getGasPrice();
          const wei_amount = ethers.utils.parseEther(`${debounced_amount}`);

          const tx: TransactionRequest = {
            from: sender,
            to: ap_wallets[denoms.ether],
            value: wei_amount,
          };

          const gasLimit = await signer.estimateGas(tx);
          const fee_wei = gasLimit.mul(gasPrice);

          const fee_bnb = ethers.utils.formatEther(fee_wei);

          setBnbTx(tx);
          dispatch(setFee(parseFloat(fee_bnb)));
        }

        dispatch(setFormLoading(false));
      } catch (err) {
        const formError = processEstimateError(err);
        dispatch(setFormError(formError));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, currency, coins, supported_denoms]);

  return { terraTx, ethTx, bnbTx };
}
