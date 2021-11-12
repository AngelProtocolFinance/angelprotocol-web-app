import { useFormContext } from "react-hook-form";
import {
  Transaction,
  Connection,
  clusterApiUrl,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { Values } from "./types";
import { useEffect, useState } from "react";
import { useGetPhantom } from "contexts/PhantomProvider";
import useDebouncer from "./useDebouncer";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
import { ap_wallets } from "constants/contracts";

export default function useSolEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const [tx, setTx] = useState<Transaction>();
  const wallet = useGetPhantom();

  const amount = Number(watch("amount")) || 0;
  const currency = watch("currency");
  const debounced_amount = useDebouncer(amount, 500);

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not UST
        if (currency !== denoms.sol) {
          return;
        }

        setValue("form_error", "");
        if (!wallet.provider) {
          setValue("form_error", "Solana wallet is not connected");
          return;
        }
        if (!debounced_amount) {
          setValue("fee", 0);
          return;
        }

        //initial balance check to successfully run estimate
        if (debounced_amount >= wallet.balance / 1e9) {
          setValue("form_error", "Not enough balance");
          return;
        }

        setValue("loading", true);
        const endpoint = clusterApiUrl(chains.sol_dev);
        const connection = new Connection(endpoint);
        const recent_block = await connection.getRecentBlockhash();
        const num_signature = 1; //one signer only
        const fee =
          (recent_block.feeCalculator.lamportsPerSignature / 1e9) *
          num_signature;

        let receiver = new PublicKey(ap_wallets[denoms.sol][chains.sol_dev]);

        const instruction = SystemProgram.transfer({
          toPubkey: receiver,
          fromPubkey: wallet.provider._publicKey,
          lamports: debounced_amount * 1e9,
        });

        const transaction = new Transaction({
          feePayer: wallet.provider._publicKey,
          recentBlockhash: recent_block.blockhash,
        }).add(instruction);

        setTx(transaction);
        setValue("fee", fee);
        setValue("loading", false);
      } catch (err) {
        console.error(err);
        setValue("form_error", "Error estimating transaction");
        setValue("loading", false);
      }
    })();
    //eslint-disable-next-line
  }, [wallet, debounced_amount, currency]);

  return tx;
}
