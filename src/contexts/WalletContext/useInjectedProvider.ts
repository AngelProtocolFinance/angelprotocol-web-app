import { chains } from "constants/chains";
import { EIPMethods } from "constants/evm";
import Decimal from "decimal.js";
import { injectedProvider, isEmpty, logger } from "helpers";
import { getChain } from "helpers/tx/get-chain";
import { useEffect, useState } from "react";
import type { Chain } from "types/chain";
import type { AccountChangeHandler, ChainChangeHandler } from "types/evm";
import type {
  EVMProviderState,
  InjectedProviderID,
  Wallet,
  WalletMeta,
} from "types/wallet";
import { toPrefixedHex } from "./helpers";
import { retrieveUserAction, saveUserAction } from "./helpers";

export default function useInjectedWallet(
  providerID: InjectedProviderID,
  meta: WalletMeta,
  installURL: string
): Wallet {
  const actionKey = `${providerID}__pref`;

  const [state, setState] = useState<EVMProviderState>({
    status: "disconnected",
  });

  /** persistent connection */
  // biome-ignore lint/correctness/useExhaustiveDependencies: called only on page load
  useEffect(() => {
    const lastAction = retrieveUserAction(actionKey);
    const shouldReconnect = lastAction === "connect";
    shouldReconnect && connect(false);
    return () => {
      const provider = injectedProvider(providerID);
      if (provider && provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChange);
        provider.removeListener("chainChanged", handleChainChange);
      }
    };
  }, []);

  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setState((prev) => {
      if (prev.status !== "connected") return prev;
      return {
        ...prev,
        chainId: new Decimal(hexChainId).toString(),
        isSwitching: false,
      };
    });
  };

  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    setState((prev) => {
      if (prev.status !== "connected") return prev;
      if (isEmpty(accounts)) {
        return { status: "disconnected" };
      }

      saveUserAction(actionKey, "disconnect");
      return { ...prev, address: accounts[0] };
    });
  };

  async function switchChain(chainID: Chain.Id.Tier1) {
    if (state.status !== "connected") {
      return alert("Wallet is not connected");
    }
    try {
      const staticChain = chains[chainID];
      const chain = await getChain(chainID);
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
                  chainName: staticChain.name,
                  nativeCurrency: {
                    name: chain.nativeToken.symbol,
                    symbol: chain.nativeToken.symbol,
                    decimals: chain.nativeToken.decimals,
                  },
                  rpcUrls: [chain.nodeUrl],
                  blockExplorerUrls: [staticChain.blockExplorer],
                },
              ],
            })
        );
    } catch (err) {
      logger.error(err);
      alert("Failed to switch chain");
      setState({ ...state, isSwitching: false });
    }
  }

  async function connect(isUserInitiated = true) {
    try {
      const provider = injectedProvider(providerID);
      if (!provider) {
        if (!isUserInitiated) return; /** dont alert on persistent connection */
        return window.open(installURL, "_blank", "noopener noreferrer");
      }
      /** isMobile check not needed, just hide this wallet on mobile */

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
        chainId: `${Number.parseInt(hexChainId, 16)}`,
        request: provider.request.bind(provider),
        isSwitching: false,
      });

      saveUserAction(actionKey, "connect");
    } catch (_) {
      if (isUserInitiated) {
        alert("Failed to connect to wallet.");
      }
      setState({ status: "disconnected" });
      saveUserAction(actionKey, "disconnect");
    }
  }

  async function disconnect() {
    const provider = injectedProvider(providerID);
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
