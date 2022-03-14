import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import {
  CreateTxOptions,
  Dec,
  MsgSend,
  Coin,
  MsgExecuteContract,
} from "@terra-money/terra.js";
import { useFormContext } from "react-hook-form";
import {
  setFormError,
  setFormLoading,
  setFee,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import { Providers, XdefiWindow } from "services/provider/types";
import useDebouncer from "hooks/useDebouncer";
import Contract from "contracts/Contract";
import Account from "contracts/Account";
import Indexfund from "contracts/IndexFund";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import { DonateValues } from "./types";
import processEstimateError from "helpers/processEstimateError";
import extractFeeNum from "helpers/extractFeeNum";

declare var window: any;

export default function useEstimator() {
  const wallet = useConnectedWallet();
  const dispatch = useSetter();
  const {
    watch,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { coins, supported_denoms } = useGetter((state) => state.wallet);

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const currency = watch("currency");

  const [terraTx, setTerraTx] = useState<CreateTxOptions>();
  const [ethTx, setEthTx] = useState<TransactionRequest>();

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

        //checks for uusd
        if (currency === denoms.uusd) {
          if (activeProvider === Providers.terra) {
            const receiver = getValues("receiver");
            let depositMsg: MsgExecuteContract;
            if (
              typeof receiver === "undefined" ||
              typeof receiver === "number"
            ) {
              const index_fund = new Indexfund(wallet, receiver);
              depositMsg = await index_fund.createDepositMsg(
                debounced_amount,
                debounced_split
              );
            } else {
              const account = new Account(receiver, wallet);
              depositMsg = await account.createDepositMsg(
                debounced_amount,
                debounced_split
              );
            }
            const contract = new Contract(wallet);
            const fee = await contract.estimateFee([depositMsg]);
            const feeNum = extractFeeNum(fee);

            //2nd balance check including fees
            if (debounced_amount + feeNum >= balance) {
              dispatch(setFormError("Not enough balance to pay fees"));
              return;
            }
            dispatch(setFee(feeNum));
            setTerraTx({ msgs: [depositMsg], fee });
          }
        }

        //checks for uluna
        if (currency === denoms.uluna) {
          if (activeProvider === Providers.terra) {
            //this block won't run if wallet is not connected
            //activeProvider === Providers.none
            const contract = new Contract(wallet);
            const sender = wallet!.walletAddress;
            const receiver = ap_wallets[denoms.uluna];
            const amount = new Dec(debounced_amount).mul(1e6);

            const msg = new MsgSend(sender, receiver, [
              new Coin(denoms.uluna, amount.toNumber()),
            ]);
            const aminoFee = await contract.estimateFee([msg], denoms.uluna);
            const numFee = extractFeeNum(aminoFee, denoms.uluna);

            if (debounced_amount + numFee >= balance) {
              dispatch(setFormError("Not enough balance to pay fees"));
              return;
            }
            dispatch(setFee(numFee));
            setTerraTx({ msgs: [msg], fee: aminoFee });
          }
        }

        //estimates for eth
        if (currency === denoms.ether) {
          const xwindow = window as XdefiWindow;
          //provider is present at this point
          let provider;

          if (activeProvider === Providers.ethereum) {
            provider = new ethers.providers.Web3Provider(
              window.ethereum!,
              "any"
            );
          } else {
            provider = new ethers.providers.Web3Provider(
              xwindow.xfi?.ethereum!
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

  return { terraTx, ethTx };
}
