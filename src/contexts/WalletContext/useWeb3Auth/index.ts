import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { useEffect, useState } from "react";
import { ProviderInfo } from "../types";
import { BaseChain } from "types/aws";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { saveUserAction } from "../helpers";
import { WEB3AUTH_LOGO, chainConfig } from "./web3AuthConfigs";
import web3Auth, { torusConnectorPlugin } from "./web3AuthSetup";
import RPC from "./web3RPC";

const SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [
      { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" },
      { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" },
    ]
  : [{ chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" }];

export default function useWeb3Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [providerInfo, setProviderInfo] = useState<ProviderInfo>();
  const [chainId, setChainId] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const init = async () => {
    // let web3Auth: Web3Auth | null = null;
    try {
      await web3Auth.initModal();
      web3Auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
        console.log("LOGIN_MODAL_EVENTS.MODAL_VISIBILITY", isVisible);
        setIsLoading(isVisible);
      });
      setWeb3auth(web3Auth);
      setProvider(
        (torusConnectorPlugin?.proxyProvider as SafeEventEmitterProvider) ||
          web3Auth?.provider
      );
    } catch (error) {
      console.error(error);
    } finally {
      return web3Auth;
    }
  };

  useEffect(() => {
    const setupProviderInfo = async () => {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const chainId = await rpc.getChainId();
      const address = await rpc.getAccounts();
      setProviderInfo({
        providerId: "web3auth-metamask",
        logo: WEB3AUTH_LOGO,
        chainId,
        address,
      });
    };
    if (provider) setupProviderInfo();
  }, [provider, chainId]);

  const login = async () => {
    setIsLoading(true);
    const web3Auth = await init();
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connect();
    setProvider(web3authProvider);
    setIsLoading(false);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3auth.logout();
    } catch (e) {
      console.log(e);
    }

    web3auth.clearCache();
    saveUserAction("metamask__pref", "disconnect");
    setProviderInfo(undefined);
  };

  const switchChain = async (chainId: string) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    if (chainConfig[chainId]) {
      await web3auth?.addChain(chainConfig[chainId]);
      await web3auth?.switchChain({ chainId: chainConfig[chainId].chainId });
    }
    setChainId(chainId);
  };

  return {
    isLoading,
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
