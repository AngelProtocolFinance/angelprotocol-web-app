import { useFormContext } from "react-hook-form";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useSetModal } from "components/Nodal/Nodal";
import { useGetPhantom } from "wallets/Phantom";
import { chains } from "contracts/types";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import Waiter, { Props as WaitProps } from "./Waiter";
import Result, { Props as ResProps } from "./Result";
import { Values } from "./types";
import useSolEstimator from "./useSolEstimator";
import { denoms } from "constants/currency";
import displaySolError from "./displaySolError";

export default function useSolSender() {
  const { setValue } = useFormContext<Values>();
  const { showModal } = useSetModal();
  const wallet = useGetPhantom();
  const tx = useSolEstimator();
  async function sender(data: Values) {
    try {
      if (!wallet) {
        showModal<ErrProps>(ErrPop, {
          desc: "Solana wallet is not connected.",
        });
        return;
      }
      const signed_tx = await wallet.provider.signTransaction(tx);
      const connection = new Connection(clusterApiUrl(chains.sol_dev));

      showModal<WaitProps>(Waiter, {
        desc: "Waiting for transaction result",
      });

      const signature = await connection.sendRawTransaction(
        signed_tx.serialize()
      );

      showModal<ResProps>(Result, {
        sent: +data.amount,
        received: +data.amount,
        url: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
        precision: 6,
        denom: denoms.sol,
      });
    } catch (error) {
      displaySolError(error, showModal);
    } finally {
      setValue("amount", "");
    }
  }
  return sender;
}
