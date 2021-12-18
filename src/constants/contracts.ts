import { chainIDs, sc } from "contracts/types";

type Contracts = {
  [index: string]: {
    [key in sc]: string;
  };
};

export const contracts: Contracts = {
  [chainIDs.mainnet]: {
    [sc.anchor]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
    [sc.halo_token]: "terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9",
    [sc.halo_gov]: "terra1lzdqv40fd8am5ac5tr9kvrmplqywmrgh4dslvk",
    [sc.lbp_factory]: "terra1rg723ngfpwn2yfnvmrg4jlcq0dw0al9haxch09",
    [sc.lbp_pair]: "terra1mmqdr6es5fz2hm2l6qw26vv8g0jvvu4rfdsman",
    [sc.lbp_router]: "terra1vc6wxu2adjr63df8hfc2jtfeh9nktfq59slwf5",
    [sc.lbp_lp]: "terra1udawd5mvys5xkwq8gqdq5frjkmn4feztel4m5r",
  },
  [chainIDs.testnet]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [sc.halo_token]: "terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9",
    [sc.halo_gov]: "terra19e8yx8x5m5radap4plecnl4cppa0tyupzwesx6",
    [sc.lbp_factory]: "terra167m64seqj7cucxm5wep3hyu4suqw4sl5s8uzjz",
    [sc.lbp_pair]: "terra17al3hudq2vcxtyvw9008edjhyqaw74mayva2d8",
    [sc.lbp_router]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.lbp_lp]: "terra19zgdunfrx79nqvznqmx4satj5kxndvmrsx502m",
  },
  [chainIDs.localterra]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "",
    [sc.registrar]: "",
    [sc.halo_token]: "",
    [sc.halo_gov]: "",
    [sc.lbp_factory]: "",
    [sc.lbp_pair]: "",
    [sc.lbp_router]: "",
    [sc.lbp_lp]: "",
  },
};
// export const ap_wallets: { [index: string]: { [index: string]: string } } = {
//   [denoms.ether]: {
//     [chainIDs.eth_kovan]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
//     [chainIDs.eth_ropsten]: "0xcDA0D6adCD0f1CCeA6795F9b1F23a27ae643FE7C", //ropsten faucet
//   },
//   [denoms.btc]: {
//     [chainIDs.btc_test]: "tb1qp6r3j2xr07f0qs2dvxx9xy4hk98c8f5r4l7xva",
//   },
//   [denoms.uusd]: {
//     [chainIDs.testnet]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
//     [chainIDs.mainnet]: "terra1y07m37w0g8nwclthv5wn3vwuf985cz0z6v9n6w", //replace with ap_wallet
//   },
//   [denoms.sol]: {
//     [chainIDs.sol_dev]: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
//   },
//   [denoms.uatom]: {
//     [chainIDs.cosmos_4]: "cosmos1epw9e02r3cdgem0c74847v2fm529rxatsm2v3x", //replace with ap_wallet
//   },
// };
