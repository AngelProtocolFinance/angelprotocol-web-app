import {
  SigningStargateClient,
  coin as create_coin,
  StdFee,
} from "@cosmjs/stargate";
import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useFormContext } from "react-hook-form";
import { Values as Data, Values } from "components/Donater/types";
import { useSetModal } from "components/Nodal/Nodal";
import ErrPop, { Props as ErrProps } from "./ErrPop";
import Result, { Props as ResProps } from "./Result";
import Waiter, { Props as WaitProps } from "./Waiter";
import getDepositAmount from "./getDepositAmount";
import displayTerraError from "./displayTerraError";
import useUSTEstimator from "./useUSTEstimator";
import Contract from "contracts/Contract";
import { useGetKeplr } from "wallets/Keplr";
import { chains } from "contracts/types";
import { terra_mainnet_rpc } from "wallets/info_terra_mainnet";
import { denoms } from "constants/currency";
import { useGetter } from "store/accessors";
import { Wallets } from "services/wallet/types";
import { ap_wallets } from "constants/contracts";
import displayKeplrError from "./diplayKeplrError";

function useUSTSender() {
  const active_wallet = useGetter((state) => state.wallet.activeWallet);
  const { reset } = useFormContext<Values>();
  const { provider } = useGetKeplr();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();
  const tx = useUSTEstimator();

  async function terra_sender(data: Data) {
    const UST_amount = data.amount;
    // const liquid_split = 100 - Number(data.split);

    try {
      if (!wallet) {
        showModal<ErrProps>(ErrPop, {
          desc: "No Terra wallet is currently connected",
        });
        return;
      }

      const response = await wallet.post(tx!);

      if (response.success) {
        showModal<WaitProps>(Waiter, {
          desc: "Waiting for transaction result",
          url: `https://finder.terra.money/${wallet.network.chainID}/tx/${response.result.txhash}`,
        });

        const contract = new Contract(wallet);
        const getTxInfo = contract.pollTxInfo(response.result.txhash, 7, 1000);
        const txInfo = await getTxInfo;

        if (!txInfo.code) {
          const depositAmount = getDepositAmount(
            txInfo.logs!,
            wallet.network.chainID
          );
          showModal<ResProps>(Result, {
            sent: +UST_amount,
            received: depositAmount,
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

  async function keplr_sender(data: Values) {
    try {
      if (!provider) {
        showModal<ErrProps>(ErrPop, {
          desc: "UST wallet is not connected.",
        });
        return;
      }

      provider.defaultOptions = {
        sign: { preferNoSetFee: true },
      };

      const offline_signer = provider.getOfflineSigner!(chains.mainnet);
      const accounts = await offline_signer.getAccounts();
      const address = accounts[0].address;

      const client = await SigningStargateClient.connectWithSigner(
        terra_mainnet_rpc,
        offline_signer
      );

      //this fee will be overriden by wallet
      //but can opt to override wallet config once fee estimation is clear
      //balance check will also be done by the wallet
      const gas_limit = "80000";
      const fee: StdFee = {
        //0.25utoken is recommended but num input here is required to be whole number
        amount: [create_coin(1, denoms.uusd)],
        gas: gas_limit,
      };

      const dec_amount = new Dec(data.amount).mul(1e6);

      showModal<WaitProps>(Waiter, {
        desc: "Processing transaction...",
      });

      const res = await client.sendTokens(
        address,
        ap_wallets[denoms.uusd][chains.mainnet],
        [create_coin(dec_amount.toNumber(), denoms.uusd)],
        fee
      );

      if ("code" in res) {
        if (res.code !== 0) {
          showModal<ErrProps>(ErrPop, {
            desc: "Transaction failed",
            url: `https://finder.terra.money/${chains.mainnet}/tx/${res.transactionHash}`,
          });
          return;
        }
      }

      showModal<ResProps>(Result, {
        sent: +data.amount,
        received: +data.amount,
        url: `https://finder.terra.money/${chains.mainnet}/tx/${res.transactionHash}`,
        precision: 3,
        denom: denoms.uusd,
      });
    } catch (err) {
      displayKeplrError(err, showModal);
    }
  }

  //choose sender depending on active wallet
  return active_wallet === Wallets.keplr ? keplr_sender : terra_sender;
}

export default useUSTSender;
