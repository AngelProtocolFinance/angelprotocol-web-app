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
import CW20 from "contracts/CW20";
import Contract from "contracts/Contract";
import useDebouncer from "hooks/useDebouncer";
import { getProvider } from "helpers/getProvider";
import logger from "helpers/logger";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import estimateTerraFee from "./estimateTerraFee";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isDirty },
    getFieldState,
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
          if (selectedToken.type.includes("native")) {
            const contract = new Contract(wallet);
            const msg = contract.createTransferNativeMsg(
              debounced_amount,
              ap_wallets.juno
            );
            const { fee, feeAmount } = await contract.estimateFee([msg]);
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
            const { fee, feeAmount } = await contract.estimateFee([msg]);
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
          if (selectedToken.type.includes("native")) {
            const msg = new MsgSend(wallet.address, ap_wallets.terra, [
              new Coin(denoms.uluna, amount),
            ]);
            const { fee, feeAmount } = await estimateTerraFee(wallet, [msg]);
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
            const { fee, feeAmount } = await estimateTerraFee(wallet, [msg]);
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

          if (selectedToken.type.includes("native")) {
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
  ]);

  return { evmTx, terraTx, cosmosTx };
}
