import { Dec } from "@terra-money/terra.js";
import { StdFee, coin as create_coin } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { denoms } from "constants/currency";
import { chainIDs } from "contracts/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DWindow } from "types/window";
import { useGetKeplr } from "wallets/Keplr";
import { Values } from "./types";
import { cosmos4_rpcs } from "constants/urls";
import { ap_wallets } from "constants/ap_wallets";
import { useSetter } from "store/accessors";
import { setStage, setFormError } from "services/transaction/transactionSlice";
import { Step } from "services/transaction/types";
import useTxErrorHandler from "hooks/useTxErrorHandler";
import handleKeplrError from "./handleKeplrError";

const dwindow: DWindow = window;
export default function useAtomSender() {
  const { provider } = useGetKeplr();
  const { watch, setValue } = useFormContext<Values>();
  const handleTxError = useTxErrorHandler();
  const dispatch = useSetter();
  const currency = watch("currency");

  useEffect(() => {
    (async () => {
      try {
        //don't run this estimator when currency is not uatom
        if (currency !== denoms.uatom) return;
        dispatch(setFormError(""));

        if (!provider) {
          dispatch(setFormError("Atom wallet is not connected"));
        }
      } catch (err) {
        console.error(err);
        dispatch(setFormError("Unknown error occured"));
      }
    })();
    //eslint-disable-next-line
  }, [provider, currency]);

  async function sender(data: Values) {
    try {
      if (!provider) {
        dispatch(
          setStage({
            step: Step.error,
            content: { message: "Wallet is disconnected" },
          })
        );
        return;
      }

      const offline_signer = dwindow.getOfflineSigner!(chainIDs.cosmos_4);
      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;
      const client = await SigningStargateClient.connectWithSigner(
        cosmos4_rpcs[chainIDs.cosmos_4],
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

      dispatch(
        setStage({
          step: Step.submit,
          content: { message: "Processing transaction..." },
        })
      );

      const res = await client.sendTokens(
        address,
        ap_wallets[denoms.uatom][chainIDs.cosmos_4],
        [create_coin(dec_amount.toNumber(), denoms.uatom)],
        fee
      );

      if ("code" in res) {
        if (res.code !== 0) {
          dispatch(
            setStage({
              step: Step.error,
              content: {
                message: "Transaction failed",
                url: `https://www.mintscan.io/cosmos/txs/${res.transactionHash}`,
              },
            })
          );
          return;
        }
      }

      dispatch(
        setStage({
          step: Step.success,
          content: {
            message: "Thank you for your donation!",
            url: `https://www.mintscan.io/cosmos/txs/${res.transactionHash}`,
          },
        })
      );
    } catch (err) {
      handleKeplrError(err, handleTxError, denoms.uatom);
    } finally {
      setValue("amount", "");
    }
  }
  return sender;
}
