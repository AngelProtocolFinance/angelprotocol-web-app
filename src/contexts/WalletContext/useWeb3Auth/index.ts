import type { Maybe } from "@web3auth/base";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { AccountChangeHandler, ChainChangeHandler } from "types/evm";
import { ProviderState, Wallet, WalletMeta } from "types/wallet";
import { getProvider, isEmpty, logger } from "helpers";
import { EIPMethods } from "constants/evm";
import { WEB3AUTH_LOGO, chainConfig } from "./web3AuthConfigs";
import web3Auth from "./web3AuthSetup";

export default function useWeb3Auth(): Wallet {
  const [state, setState] = useState<ProviderState>({ status: "disconnected" });

  // //// EVENT HANDLERS ////
  const handleChainChange: ChainChangeHandler = (hexChainId) => {
    setState((p) =>
      p.status === "connected"
        ? { ...p, chainId: new Decimal(hexChainId).toString() }
        : p
    );
  };
  const handleAccountsChange: AccountChangeHandler = (accounts) => {
    setState((p) => {
      if (p.status !== "connected") return p;
      getProvider("web3auth-torus").then((provider) => {
        if (provider && isEmpty(accounts)) {
          provider.removeListener?.("chainChanged", handleChainChange);
          provider.removeListener?.("accountsChanged", handleAccountsChange);
          web3Auth.logout({ cleanup: true });

          return { status: "disconnected" };
        }
      });
      return { ...p, address: accounts[0] };
    });
  };

  // //// PERSISTENT CONNECTION ////
  useEffect(() => {
    const adapter = web3Auth.cachedAdapter;
    if (adapter) login(false);
    //eslint-disable-next-line
  }, []);

  // //// USER INITIATED CONNECTION ////
  const login = async (isNew = true) => {
    try {
      setState({ status: "loading" });

      //there's always a need to initialize Web3Auth
      await web3Auth.init();

      const provider = isNew
        ? await web3Auth.connectTo("torus-evm")
        : web3Auth.provider;

      if (!provider) {
        // don't throw error on persistent connection
        if (isNew) return;
        throw new Error("Failed to connect to wallet");
      }

      const accounts = await provider.request<string[]>({
        method: EIPMethods.eth_requestAccounts,
      });
      const hexChainId = await provider.request<string>({
        method: EIPMethods.eth_chainId,
      });

      if (!(val(accounts) && val(hexChainId))) {
        if (isNew) return;
        throw new Error("Failed to connect to wallet");
      }

      provider.on("chainChanged", handleChainChange);
      provider.on("accountsChanged", handleAccountsChange);

      setState({
        status: "connected",
        address: accounts[0],
        chainId: new Decimal(hexChainId).toString(),
        isSwitchingChain: false,
      });
    } catch (err) {
      setState({ status: "disconnected" });
      //let caller of login() handle error
      if (isNew) throw err;
      //log for persistent connection
      logger.error(err);
    }
  };

  const logout = async () => {
    try {
      await web3Auth.logout({ cleanup: true });
      web3Auth.provider?.off("chainChanged", handleChainChange);
      web3Auth.provider?.off("accountsChanged", handleAccountsChange);
      setState({ status: "disconnected" });
    } catch (err) {
      throw new Error("Failed to disconnect from wallet");
    }
  };

  const switchChain = async (chainId: string) => {
    if (web3Auth.status !== "connected") {
      throw new Error("Failed to switch chain");
    }
    if (chainConfig[chainId]) {
      setState((p) => ({ ...p, isSwitchingChain: true }));
      await web3Auth.addChain(chainConfig[chainId]);
      await web3Auth.switchChain({ chainId: chainConfig[chainId].chainId });
      setState((p) => ({ ...p, isSwitchingChain: false }));
    }
  };

  const meta: WalletMeta = {
    type: "evm",
    id: "web3auth-torus",
    name: "Web3 Auth",
    logo: WEB3AUTH_LOGO,
  };

  return {
    ...state,
    ...meta,
    ...{ connect: login, disconnect: logout, switchChain: null },
  };
}

function val<T>(v: Maybe<T>): v is T {
  return !!v;
}
