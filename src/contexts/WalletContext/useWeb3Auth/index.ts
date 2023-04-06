import type { Maybe, SafeEventEmitterProvider } from "@web3auth/base";
import Decimal from "decimal.js";
import { useState } from "react";
import { ProviderInfo } from "../types";
import { BaseChain } from "types/aws";
import { logger } from "helpers";
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
  ? [
      { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" },
      { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" },
    ]
  : [{ chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" }];

export default function useWeb3Auth() {
  const [state, setState] = useState<WalletState>({ status: "disconnected" });

  const login = async (isNew = false) => {
    try {
      setState({ status: "loading" });

      await web3Auth.init();
      const provider = await web3Auth.connectTo("torus-evm");

      if (!provider) {
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

      setState({
        status: "connected",
        address: accounts[0],
        chainId: new Decimal(hexChainId).toString(),
        provider,
      });
    } catch (err) {
      logger.error(err);
      setState({ status: "disconnected" });
    }
  };

  const logout = async () => {
    await web3Auth.logout({ cleanup: true });
    setState({ status: "disconnected" });
  };

  const switchChain = async (chainId: string) => {
    if (web3Auth.status !== "ready") {
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

//Maybe is T type guard
function val<T>(v: Maybe<T>): v is T {
  return !!v;
}
