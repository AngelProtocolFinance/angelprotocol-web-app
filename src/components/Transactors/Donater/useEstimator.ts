import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import {
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
  MsgSend,
} from "@terra-money/terra.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "./types";
import { useGetter, useSetter } from "store/accessors";
import { Dwindow } from "slices/providerSlice";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import Contract from "contracts/Contract";
import Indexfund from "contracts/IndexFund";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import getTokenBalance from "helpers/getTokenBalance";
import processEstimateError from "helpers/processEstimateError";
import { ap_wallets } from "constants/ap_wallets";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";

export default function useEstimator() {
  const { wallet } = useWalletContext();
  const isTestnet = wallet?.network.chainID === chainIDs.terra_test;
  const dispatch = useSetter();
  const {
    watch,
    getValues,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { active: activeProvider } = useGetter((state) => state.provider);
  const { coins } = useGetter((state) => state.wallet);

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const token = watch("token");

  const [terraTx, setTerraTx] = useState<CreateTxOptions>();
  const [ethTx, setEthTx] = useState<TransactionRequest>();
  const [bnbTx, setBnbTx] = useState<TransactionRequest>();

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

        //CW20 TOKENS
        if (token.cw20_contract) {
          const tokenContract =
            token.cw20_contract[isTestnet ? "testnet" : "mainnet"];
          if (tokenContract) {
            if (activeProvider === "terra") {
              const contract = new CW20(tokenContract, wallet);
              const receiver = ap_wallets.terra;

              const msg = contract.createTransferMsg(
                debounced_amount,
                receiver
              );
              const aminoFee = await contract.estimateFee([msg]);
              const numFee = extractFeeNum(aminoFee);

              const ustBalance = getTokenBalance(coins, denoms.uusd);
              if (numFee >= ustBalance) {
                setError("amount", {
                  message: "not enough balance to pay for fees",
                });
                return;
              }
              dispatch(setFee(numFee));
              setTerraTx({ msgs: [msg], fee: aminoFee });
              dispatch(setFormLoading(false));
            }
          } else {
            dispatch(setFormError("token not supported in this network"));
            return;
          }

          //NATIVE TOKEN
        } else {
          //checks for uusd
          if (token.min_denom === denoms.uusd) {
            if (activeProvider === "terra") {
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
              if (debounced_amount + feeNum >= tokenBalance) {
                setError("amount", {
                  message: "not enough balance to pay for fees",
                });
                return;
              }
              dispatch(setFee(feeNum));
              setTerraTx({ msgs: [depositMsg], fee });
            }
          }

          //checks for uluna
          if (token.min_denom === denoms.uluna) {
            if (activeProvider === "terra") {
              //this block won't run if wallet is not connected
              //activeProvider === Providers.none
              const contract = new Contract(wallet);
              const sender = wallet!.address;
              const receiver = ap_wallets.terra;
              const amount = new Dec(debounced_amount).mul(1e6);

              const msg = new MsgSend(sender, receiver, [
                new Coin(denoms.uluna, amount.toNumber()),
              ]);
              const aminoFee = await contract.estimateFee([msg], denoms.uluna);
              const numFee = extractFeeNum(aminoFee, denoms.uluna);

              if (debounced_amount + numFee >= tokenBalance) {
                setError("amount", {
                  message: "not enough balance to pay for fees",
                });
                return;
              }
              dispatch(setFee(numFee));
              setTerraTx({ msgs: [msg], fee: aminoFee });
            }
          }

          //estimates for eth
          if (token.min_denom === denoms.wei) {
            const dwindow = window as Dwindow;
            //provider is present at this point
            let provider: ethers.providers.Web3Provider;

            if (activeProvider === "ethereum") {
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
              to: ap_wallets.eth,
              value: wei_amount,
            };

            const gasLimit = await signer.estimateGas(tx);
            const fee_wei = gasLimit.mul(gasPrice);
            const fee_eth = ethers.utils.formatEther(fee_wei);

            setEthTx(tx);
            dispatch(setFee(parseFloat(fee_eth)));
          }

          //estimates for bnb
          if (token.min_denom === denoms.bnb) {
            const dwindow = window as Dwindow;
            //provider is present at this point
            let provider: ethers.providers.Web3Provider;

            if (activeProvider === "binance") {
              provider = new ethers.providers.Web3Provider(
                dwindow.BinanceChain!
              );
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
              to: ap_wallets.eth,
              value: wei_amount,
            };

            const gasLimit = await signer.estimateGas(tx);
            const fee_wei = gasLimit.mul(gasPrice);

            const fee_bnb = ethers.utils.formatEther(fee_wei);

            setBnbTx(tx);
            dispatch(setFee(parseFloat(fee_bnb)));
          }
          dispatch(setFormLoading(false));
          return;
        }

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

  return { terraTx, ethTx, bnbTx };
}
