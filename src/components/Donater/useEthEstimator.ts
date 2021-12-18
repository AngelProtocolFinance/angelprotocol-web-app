import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";
import { ethers, BigNumber, utils } from "ethers";
import { TransactionRequest } from "@ethersproject/abstract-provider";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useWallet } from "use-wallet";
import { Values } from "./types";
import useDebouncer from "hooks/useDebouncer";
import { useSetter } from "store/accessors";
import {
  setFormError,
  setFee,
  setFormLoading,
} from "services/transaction/transactionSlice";

export default function useEthEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    formState: { isValid },
  } = useFormContext<Values>();
  const [tx, setTx] = useState<TransactionRequest>();
  const wallet = useWallet();
  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!isValid) return;

        if (currency !== denoms.ether) {
          return;
        }

        dispatch(setFormError(""));
        if (!wallet.ethereum) {
          dispatch(setFormError("Ethereum wallet is not connected"));
          return;
        }

        if (wallet.chainId !== Number(chainIDs.eth_ropsten)) {
          dispatch(setFormError("Kindly set your network to Ropsten"));
          return;
        }
        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }
        dispatch(setFormLoading(true));
        const wei_balance = BigNumber.from(wallet.balance);
        const wei_amount = utils.parseEther(debounced_amount.toString());

        //initial balance check to ensure estimate will run
        if (wei_amount.gt(wei_balance)) {
          dispatch(setFormError("Not enough balance"));
          return;
        }
        const raw_transaction = {
          to: ap_wallets[denoms.ether][chainIDs.eth_ropsten],
          value: wei_amount,
        };

        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        //get fee setting from provider
        const fee_data = await signer.getFeeData();
        const gas = await signer.estimateGas(raw_transaction);
        const big_fee = gas.mul(fee_data.maxFeePerGas!);
        const eth_fee = +utils.formatEther(big_fee);

        //2nd balance check including estimated fee
        if (wei_amount.gt(wei_balance.add(big_fee))) {
          dispatch(setFormError("Not enough balance"));
          return;
        }

        setTx(raw_transaction);
        dispatch(setFee(eth_fee));
        dispatch(setFormLoading(false));
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Error estimating transaction"));
      }
    })();
    //eslint-disable-next-line
  }, [currency, debounced_amount, wallet]);

  return tx;
}
