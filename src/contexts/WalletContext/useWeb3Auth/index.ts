import type { Maybe } from "@web3auth/base";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import {
  AccountChangeHandler,
  ChainChangeHandler,
  RequestArguments,
} from "types/evm";
import { EVMProviderState, Wallet, WalletMeta } from "types/wallet";
import { logger } from "helpers";
import { EIPMethods } from "constants/evm";
import { chainConfig } from "./web3AuthConfigs";
import web3Auth from "./web3AuthSetup";

export default function useWeb3Auth(): Wallet {
  const [state, setState] = useState<EVMProviderState>({
    status: "disconnected",
  });

  // //// EVENT HANDLERS ////
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
  };

  // //// PERSISTENT CONNECTION ////
  useEffect(() => {
    const adapter = web3Auth.cachedAdapter;
    if (adapter) login(false);
    //eslint-disable-next-line
  }, []);

  // //// USER INITIATED CONNECTION ////
  const login = async (isUserInitiated = true) => {
    try {
      setState({ status: "loading" });

      //there's always a need to initialize Web3Auth
      await web3Auth.init();

      const provider = isUserInitiated
        ? await web3Auth.connectTo("torus-evm")
        : web3Auth.provider;

      if (!provider) {
        // don't throw error on persistent connection
        if (isUserInitiated) return;
        return alert("Failed to connect to wallet");
      }

      const accounts = await provider.request<any, string[]>({
        method: EIPMethods.eth_requestAccounts,
      });
      const hexChainId = await provider.request<any, string>({
        method: EIPMethods.eth_chainId,
      });

      if (!(val(accounts) && val(hexChainId))) {
        if (isUserInitiated) return;
        return alert("Failed to connect to wallet");
      }

      provider.on("chainChanged", handleChainChange);
      provider.on("accountsChanged", handleAccountsChange);

      setState({
        id: "web3auth-torus",
        status: "connected",
        address: accounts[0],
        chainId: new Decimal(hexChainId).toString(),
        request<T>({ method, params }: RequestArguments) {
          return provider.request({ params, method }) as Promise<T>;
        },
      });
    } catch (err) {
      setState({ status: "disconnected" });
      //let caller of login() handle error
      if (isUserInitiated) throw err;
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
    name: "Web3 Auth",
    logo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
  };

  return {
    ...state,
    ...meta,
    ...{ connect: login, disconnect: logout, switchChain },
  };
}

function val<T>(v: Maybe<T>): v is T {
  return !!v;
}
