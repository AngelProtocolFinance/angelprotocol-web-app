import { ap_wallets } from "constants/contracts";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
import { ethers, BigNumber, utils } from "ethers";
import { TransactionRequest } from "@ethersproject/abstract-provider";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useWallet } from "use-wallet";
import { Values } from "./types";
import useDebouncer from "./useDebouncer";

export default function useEthEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<TransactionRequest>();
  const wallet = useWallet();

  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        if (currency !== denoms.ether) {
          return;
        }

        setValue("form_error", "");
        if (!wallet.ethereum) {
          setValue("form_error", "Ethereum wallet is not connected");
          return;
        }

        if (wallet.chainId !== Number(chains.ropsten)) {
          setValue("form_error", "Kindly set your network to Kovan");
          return;
        }
        if (!debounced_amount) {
          setValue("fee", 0);
          return;
        }
        setValue("loading", true);
        const wei_balance = BigNumber.from(wallet.balance);
        const wei_amount = utils.parseEther(debounced_amount.toString());
        if (wei_amount.gt(wei_balance)) {
          setValue("form_error", "Not enough balance");
          return;
        }

        const raw_transaction = {
          to: ap_wallets[denoms.ether][chains.ropsten],
          value: wei_amount,
        };

        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = provider.getSigner();
        //get fee setting from provider
        const fee_data = await signer.getFeeData();
        const gas = await signer.estimateGas(raw_transaction);
        const big_fee = gas.mul(fee_data.maxFeePerGas!);
        const eth_fee = +utils.formatEther(big_fee);

        setTx(raw_transaction);
        setValue("fee", eth_fee);
      } catch (err) {
        console.error(err);
        setValue("form_error", "Error estimating transaction");
      } finally {
        setValue("loading", false);
      }
    })();
    //eslint-disable-next-line
  }, [currency, debounced_amount, wallet]);

  return tx;
}
