import { Web3AuthNoModal } from "@web3auth/no-modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import { WEB3AUTH_CLIENT_ID } from "constants/env";
import { chainConfig } from "./web3AuthConfigs";

const web3Auth = new Web3AuthNoModal({
  clientId: WEB3AUTH_CLIENT_ID,
  chainConfig: chainConfig[""],
});

const torusWalletAdapter = new TorusWalletAdapter({
  chainConfig: chainConfig[""],
});
web3Auth.configureAdapter(torusWalletAdapter);

export default web3Auth;
