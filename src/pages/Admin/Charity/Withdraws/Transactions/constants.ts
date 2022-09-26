import { RouterId } from "types/aws";

export const explorerUrls: { [key in RouterId]: string } = {
  //use only mainnet explorers, txs on testnet takes forever to be in block explorer
  axelar: "https://axelarscan.io/tx",
  connext: "https://connextscan.io/tx",
};
