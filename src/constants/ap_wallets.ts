import { chainIDs } from "constants/chainIDs";
import { denoms } from "./currency";

type Wallets = {
  [index: string]: {
    [index: string]: string;
  };
};

export const ap_wallets: Wallets = {
  [denoms.ether]: {
    [chainIDs.eth_kovan]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
    [chainIDs.eth_ropsten]: "0xcDA0D6adCD0f1CCeA6795F9b1F23a27ae643FE7C", //ropsten faucet
  },
  [denoms.btc]: {
    [chainIDs.btc_test]: "tb1qp6r3j2xr07f0qs2dvxx9xy4hk98c8f5r4l7xva",
  },
  [denoms.uusd]: {
    [chainIDs.testnet]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
    [chainIDs.mainnet]: "terra1y07m37w0g8nwclthv5wn3vwuf985cz0z6v9n6w", //replace with ap_wallet
  },
  [denoms.sol]: {
    [chainIDs.sol_dev]: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
  },
  [denoms.uatom]: {
    [chainIDs.cosmos_4]: "cosmos1epw9e02r3cdgem0c74847v2fm529rxatsm2v3x", //replace with ap_wallet
  },
};
