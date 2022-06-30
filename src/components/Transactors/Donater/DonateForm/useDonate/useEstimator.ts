import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { Coin, CreateTxOptions, MsgSend } from "@terra-money/terra.js";
import ERC20Abi from "abi/ERC20.json";
import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import CW20 from "contracts/CW20";
import useDebouncer from "hooks/useDebouncer";
import { getProvider } from "helpers/getProvider";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import TerraContract from "./TerraContract";

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { wallet } = useGetWallet();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const selectedToken = watch("token");

  const [evmTx, setEVMtx] = useState<TransactionRequest>();
  const [terraTx, setTerraTx] = useState<CreateTxOptions>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
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

        dispatch(setFormLoading(true));

        /** terra native transaction, send or contract interaction */
        if (selectedToken.type === "terra-native") {
          const contract = new TerraContract(wallet.address);
          const amount = new Decimal(debounced_amount).mul(1e6);

          const msg = new MsgSend(wallet.address, ap_wallets.terra, [
            new Coin(denoms.uluna, amount.toNumber()),
          ]);
          const { fee, feeNum } = await contract.estimateFee([msg]);

          if (debounced_amount + feeNum >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          dispatch(setFee(feeNum));
          setTerraTx({ msgs: [msg], fee });
        }

        /** terra cw20 transaction */
        if (selectedToken.type === "cw20") {
          const contract = new CW20(wallet, selectedToken.contract_addr);
          const msg = contract.createTransferMsg(
            debounced_amount,
            ap_wallets.terra
          );
          const { fee, feeNum } = await contract.estimateFee([msg]);

          if (
            feeNum >=
            wallet.displayCoin
              .balance /** displayCoin is native - for payment of fee */
          ) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          dispatch(setFee(feeNum));
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
          const fee = ethers.utils.formatUnits(minFee, selectedToken.decimals);

          setEVMtx(tx);
          dispatch(setFee(parseFloat(fee)));
        }

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
  }, [debounced_amount, debounced_split, selectedToken, wallet]);

  return { evmTx, terraTx };
}
