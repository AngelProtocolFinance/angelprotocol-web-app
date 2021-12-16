import { chains, sc } from "contracts/types";
import { denoms } from "./currency";

export const contracts: { [index: string]: { [key in sc]: string } } = {
  [chains.mainnet]: {
    [sc.anchor]: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
    [sc.halo_token]: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",
    [sc.halo_gov]: "",
    [sc.lbp_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.lbp_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.lbp_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.lbp_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",
  },
  [chains.testnet]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [sc.halo_token]: "terra1aw8704nry2gaemjur65j3ervpxtvt0s2lj2jw9",
    [sc.halo_gov]: "terra1t0ughmzr4u4r09lsj7z97q56fpde8qqmrxg2df",
    [sc.lbp_factory]: "terra1rg723ngfpwn2yfnvmrg4jlcq0dw0al9haxch09",
    [sc.lbp_router]: "terra1vc6wxu2adjr63df8hfc2jtfeh9nktfq59slwf5",
    [sc.lbp_pair]: "terra1mmqdr6es5fz2hm2l6qw26vv8g0jvvu4rfdsman",
    [sc.lbp_lp]: "terra1udawd5mvys5xkwq8gqdq5frjkmn4feztel4m5r",
  },
  [chains.localterra]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra138y2ppmkgq78wfp5mwj9jqu96vylgs3dpdn5ux",
    [sc.registrar]: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
    [sc.halo_token]: "terra13jt99f7rflk07tv6av73rlcwz99lqwe042kjwk",
    [sc.halo_gov]: "",
    [sc.lbp_factory]: "terra1ezct0gjr4yue6a6cdeejxtjk2e9exa4nqkj7dg",
    [sc.lbp_router]: "terra1fjn7zyj0frj92arrfe4h960u7nfrewl9v345m4",
    [sc.lbp_pair]: "terra1whsvq9m56tr945xcnjd527p3wpm00m6s4lschd",
    [sc.lbp_lp]: "terra1w4ggptckkucguqav6c47qt4mq9ezz9ea23xzam",
  },
};
export const ap_wallets: { [index: string]: { [index: string]: string } } = {
  [denoms.ether]: {
    [chains.eth_kovan]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
    [chains.eth_ropsten]: "0xcDA0D6adCD0f1CCeA6795F9b1F23a27ae643FE7C", //ropsten faucet
  },
  [denoms.btc]: {
    [chains.btc_test]: "tb1qp6r3j2xr07f0qs2dvxx9xy4hk98c8f5r4l7xva",
  },
  [denoms.uusd]: {
    [chains.testnet]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
    [chains.mainnet]: "terra1y07m37w0g8nwclthv5wn3vwuf985cz0z6v9n6w", //replace with ap_wallet
  },
  [denoms.sol]: {
    [chains.sol_dev]: "CkiKLEa9eSEoG6CoTSuaahsF2WqNgArnvoCSbNZjJ7BQ",
  },
  [denoms.uatom]: {
    [chains.cosmos_4]: "cosmos1epw9e02r3cdgem0c74847v2fm529rxatsm2v3x", //replace with ap_wallet
  },
};
