import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { useSetModal } from "components/Nodal/Nodal";
import ErrPop, { Props as ErrProps } from "components/Donater/ErrPop";
import Result, { Props as ResProps } from "components/Donater/Result";
import Waiter, { Props as WaitProps } from "components/Donater/Waiter";
import displayTerraError from "components/Donater/displayTerraError";
import useUSTEstimator from "./useEstimator";
import Contract from "contracts/Contract";
import { Values } from "./types";
import Halo from "contracts/Halo";

export default function useSubmit() {
  useUSTEstimator();
  const { reset } = useFormContext<Values>();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function sender(data: Values) {
    const UST_amount = data.amount;
    // const liquid_split = 100 - Number(data.split);

    try {
      if (!wallet) {
        showModal<ErrProps>(ErrPop, {
          desc: "No Terra wallet is currently connected",
        });
        return;
      }

      //recreate tx here with actual form contents
      const contract = new Halo(wallet);
      const tx = await contract.createPoll(
        Number(data.amount),
        data.title,
        data.description,
        data.link
      );

      const response = await wallet.post(tx);

      if (response.success) {
        showModal<WaitProps>(Waiter, {
          desc: "Waiting for transaction result",
          url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          showModal<ResProps>(Result, {
            sent: +UST_amount,
            received: 0,
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          });
        } else {
          showModal<ErrProps>(ErrPop, {
            desc: "Transaction failed",
            url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      displayTerraError(err, showModal);
    } finally {
      reset();
    }
  }

  return sender;
}
