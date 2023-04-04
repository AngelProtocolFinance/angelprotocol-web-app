import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { Web3Auth } from "@web3auth/modal";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { BaseChain } from "types/aws";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { CLIENT_ID, WEB3AUTH_LOGO, chainConfig } from "./web3AuthConfigs";

const DEFAULT_CHAIN: BaseChain = IS_TEST
  ? { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" }
  : { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" };

let web3Auth = new Web3Auth({
  clientId: CLIENT_ID,
  web3AuthNetwork: "cyan",
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["github", "google"],
    defaultLanguage: "en",
    appLogo: WEB3AUTH_LOGO, // Your App Logo Here
  },
});

// adding metamask adapter
const metamaskAdapter = new MetamaskAdapter({
  clientId: CLIENT_ID,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: "cyan",
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
});
web3Auth.configureAdapter(metamaskAdapter);

export const torusConnectorPlugin = new TorusWalletConnectorPlugin({
  torusWalletOpts: {},
  walletInitOptions: {
    whiteLabel: {
      theme: { isDark: true, colors: { primary: "#00a8ff" } },
      logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
      logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    },
    useWalletConnect: true,
  },
});
web3Auth.addPlugin(torusConnectorPlugin);

export default web3Auth;
