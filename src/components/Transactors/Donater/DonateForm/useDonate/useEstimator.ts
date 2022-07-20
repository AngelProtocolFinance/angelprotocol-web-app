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
import CW20 from "contracts/CW20";
import Contract from "contracts/Contract";
import useDebouncer from "hooks/useDebouncer";
import { getProvider } from "helpers/getProvider";
import { ap_wallets } from "constants/ap_wallets";
import { isEvmChainId, junoChainId, terraChainId } from "constants/chainIDs";
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

        /** juno native transaction, send or contract interaction */
        if (wallet.chain.chain_id === junoChainId) {
          /** juno native transaction */
          if (wallet.isNativeCoin(selectedToken)) {
            const contract = new Contract(wallet);
            const msg = contract.createTransferNativeMsg(
              debounced_amount,
              ap_wallets.juno
            );
            const { fee, feeNum } = await contract.estimateFee([msg]);
            dispatch(setFee(feeNum));

            if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
              setError("amount", {
                message: "not enough balance to pay for fees",
              });
              return;
            }
            setCosmosTx({ msgs: [msg], fee });

            return;
          }

          const contract = new CW20(wallet, selectedToken.token_id);
          const msg = contract.createTransferMsg(
            debounced_amount,
            ap_wallets.juno
          );
          const { fee, feeNum } = await contract.estimateFee([msg]);
          dispatch(setFee(feeNum));

          // not paying in native currency, so just check if there's enough balance for fees
          if (feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          setCosmosTx({ msgs: [msg], fee });
        }

        /** terra native transaction, send or contract interaction */
        if (wallet.chain.chain_id === terraChainId) {
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
        if (isEvmChainId(wallet.chain.chain_id)) {
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

          if (wallet.isNativeCoin(selectedToken)) {
            const gasLimit = await signer.estimateGas(tx);
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
            const feeNum = parseFloat(
              ethers.utils.formatUnits(minFee, selectedToken.decimals)
            );
            dispatch(setFee(feeNum));

            // not paying in native currency, so just check if there's enough balance for fees
            if (feeNum >= wallet.displayCoin.balance) {
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
  ]);

  return { evmTx, terraTx, cosmosTx };
}
