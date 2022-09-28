import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgSendEncodeObject } from "@cosmjs/stargate";
import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import {
  Coin,
  CreateTxOptions,
  MsgExecuteContract,
  MsgSend,
} from "@terra-money/terra.js";
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
import useDebouncer from "hooks/useDebouncer";
import { extractFeeAmount, getProvider, logger } from "helpers";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import { IS_TEST } from "constants/env";
import estimateTerraFee from "./estimateTerraFee";

//set to true to donate directly to account
//only available if IS_TEST
const isSendToContract =
  IS_TEST && process.env.REACT_APP_DONATION_TYPE === "DIRECT";
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

        // juno transaction, send or contract interaction
        if (wallet.chain.type === "juno-native") {
          if (
            selectedToken.type === "juno-native" ||
            selectedToken.type === "ibc"
          ) {
            let msg: MsgSendEncodeObject | MsgExecuteContractEncodeObject;
            const contract = new Account(wallet);
            if (isSendToContract) {
              //TODO: remove this once accounts have initial balances for testing
              alert("you are sending directly to contract");
              msg = contract.createDepositMsg(
                {
                  id: getValues("charityId"),
                  liquid_percentage: "0.5",
                  locked_percentage: "0.5",
                },
                [{ denom: denoms.juno, amount: "1000000" /** manual */ }]
              );
            } else {
              msg = contract.createTransferNativeMsg(
                debounced_amount,
                ap_wallets.juno,
                selectedToken.token_id
              );
            }

            const fee = await contract.estimateFee([msg]);
            const feeAmount = extractFeeAmount(
              fee,
              wallet.chain.native_currency.token_id
            );
            dispatch(setFee(feeAmount));

            if (debounced_amount + feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
            setCosmosTx({ msgs: [msg], fee });
          } else {
            const contract = new CW20(wallet, selectedToken.token_id);
            const msg = contract.createTransferMsg(
              debounced_amount,
              ap_wallets.juno
            );
            const fee = await contract.estimateFee([msg]);

            const feeAmount = extractFeeAmount(
              fee,
              wallet.chain.native_currency.token_id
            );
            dispatch(setFee(feeAmount));

            // not paying in native currency, so just check if there's enough balance for fees
            if (feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
            setCosmosTx({ msgs: [msg], fee });
          }
        }
        // terra native transaction, send or contract interaction
        else if (wallet.chain.type === "terra-native") {
          const amount = new Decimal(debounced_amount)
            .mul(1e6)
            .divToInt(1)
            .toString();
          if (
            selectedToken.type === "terra-native" ||
            selectedToken.type === "ibc"
          ) {
            const msg = new MsgSend(wallet.address, ap_wallets.terra, [
              new Coin(selectedToken.token_id, amount),
            ]);
            const fee = await estimateTerraFee(wallet, [msg]);

            const feeAmount = extractFeeAmount(
              fee,
              wallet.chain.native_currency.token_id
            );
            dispatch(setFee(feeAmount));

            if (debounced_amount + feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
            setTerraTx({ msgs: [msg], fee });
          } else {
            const msg = new MsgExecuteContract(
              wallet.address,
              selectedToken.token_id,
              {
                transfer: {
                  amount,
                  recipient: ap_wallets.terra,
                },
              }
            );
            const fee = await estimateTerraFee(wallet, [msg]);

            const feeAmount = extractFeeAmount(
              fee,
              wallet.chain.native_currency.token_id
            );
            dispatch(setFee(feeAmount));
            if (feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
            setTerraTx({ msgs: [msg], fee });
          }
        }
        // evm transactions
        else {
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

          if (selectedToken.type === "evm-native") {
            const gasLimit = await signer.estimateGas(tx);
            const minFee = gasLimit.mul(gasPrice);
            const feeAmount = parseFloat(
              ethers.utils.formatUnits(minFee, selectedToken.decimals)
            );
            dispatch(setFee(feeAmount));

            if (debounced_amount + feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
          } else {
            const ER20Contract: any = new ethers.Contract(
              selectedToken.token_id,
              ERC20Abi,
              signer
            );
            const gasLimit = await ER20Contract.estimateGas.transfer(
              tx.to,
              wei_amount
            );
            const minFee = gasLimit.mul(gasPrice);
            const feeAmount = parseFloat(
              ethers.utils.formatUnits(minFee, selectedToken.decimals)
            );
            dispatch(setFee(feeAmount));

            // not paying in native currency, so just check if there's enough balance for fees
            if (feeAmount >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
          }

          setEVMtx(tx);
        }

        dispatch(setFormLoading(false));
      } catch (err) {
        logger.error(err);
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
