import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgSendEncodeObject } from "@cosmjs/stargate";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { Coin, CreateTxOptions, MsgSend } from "@terra-money/terra.js";
import ERC20Abi from "abi/ERC20.json";
import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { TxOptions } from "slices/transaction/types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import Contract from "contracts/Contract";
import useDebouncer from "hooks/useDebouncer";
import { getProvider } from "helpers/getProvider";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import { IS_TEST } from "constants/env";
import estimateTerraFee from "./estimateTerraFee";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isDirty },
    getFieldState,
    getValues,
  } = useFormContext<DonateValues>();
  const { wallet } = useGetWallet();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const selectedToken = watch("token");

  const [evmTx, setEVMtx] = useState<TransactionRequest>();
  const [terraTx, setTerraTx] = useState<CreateTxOptions>();
  const [cosmosTx, setCosmosTx] = useState<TxOptions>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isDirty || !debounced_amount || getFieldState("amount").error) {
          dispatch(setFee(0));
          return;
        }

        if (debounced_amount > +selectedToken.balance) {
          setError("amount", { message: "not enough balance" });
          return;
        }

        dispatch(setFormLoading(true));

        /** juno native transaction, send or contract interaction */
        if (selectedToken.type === "juno-native") {
          //donate to contract
          let msg: MsgSendEncodeObject | MsgExecuteContractEncodeObject;
          const contract = new Contract(wallet);
          msg = contract.createTransferNativeMsg(
            debounced_amount,
            ap_wallets.juno
          );

          if (IS_TEST) {
            const account = new Account(
              wallet,
              getValues("receiver") as string
            );
            msg = account.createDepositMsg(
              {
                liquid_percentage: "1",
                locked_percentage: "0",
              },
              [
                {
                  amount: new Decimal(debounced_amount)
                    .mul(1e6)
                    .divToInt(1)
                    .toString(),
                  denom: "ujunox",
                },
              ]
            );
          }
          const { fee, feeNum } = await contract.estimateFee([msg]);
          dispatch(setFee(feeNum));

          /** displayCoin is native - for payment of fee */
          if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          setCosmosTx({ msgs: [msg], fee });
        }

        /** juno cw20 transaction */
        if (selectedToken.type === "cw20") {
          const contract = new CW20(wallet, selectedToken.contract_addr);
          const msg = contract.createTransferMsg(
            debounced_amount,
            ap_wallets.juno
          );
          const { fee, feeNum } = await contract.estimateFee([msg]);
          dispatch(setFee(feeNum));

          /** displayCoin is native - for payment of fee */
          if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          setCosmosTx({ msgs: [msg], fee });
        }

        /** terra native transaction, send or contract interaction */
        if (selectedToken.type === "terra-native") {
          const amount = new Decimal(debounced_amount).mul(1e6);
          const msg = new MsgSend(wallet.address, ap_wallets.terra, [
            new Coin(denoms.uluna, amount.toNumber()),
          ]);
          const { fee, feeNum } = await estimateTerraFee(wallet, [msg]);
          dispatch(setFee(feeNum));

          if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          setTerraTx({ msgs: [msg], fee });
        }

        /** evm transactions */
        if (
          selectedToken.type === "evm-native" ||
          selectedToken.type === "erc20"
        ) {
          if (wallet.chainId !== selectedToken.chain_id) return; //network selection prompt is shown to user

          const provider = new ethers.providers.Web3Provider(
            getProvider(wallet.providerId) as any
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
          if (selectedToken.type === "erc20") {
            const ER20Contract: any = new ethers.Contract(
              selectedToken.contract_addr,
              ERC20Abi,
              signer
            );
            gasLimit = await ER20Contract.estimateGas.transfer(
              tx.to,
              wei_amount
            );
          } else {
            gasLimit = await signer.estimateGas(tx);
          }

          const minFee = gasLimit.mul(gasPrice);
          const feeNum = parseFloat(
            ethers.utils.formatUnits(minFee, selectedToken.decimals)
          );
          dispatch(setFee(feeNum));

          if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          setEVMtx(tx);
        }

        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("tx simulation failed"));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
  }, [
    debounced_amount,
    debounced_split,
    isDirty,
    selectedToken,
    wallet,
    dispatch,
    getFieldState,
    setError,
    getValues,
  ]);

  return { evmTx, terraTx, cosmosTx };
}
