import { useFormContext } from "react-hook-form";
import { Dec } from "@terra-money/terra.js";
import { useWallet } from "use-wallet";
import { denoms } from "constants/currency";
import { ap_wallets } from "constants/contracts";
import { DWindow, Values } from "./types";
import useBTCEstimator from "./useBTCEstimator";
import { chains } from "contracts/types";
import handleEthError from "./handleEthError";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import { useSetter } from "store/accessors";
import { setStage } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";

const dwindow: DWindow = window;
export default function useBTCSender() {
  useBTCEstimator();
  const dispatch = useSetter();
  const { setValue } = useFormContext<Values>();
  const handleTxError = useTxErrorHandler();
  const wallet = useWallet();

  async function sender(data: Values) {
    //no need to check if
    try {
      if (!wallet || !wallet.ethereum || !dwindow.xfi) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Bitcoin wallet disconnected" },
          })
        );
        return;
      }
      if (!dwindow.xfi.bitcoin) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Bitcoin network disabled in wallet" },
          })
        );
        return;
      }

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Submitting transaction..." },
        })
      );

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

      dispatch(
        setStage({
          step: Step.success,
          content: {
            message: "Thank you for your donation!",
            url: explorer_url,
          },
        })
      );
    } catch (err) {
      handleEthError(err, handleTxError);
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
