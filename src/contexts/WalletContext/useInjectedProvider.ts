import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { ChainID } from "types/chain";
import { AccountChangeHandler, ChainChangeHandler } from "types/evm";
import {
  Connected,
  InjectedProviderID,
  ProviderState,
  Wallet,
  WalletMeta,
} from "types/wallet";
import { injectedProvider, logger } from "helpers";
import { chains } from "constants/chains-v2";
import { EIPMethods } from "constants/evm";
import { toPrefixedHex } from "./helpers";
import { retrieveUserAction, saveUserAction } from "./helpers";
import { isXdefiPrioritized } from "./helpers/isXdefiPrioritized";

export default function useInjectedWallet(
  providerID: InjectedProviderID,
  meta: WalletMeta,
  installURL: string
): Wallet {
  const actionKey = `${providerID}__pref`;

  const [state, setState] = useState<ProviderState>({
    status: "disconnected",
  });

  /** persistent connection */
  useEffect(() => {
    const lastAction = retrieveUserAction(actionKey);
    const shouldReconnect = lastAction === "connect";
    shouldReconnect && connect(false);
    return () => {
      injectedProvider(providerID).then((provider) => {
        if (provider && provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChange);
          provider.removeListener("chainChanged", handleChainChange);
        }
      });
    };
    //eslint-disable-next-line
  }, []);

  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    if (state.status !== "connected") return;
    setState({ ...state, chainId: new Decimal(hexChainId).toString() });
  };

  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    if (state.status !== "connected") return;
    if (accounts.length === 0) {
      return setState({ status: "disconnected" });
    }
    setState({ ...state, address: accounts[0] });
    saveUserAction(actionKey, "disconnect");
  };

  async function switchChain(chainID: ChainID) {
    try {
      if (state.status !== "connected") {
        return alert("Wallet is not connected");
      }
      const chain = chains[chainID];
      await state
        .request({
          method: EIPMethods.wallet_switchEthereumChain,
          params: [{ chainId: toPrefixedHex(chainID) }],
        })
        .catch(
          async () =>
            await state.request({
              method: EIPMethods.wallet_addEthereumChain,
              params: [
                {
                  chainId: toPrefixedHex(chainID),
                  chainName: chain.name,
                  nativeCurrency: {
                    name: chain.nativeToken.symbol,
                    symbol: chain.nativeToken.symbol,
                    decimals: chain.nativeToken.decimals,
                  },
                  rpcUrls: [chain.rpc],
                  blockExplorerUrls: [chain.blockExplorer],
                },
              ],
            })
        );
    } catch (err) {
      logger.error(err);
      alert("Failed to switch chain");
    } finally {
      setState((p) => ({ ...(p as Connected), isSwitchingChain: true }));
    }
  }

  async function connect(isUserInitiated = true) {
    try {
      const provider = await injectedProvider(providerID);
      if (!provider) {
        if (!isUserInitiated) return; /** dont alert on persistent connection */
        return window.open(installURL, "_blank", "noopener noreferrer");
      }
      /** isMobile check not needed, just hide this wallet on mobile */

      /** xdefi checks */
      if (providerID === "xdefi-evm" && !isXdefiPrioritized()) {
        if (!isUserInitiated) return;
        return alert("Kindly prioritize Xdefi and reload the page");
      } else if (providerID !== "xdefi-evm" && isXdefiPrioritized()) {
        if (!isUserInitiated) return;
        return alert("Kindly remove priority to Xdefi and reload the page");
      }

      setState({ status: "loading" });
      /** request access */
      const accounts = await provider.request<string[]>({
        method: EIPMethods.eth_requestAccounts,
      });
      const hexChainId = await provider.request<string>({
        method: EIPMethods.eth_chainId,
      });

      /** attach listeners */
      provider.on("accountsChanged", handleAccountsChange);
      provider.on("chainChanged", handleChainChange);

      setState({
        id: providerID,
        status: "connected",
        address: accounts[0],
        chainId: `${parseInt(hexChainId, 16)}`,
        request: provider.request.bind(provider),
      });

      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isUserInitiated) {
        alert("Failed to connect to wallet.");
      }
      setState({ status: "disconnected" });
      saveUserAction(actionKey, "disconnect");
    }
  }

  async function disconnect() {
    const provider = await injectedProvider(providerID);
    if (provider) {
      setState({ status: "disconnected" });
      saveUserAction(actionKey, "disconnect");

      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChange);
        provider.removeListener("chainChanged", handleChainChange);
      } else {
        /** if provider doesn't support removeListener, just reload to remove listeners*/
        window.location.reload();
      }
    }
  }

  return {
    ...state,
    ...meta,
    ...{ connect, disconnect, switchChain },
  };
}
