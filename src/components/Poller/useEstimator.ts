import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import Halo from "contracts/Halo";
import { denoms } from "constants/currency";
import useTerraBalance from "hooks/useTerraBalance";
import useHaloBalance from "hooks/useHaloBalance";
import { Values } from "./types";

export default function useEstimator() {
  const { watch, setValue } = useFormContext<Values>();
  const { main: UST_balance } = useTerraBalance(denoms.uusd);
  const halo_balance = useHaloBalance();
  const wallet = useConnectedWallet();

  const amount = Number(watch("amount")) || 0;

  useEffect(() => {
    (async () => {
      try {
        setValue("form_error", "");
        if (!wallet) {
          setValue("form_error", "Terra wallet is not connected");
          return;
        }

        //initial balance check to successfully run estimate
        if (amount >= halo_balance) {
          setValue("form_error", "Not enough Halo balance");
          return;
        }

        setValue("loading", true);
        const contract = new Halo(wallet);
        const tx = await contract.createPoll(
          amount,
          //just set max contraints for estimates to avoid
          //estimating fee on different string lengths
          create_placeholder(64),
          create_placeholder(1024),
          create_placeholder(128)
        );

        //fee estimate with max contraints
        const estimatedFee = tx
          .fee!.amount.get(denoms.uusd)!
          .mul(1e-6)
          .amount.toNumber();

        //2nd balance check including fees
        if (estimatedFee >= UST_balance) {
          setValue("form_error", "Not enough UST to pay fees");
          return;
        }

        setValue("fee", estimatedFee);
        setValue("loading", false);
      } catch (err) {
        console.error(err);
        setValue("loading", false);
        setValue("form_error", "Error estimating transaction");
      }
    })();
    //eslint-disable-next-line
  }, [wallet, halo_balance, UST_balance]);

  //return estimated fee computed using max constraints
}

function create_placeholder(num_bytes = 1) {
  return Array(num_bytes).fill("a").join("");
}
