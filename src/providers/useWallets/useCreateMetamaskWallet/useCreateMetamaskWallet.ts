import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { Dec } from "@terra-money/terra.js";
import metamaskIcon from "assets/icons/wallets/metamask.png";
import logDonation from "components/Transactors/Donater/logDonation";
import { chainIDs } from "constants/chainIDs";
import { denoms } from "constants/currency";
import { ethers } from "ethers";
import handleEthError from "helpers/handleEthError";
import { useEffect, useMemo, useState } from "react";
import { Dwindow, Providers } from "services/provider/types";
import { setStage } from "services/transaction/transactionSlice";
import { StageUpdator, Step } from "services/transaction/types";
import { useGetter, useSetter } from "store/accessors";
import { DonateValues } from "../../../components/Transactors/Donater/types";
import { Wallet, WalletSetters } from "../../types";
import useEthereum from "./useEthereum";

type EthDonateArgs = {
  tx: TransactionRequest;
  donateValues: DonateValues;
};

export default function useCreateMetamaskWallet(): WalletSetters {
  const dispatch = useSetter();
  const provider = useGetter((state) => state.provider);
  const { setters, state } = useEthereum();
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    async function create() {
      const dwindow = window as Dwindow;
      const web3Provider = new ethers.providers.Web3Provider(dwindow.ethereum!);
      const network = await web3Provider.getNetwork();
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const wei_balance = await signer.getBalance();
      const eth_balance = new Dec(parseInt(wei_balance.toHexString(), 16))
        .div(1e18)
        .toNumber();
      const eth_coin = { amount: eth_balance, denom: denoms.ether };

      const wallet: Wallet = {
        icon: metamaskIcon,
        displayCoin: eth_coin,
        coins: [eth_coin],
        address,
        chainId: `${network.chainId}` as chainIDs,
        supported_denoms: [denoms.ether],

        sendTransaction: async (..._: any[]) => {
          throw new Error("Action not supported");
        },
        sendDonation: async (args: EthDonateArgs) => {
          const updateTx: StageUpdator = (update) => {
            dispatch(setStage(update));
          };

          try {
            const dwindow = window as Dwindow;
            updateTx({
              step: Step.submit,
              message: "Submitting transaction..",
            });
            let web3Provider: ethers.providers.Web3Provider;

            // TODO: move xDefi logic to separate component
            if (provider.active === Providers.ethereum) {
              web3Provider = new ethers.providers.Web3Provider(
                dwindow.ethereum!
              );
            } else {
              web3Provider = new ethers.providers.Web3Provider(
                dwindow.xfi?.ethereum!
              );
            }

            const signer = web3Provider.getSigner();
            const walletAddress = await signer.getAddress();
            const chainNum = await signer.getChainId();
            const chainId = `${chainNum}` as chainIDs;
            const response = await signer.sendTransaction(args.tx!);

            updateTx({ step: Step.submit, message: "Saving donation info.." });
            const { receiver, currency, amount, split_liq } = args.donateValues;
            if (typeof receiver !== "undefined") {
              await logDonation(
                response.hash,
                chainId,
                amount,
                currency,
                split_liq,
                walletAddress,
                receiver
              );
            }
            updateTx({
              step: Step.success,
              message: "Thank you for your donation!",
              txHash: response.hash,
              chainId,
              isReceiptEnabled: typeof receiver !== "undefined",
              isShareEnabled: true,
            });
          } catch (error) {
            console.error(error);
            handleEthError(error, updateTx);
          }
        },
      };

      setWallet(wallet);
    }

    create();
  }, [dispatch, provider.active]);

  const ret: WalletSetters = useMemo(
    () => ({
      wallet,
      isConnected: state.connected,
      isLoading: state.loading,
      connect: setters.connect,
      disconnect: setters.disconnect,
    }),
    [
      wallet,
      state.connected,
      state.loading,
      setters.connect,
      setters.disconnect,
    ]
  );

  return ret;
}
