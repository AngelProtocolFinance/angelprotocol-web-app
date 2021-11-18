import { Dec } from "@terra-money/terra.js";
import {
  StdFee,
  StdSignDoc,
  coin as create_coin,
  MsgSend,
} from "@cosmjs/launchpad";
import { useSetModal } from "components/Nodal/Nodal";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DWindow } from "types/window";
import { useGetKeplr } from "wallets/Keplr";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import { Values } from "./types";

const dwindow: DWindow = window;
export default function useAtomSender() {
  const { provider } = useGetKeplr();
  const { showModal } = useSetModal();
  const { watch, setValue } = useFormContext<Values>();

  const currency = watch("currency");

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not UST
        if (currency !== denoms.uatom) {
          return;
        }
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

      const offline_signer = dwindow.getOfflineSigner!(chains.cosmos_3);
      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;

      const dec_uatom = new Dec(data.amount).mul(1e6);

      const fee: StdFee = {
        amount: [create_coin(1000, denoms.uatom)],
        gas: "1000",
      };

      const msg_send: MsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: address,
          to_address: address,
          amount: [create_coin(dec_uatom.toNumber(), denoms.uatom)],
        },
      };

      const doc: StdSignDoc = {
        chain_id: chains.cosmos_3,
        account_number: "",
        sequence: "",
        fee,
        msgs: [msg_send],
        memo: "",
      };
      const response = await offline_signer.signAmino(address, doc);

      // const cosmJS = new SigningCosmosClient(
      //   "https://node-cosmoshub-3.keplr.app/rest",
      //   accounts[0].address,
      //   offline_signer
      // );

      // const dec_uatom = new Dec(data.amount).mul(1e6);

      // const result = await cosmJS.sendTokens(
      //   "cosmos1epw9e02r3cdgem0c74847v2fm529rxatsm2v3x",
      //   [
      //     {
      //       denom: denoms.uatom,
      //       amount: dec_uatom.toString(),
      //     },
      //   ]
      // );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return sender;
}
