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
import { Dwindow, Providers } from "services/provider/types";
import { useCw20TokenBalance } from "services/terra/queriers";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "services/transaction/transactionSlice";
import { useGetter, useSetter } from "store/accessors";
import Account from "contracts/Account";
import Contract from "contracts/Contract";
import Indexfund from "contracts/IndexFund";
import useDebouncer from "hooks/useDebouncer";
import useWalletContext from "hooks/useWalletContext";
import extractFeeNum from "helpers/extractFeeNum";
import processEstimateError from "helpers/processEstimateError";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import { DonateValues } from "./types";

export default function useEstimator() {
  const { wallet } = useWalletContext();
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
  const cw20_contract = watch("cw20_contract");
  const native_denoms = [denoms.uusd, denoms.uluna];

  // query balance for non-native cw20Token
  const { tokenBalance } = useCw20TokenBalance(cw20_contract!);

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
          dispatch(setFee({ fee: 0 }));
          return;
        }
        //check if required balance is sufficient
        const balance =
          coins.find((coin) => coin.denom === currency)?.amount || tokenBalance;

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
            dispatch(setFee({ fee: feeNum }));
            setTerraTx({ msgs: [depositMsg], fee });
          }
        }

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
            const aminoFee = await contract.estimateFee([msg], denoms.uluna);
            const numFee = extractFeeNum(aminoFee, denoms.uluna);

            if (debounced_amount + numFee >= balance) {
              dispatch(setFormError("Not enough balance to pay fees"));
              return;
            }
            dispatch(setFee({ fee: numFee }));
            setTerraTx({ msgs: [msg], fee: aminoFee });
          }
        }

        //checks for supported cw20tokens
        if (
          supported_denoms.includes(currency) &&
          !native_denoms.includes(currency)
        ) {
          if (activeProvider === Providers.terra) {
            //this block won't run if wallet is not connected
            //activeProvider === Providers.none

            // strict check to make sure the contract address is present
            if (!cw20_contract) {
              dispatch(setFormError("Token contract address not found!!!"));
              return;
            }

            const denom = denoms[currency];
            const contract = new Contract(wallet);
            const receiver = ap_wallets[denoms.uluna];
            const amount = new Dec(debounced_amount)
              .mul(1e6)
              .toInt()
              .toString();

            const msg = contract.createCw20TransferMsg(
              amount,
              cw20_contract,
              receiver
            );
            const aminoFee = await contract.estimateFee([msg], denom);
            const numFee = extractFeeNum(aminoFee);

            const ustBalance =
              coins.find((coin) => coin.denom === denoms.uusd)?.amount || 0;
            if (numFee >= ustBalance) {
              dispatch(setFormError("Not enough balance to pay fees"));
              return;
            }
            dispatch(setFee({ fee: numFee, denom: denoms.uusd }));
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
          dispatch(setFee({ fee: parseFloat(fee_eth) }));
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
          dispatch(setFee({ fee: parseFloat(fee_bnb) }));
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
  }, [debounced_amount, debounced_split, currency, coins, supported_denoms, tokenBalance]);

  return { terraTx, ethTx, bnbTx };
}
