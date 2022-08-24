import { Chain } from "types/server/aws";
import { Wallet } from "contexts/WalletContext";

export const PLACEHOLDER_WALLET: Wallet = {
  logo: "",
  address: "juno1qsn67fzym4hak4aly07wvcjxyzcld0n4s726r2fs9km2tlahlc5qg2drvn",
  chainId: "",
  id: "keplr",
};

export const PLACEHOLDER_CHAIN: Chain = {
  block_explorer_url: "https://www.placeholder.io/token/txs/",
  chain_id: "placeholder",
  chain_name: "Token",
  native_currency: {
    type: "placeholder",
    symbol: "NATIVE",
    logo: "",
    decimals: 18,
    balance: 0,
    approved: true,
    name: "Native",
    token_id: "unative",
  },
  network_type: "testnet",
  rpc_url: "https://rpc-token.placeholder.com",
  lcd_url: "https://lcd-token.placeholder.com",
  tokens: [
    {
      type: "placeholder",
      symbol: "TOKEN",
      logo: "",
      decimals: 18,
      balance: 0,
      approved: true,
      name: "Token",
      token_id: "utoken",
    },
  ],
  type: "placeholder",
};
