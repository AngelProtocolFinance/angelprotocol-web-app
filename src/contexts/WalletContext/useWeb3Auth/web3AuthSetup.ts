import { Web3AuthNoModal } from "@web3auth/no-modal";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";
import { chainIDs } from "constant/chains";
import { IS_TEST, WEB3AUTH_CLIENT_ID } from "constant/env";
import { BaseChain } from "types/aws";
import { chainConfig } from "./web3AuthConfigs";

const DEFAULT_CHAIN: BaseChain = IS_TEST
  ? { chain_id: chainIDs.polygonTest, chain_name: "Polygon Testnet" }
  : { chain_id: chainIDs.polygonMain, chain_name: "Polygon Mainnet" };

const web3Auth = new Web3AuthNoModal({
  clientId: WEB3AUTH_CLIENT_ID,
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
});

const torusWalletAdapter = new TorusWalletAdapter({
  chainConfig: chainConfig[DEFAULT_CHAIN.chain_id],
});
web3Auth.configureAdapter(torusWalletAdapter);

export default web3Auth;
