import { Dec } from "@terra-money/terra.js";
import { StdFee, coin as create_coin } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { useSetModal } from "components/Nodal/Nodal";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DWindow } from "types/window";
import { useGetKeplr } from "wallets/Keplr";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import Waiter, { Props as WaitProps } from "./Waiter";
import Result, { Props as ResProps } from "./Result";
import { Values } from "./types";
import { cosmos_4_rpc } from "constants/urls";
import { ap_wallets } from "constants/contracts";
import displayKeplrError from "./diplayKeplrError";

const dwindow: DWindow = window;
export default function useAtomSender() {
  const { provider } = useGetKeplr();
  const { showModal } = useSetModal();
  const { watch, setValue } = useFormContext<Values>();

  const currency = watch("currency");

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not uatom
        if (currency !== denoms.uatom) return;
        setValue("form_error", "");

        if (!provider) {
          setValue("form_error", "Atom wallet is not connected");
          return;
        }
      } catch (err) {
        console.error(err);
        setValue("form_error", "Unknown error occured");
        setValue("loading", false);
      }
    })();
    //eslint-disable-next-line
  }, [provider, currency]);

  async function sender(data: Values) {
    try {
      if (!provider) {
        showModal<ErrProps>(ErrPop, {
          desc: "Atom wallet is not connected.",
        });
        return;
      }

      const offline_signer = dwindow.getOfflineSigner!(chains.cosmos_4);
      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;

      const client = await SigningStargateClient.connectWithSigner(
        cosmos_4_rpc,
        offline_signer
      );

      //this fee will be overriden by wallet
      //but can opt to override wallet config once fee estimation is clear
      //balance check will also be done by the wallet
      const gas_limit = "80000";
      const fee: StdFee = {
        amount: [create_coin(1, denoms.uatom)],
        gas: gas_limit,
      };

      const dec_amount = new Dec(data.amount).mul(1e6);

      showModal<WaitProps>(Waiter, {
        desc: "Processing transaction...",
      });

      const res = await client.sendTokens(
        address,
        ap_wallets[denoms.uatom][chains.cosmos_4],
        [create_coin(dec_amount.toNumber(), denoms.uatom)],
        fee
      );

      if ("code" in res) {
        if (res.code !== 0) {
          showModal<ErrProps>(ErrPop, {
            desc: "Transaction failed",
            url: `https://www.mintscan.io/cosmos/txs/${res.transactionHash}`,
          });
          return;
        }
      }

      showModal<ResProps>(Result, {
        sent: +data.amount,
        received: +data.amount,
        url: `https://www.mintscan.io/cosmos/txs/${res.transactionHash}`,
        precision: 6,
        denom: denoms.uatom,
      });
    } catch (err) {
      displayKeplrError(err, showModal);
    }
  }

  return sender;
}
