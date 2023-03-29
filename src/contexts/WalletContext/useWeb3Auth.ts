import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { BaseChain } from "types/aws";
// Plugins
// Adapters
// import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { Connection, ProviderInfo } from ".";

const SUPPORTED_CHAINS: BaseChain[] = IS_TEST
  ? [{ chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" }]
  : [{ chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" }];

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io

export default function useWeb3Auth() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId, // Get your Client ID from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x89", // Use 0x13881 for Mumbai Testnet
          },
        });
        await web3auth.initModal();
        setWeb3auth(web3auth);
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const connection: Connection = {
    logo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    name: "Web3Auth",
    connect: function (args?: any): Promise<any> {
      console.log("web3auth", web3auth);
      if (web3auth) return web3auth.connect();
      else return new Promise(() => {});
    },
  };

  const switchChain = async () => {
    if (!provider) {
      return;
    }
    await web3auth?.switchChain({ chainId: "0x5" });
  };

  const logout = async () => {
    if (!web3auth) {
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const providerInfo: ProviderInfo = {
    providerId: "web3-auth",
    logo: "",
    chainId: "0x89",
    address: "",
  };

  return {
    connection,
    disconnect: logout,
    switchChain,
    providerInfo,
    supportedChains: SUPPORTED_CHAINS,
  };
}
