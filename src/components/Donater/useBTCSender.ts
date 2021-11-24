import { useFormContext } from "react-hook-form";
import { Dec } from "@terra-money/terra.js";
import { useWallet } from "use-wallet";
import { useSetModal } from "components/Nodal/Nodal";
import { denoms } from "constants/currency";
import { ap_wallets } from "constants/contracts";
import Result, { Props as ResProps } from "./Result";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import { DWindow, Values } from "./types";
import useBTCEstimator from "./useBTCEstimator";
import { chains } from "contracts/types";
import displayEthError from "./displayEthError";

const dwindow: DWindow = window;
export default function useBTCSender() {
  const { setValue } = useFormContext<Values>();
  useBTCEstimator();
  const { showModal } = useSetModal();
  const wallet = useWallet();

  async function sender(data: Values) {
    //no need to check if
    try {
      if (!wallet || !wallet.ethereum || !dwindow.xfi) {
        showModal<ErrProps>(ErrPop, {
          desc: "No bitcoin wallet is currently connected",
        });
        return;
      }
      if (!dwindow.xfi.bitcoin) {
        showModal<ErrProps>(ErrPop, {
          desc: "Bitcoin network may not be enabled in your wallet.",
        });
        return;
      }
      const provider = dwindow.xfi.bitcoin;
      //1BTC = 1e8 satoshis
      const dec_satoshi = new Dec(data.amount).mul(1e8);
      const accounts = await rpc_request(provider, "request_accounts");
      const _main = accounts[0];

      const hash = await rpc_request(provider, "transfer", [
        {
          feeRate: 10,
          from: _main,
          recipient: ap_wallets[denoms.btc][chains.btc_test],
          amount: {
            amount: dec_satoshi.toNumber(),
            decimals: 8,
          },
          memo: "",
        },
      ]);

      const explorer_url = `https://www.blockchain.com/btc-testnet/tx/${hash}`;

      showModal<ResProps>(Result, {
        sent: +data.amount,
        received: +data.amount,
        url: explorer_url,
        precision: 6,
        denom: denoms.btc,
      });
    } catch (err) {
      displayEthError(err, showModal);
    } finally {
      setValue("amount", "");
    }
  }
  return sender;
}

async function rpc_request(
  provider: any,
  method: string,
  params?: any
): Promise<any> {
  const _req: { method: string; params?: any } = { method };
  if (params) _req.params = params;
  return new Promise((resolve, reject) => {
    provider.request(_req, (error: any, data: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
