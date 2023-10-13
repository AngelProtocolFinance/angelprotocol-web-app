import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { Connected, ProviderState, Wallet, WalletMeta } from "./types";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  InjectedProvider,
} from "types/evm";
import { getProvider, logger } from "helpers";
import { chains } from "constants/chains-v2";
import { EIPMethods } from "constants/evm";
import { toPrefixedHex } from "./helpers";
import { retrieveUserAction, saveUserAction } from "./helpers";
import { isXdefiPrioritized } from "./helpers/isXdefiPrioritized";

export default function useInjectedWallet(
  meta: Omit<WalletMeta, "type"> & { installUrl: string }
): Wallet {
  const { id } = meta;
  const actionKey = `${id}__pref`;

  const [state, setState] = useState<ProviderState>({
    status: "disconnected",
  });

  /** persistent connection */
  useEffect(() => {
    const lastAction = retrieveUserAction(actionKey);
    const shouldReconnect = lastAction === "connect";
    shouldReconnect && connect(false);
    return () => {
      getProvider(id).then((provider) => {
        if (provider && provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChange);
          provider.removeListener("chainChanged", handleChainChange);
        }
      });
    };
    //eslint-disable-next-line
  }, []);

  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setState((prev) => {
      if (prev.status === "connected") {
        return {
          ...prev,
          chainId: new Decimal(hexChainId).toString(),
        };
      }
      return prev;
    });
  };

  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    setState((prev) => {
      if (prev.status === "connected") {
        if (accounts.length > 0) {
          return {
            ...prev,
            address: accounts[0],
          };
        } else {
          saveUserAction(actionKey, "disconnect");
          return { status: "disconnected", connect };
        }
      }
      return prev;
    });
  };

  async function switchChain(chainId: string) {
    try {
      setState((p) => ({ ...(p as Connected), isSwitchingChain: true }));
      const provider = (await getProvider(id)) as InjectedProvider; //can't switch when wallet is not connected
      const chain = chains[chainId];
      await provider
        .request({
          method: EIPMethods.wallet_switchEthereumChain,
          params: [{ chainId: toPrefixedHex(chainId) }],
        })
        .catch(
          async () =>
            await provider.request({
              method: EIPMethods.wallet_addEthereumChain,
              params: [
                {
                  chainId: toPrefixedHex(chainId),
                  chainName: chain.name,
                  nativeCurrency: {
                    name: chain.nativeToken.symbol,
                    symbol: chain.nativeToken.symbol,
                    decimals: chain.nativeToken.decimals,
                  },
                  rpcUrls: [chain.rpc],
                  blockExplorerUrls: [chain.txExplorer],
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

  async function connect(isNew /** new connection */ = true) {
    try {
      const provider = await getProvider(id);
      if (!provider) {
        if (!isNew) return; /** dont alert on persistent connection */
        return window.open(meta.installUrl, "_blank", "noopener noreferrer");
      }
      /** isMobile check not needed, just hide this wallet on mobile */

      /** xdefi checks */
      if (id === "xdefi-evm" && !isXdefiPrioritized()) {
        if (!isNew) return;
        return alert("Kindly prioritize Xdefi and reload the page");
      } else if (id !== "xdefi-evm" && isXdefiPrioritized()) {
        if (!isNew) return;
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
        status: "connected",
        address: accounts[0],
        chainId: `${parseInt(hexChainId, 16)}`,
        isSwitchingChain: false,
      });

      saveUserAction(actionKey, "connect");
    } catch (err) {
      if (isNew) {
        alert("Failed to connect to wallet.");
      }
      setState({ status: "disconnected" });
      saveUserAction(actionKey, "disconnect");
    }
  }

  async function disconnect() {
    const provider = await getProvider(id);
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
    type: "evm",
    ...{ connect, disconnect, switchChain },
  };
}
