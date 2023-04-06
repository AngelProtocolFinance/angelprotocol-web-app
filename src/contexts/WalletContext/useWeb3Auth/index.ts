import type { Maybe, SafeEventEmitterProvider } from "@web3auth/base";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { ProviderInfo } from "../types";
import { BaseChain } from "types/aws";
import { AccountChangeHandler, ChainChangeHandler } from "types/evm";
import { isEmpty, logger } from "helpers";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { EIPMethods } from "constants/evm";
import { WEB3AUTH_LOGO, chainConfig } from "./web3AuthConfigs";
import web3Auth from "./web3AuthSetup";

type Loading = { status: "loading" };

export type Connected = {
  status: "connected";
  address: string;
  chainId: string;
  provider: SafeEventEmitterProvider;
};

type Disconnected = { status: "disconnected" };
type WalletState = Loading | Connected | Disconnected;

const SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [{ chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" }]
  : [{ chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" }];

export default function useWeb3Auth() {
  const [state, setState] = useState<WalletState>({ status: "disconnected" });

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
      if (isEmpty(accounts)) {
        //side effects that don't modify state
        p.provider.removeListener("chainChanged", handleChainChange);
        p.provider.removeListener("accountsChanged", handleAccountsChange);
        web3Auth.logout({ cleanup: true });

        return { status: "disconnected" };
      }

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
        provider: provider,
      });
    } catch (err) {
      logger.error(err);
      setState({ status: "disconnected" });
    }
  };

  const logout = async () => {
    await web3Auth.logout({ cleanup: true });
    web3Auth.provider?.off("chainChanged", handleChainChange);
    web3Auth.provider?.off("accountsChanged", handleAccountsChange);
    setState({ status: "disconnected" });
  };

  const switchChain = async (chainId: string) => {
    if (web3Auth.status !== "connected") {
      throw new Error("Failed to switch chain");
    }
    if (chainConfig[chainId]) {
      await web3Auth.addChain(chainConfig[chainId]);
      await web3Auth.switchChain({ chainId: chainConfig[chainId].chainId });
    }
  };

  const providerInfo: ProviderInfo | undefined =
    state.status === "connected"
      ? {
          logo: WEB3AUTH_LOGO,
          providerId: "web3auth-torus",
          chainId: state.chainId,
          address: state.address,
        }
      : undefined;

  return {
    isLoading: state.status === "loading",
    connection: {
      connect: login,
      logo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      name: "Web3 Auth",
    },
    providerInfo,
    disconnect: logout,
    switchChain,
    supportedChains: SUPPORTED_CHAINS,
  };
}

function val<T>(v: Maybe<T>): v is T {
  return !!v;
}
