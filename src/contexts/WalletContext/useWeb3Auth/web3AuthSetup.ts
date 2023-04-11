import { Web3AuthNoModal } from "@web3auth/no-modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import { BaseChain } from "types/aws";
import { chainIDs } from "constants/chains";
import { IS_TEST } from "constants/env";
import { CLIENT_ID, chainConfig } from "./web3AuthConfigs";

const DEFAULT_CHAIN: BaseChain = IS_TEST
  ? { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" }
  : { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" };

const web3Auth = new Web3AuthNoModal({
  clientId: CLIENT_ID,
  web3AuthNetwork: "cyan",
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
});

const torusWalletAdapter = new TorusWalletAdapter({
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
});
web3Auth.configureAdapter(torusWalletAdapter);

export default web3Auth;
