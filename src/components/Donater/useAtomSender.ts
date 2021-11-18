import { Dec } from "@terra-money/terra.js";
import { SigningCosmosClient } from "@cosmjs/launchpad";
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
          desc: "Solana wallet is not connected.",
        });
        return;
      }

      const offlineSigner = dwindow.getOfflineSigner!(chains.cosmos_3);
      const accounts = await offlineSigner.getAccounts();

      const cosmJS = new SigningCosmosClient(
        "https://node-cosmoshub-3.keplr.app/rest",
        accounts[0].address,
        offlineSigner
      );

      const dec_uatom = new Dec(data.amount).mul(1e6);

      const result = await cosmJS.sendTokens(
        "cosmos1epw9e02r3cdgem0c74847v2fm529rxatsm2v3x",
        [
          {
            denom: denoms.uatom,
            amount: dec_uatom.toString(),
          },
        ]
      );
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  return sender;
}
