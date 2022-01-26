export enum chainIDs {
  testnet = "bombay-12",
  mainnet = "columbus-5",
  localterra = "localterra",
  eth_rinkeby = "4",
  eth_kovan = "42",
  eth_ropsten = "3",
  eth_main = "1",
  btc_test = "1",
  sol_dev = "devnet",
  sol_main = "mainnet-beta",
  sol_test = "testnet",
  cosmos_3 = "cosmoshub-3",
  cosmos_4 = "cosmoshub-4",
  cosmos_test = "cosmoshub-testnet",
}

export const ethChainNames: { [index: number]: string } = {
  [chainIDs.eth_main]: "mainnet",
  [chainIDs.eth_ropsten]: "testnet",
  [chainIDs.eth_kovan]: "testnet",
  [chainIDs.eth_rinkeby]: "testnet",
};
