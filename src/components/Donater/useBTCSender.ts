import { useSetModal } from "components/Nodal/Nodal";
import { ap_wallets } from "constants/contracts";
import { denoms } from "constants/currency";
import { chains } from "contracts/types";
// import { useState } from "react";
import { useWallet } from "use-wallet";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import { DWindow } from "./types";

const d_window: DWindow = window;
export default function useBTCSender() {
  const { showModal } = useSetModal();
  const wallet = useWallet();

  async function sender() {
    //no need to check if
    if (!wallet || !wallet.ethereum || !d_window.xfi) {
      showModal<ErrProps>(ErrPop, {
        desc: "No bitcoin wallet is currently connected",
      });
      return;
    }
    if (!d_window.xfi.bitcoin) {
      showModal<ErrProps>(ErrPop, {
        desc: "Bitcoin network may not be enabled in your wallet.",
      });
      return;
    }

    const provider = d_window.xfi.bitcoin;
    alert(ap_wallets[denoms.btc][chains.btc_test]);

    const result = await new Promise((resolve, reject) => {
      provider.request(
        { method: "request_accounts" },
        (err: any, accounts: any) => {
          if (err) {
            console.log(err);
            reject();
          }
          provider.request(
            {
              method: "transfer",
              params: [
                {
                  feeRate: 10,
                  from: accounts[0],
                  recipient: "tb1qa8w39efvuyxg94qfsuwfvxffcmgzw3aeq08hgc",
                  // recipient: ap_wallets[denoms.btc][chains.btc_test],
                  amount: 0.0001,
                  memo: "",
                },
              ],
            },
            (error: any, result: any) => {
              if (error) {
                console.error(error);
                reject();
              }
              resolve(result);
            }
          );
        }
      );
    });

    console.log(result);
  }
  return sender;
}
