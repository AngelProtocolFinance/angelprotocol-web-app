/**
 * put all aws/apes definitions here, if big category exist, separate in a file
 */

export type Token = {
  approved: boolean; // true
  balance: number; // 0 --> not returned by APES but dynamically calculated and set
  decimals: number; // 6
  logo: string; // "https://cryptologos.cc/sample/only/lunax.png"
  name: string; // "Stader LunaX Token"
  symbol: string; // DB Partition key ex., "LunaX"
  token_id: string; // "ujuno" | "0xaSD123..." | "ibc/ASH3438hfd..."
  type:
    | "juno-native"
    | "terra-native"
    | "evm-native"
    | "erc20"
    | "cw20"
    | "ibc"
    | "placeholder";
};

export type NetworkType = "mainnet" | "testnet";

export type Chain = {
  block_explorer_url: string; // https://testnet.snowtrace.io
  chain_id: string;
  lcd_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  chain_name: string; // Avalanche Fuji Testnet
  native_currency: Token;
  network_type: NetworkType;
  rpc_url: string; // https://api.avax-test.network/ext/bc/C/rpc
  tokens: Token[];
  type: "juno-native" | "terra-native" | "evm-native" | "placeholder"; // | "sol" | "btc" | ...
};
