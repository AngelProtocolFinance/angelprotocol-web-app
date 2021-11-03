import { useConnectedWallet } from "@terra-money/wallet-provider";
import useUSTBalance from "hooks/useUSTBalance";
import { Values as Data } from "components/Donater/schema";
import { useSetModal } from "components/Nodal/Nodal";
import { useFormContext } from "react-hook-form";
import Indexfund from "contracts/IndexFund";
import Account from "contracts/Account";
import { denoms } from "constants/currency";
import ErrPop, { Props as ErrProps } from "components/Donater/ErrPop";
import Estimates, { Props as EstProps } from "components/Donater/Estimates";
import getDepositAmount from "components/Donator/getDepositAmount";
import Waiter from "components/Donater/Waiter";

function useTerraSender(receiver?: string | number) {
  const { handleSubmit, reset } = useFormContext();
  const wallet = useConnectedWallet();
  const UST_balance = useUSTBalance();
  const { show: showModal, hide: hideModal } = useSetModal();

  async function* sender(data: Data) {
    const UST_amount = data.amount;
    const liquid_split = 100 - Number(data.split);

    //submitting is true once this sender is fired
    console.log(data);

    if (!wallet) {
      showModal<ErrProps>(ErrPop, {
        desc: "No wallet is currently connected",
      });
      return;
    }

    if (UST_balance < +UST_amount) {
      showModal<ErrProps>(ErrPop, { desc: "Not enough balance" });
      return;
    }

    try {
      let contract;
      //typeof receiver for IndexFund is number | undefined as enforced by <Donator/> Props
      if (typeof receiver === "number" || typeof receiver === "undefined") {
        contract = new Indexfund(wallet, receiver);
        const tcaMembers = await contract.getTCAList();
        const isTca = tcaMembers.includes(wallet.walletAddress);
        if (!isTca) {
          showModal<ErrProps>(ErrPop, {
            desc: "Your wallet is not included in TCA list",
          });
          return;
        }
      } else {
        contract = new Account(receiver, wallet);
      }

      const transaction = await contract.createDepositTx(
        UST_amount,
        liquid_split
      );

      const estimatedFee = transaction
        .fee!.amount.get(denoms.uusd)!
        .mul(1e-6)
        .amount.toNumber();

      //pause to show user fees
      const res: "resume" | "cancel" = yield estimatedFee;
      if (res === "cancel") {
        reset();
        hideModal();
        return;
      }

      const response = await wallet.post(transaction);
      if (response.success) {
        showModal(Waiter, {
          url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
        });

        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          const depositAmount = getDepositAmount(
            txInfo.logs!,
            wallet.network.chainID
          );
          // setStatus({
          //   step: Steps.success,
          //   message: `Thank you for your donation!`,
          //   result: {
          //     received: +UST_Amount,
          //     deposited: depositAmount,
          //     url: `https://finder.terra.money/${wallet.network.chainID}/tx/${txInfo.txhash}`,
          //   },
          // });
        } else {
          // setStatus({
          //   step: Steps.error,
          //   message: `The transaction ran but failed`,
          // });
        }
      }
    } catch (err) {
      console.log(err);
    }

    alert("done");
    return;
  }

  async function processor(data: Data) {
    const _sender = sender(data);
    const fee = (await _sender.next()).value;
    showModal<EstProps>(Estimates, {
      fee: fee as number,
      amount: +data.amount,
      resume: () => _sender.next("resume"),
      cancel: () => _sender.next("cancel"),
    });
  }

  return handleSubmit(processor);
}

export default useTerraSender;
