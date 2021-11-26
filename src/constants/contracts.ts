import { chains, sc } from "contracts/types";
import { denoms } from "./currency";

export const contracts: { [index: string]: { [key in sc]: string } } = {
  [chains.mainnet]: {
    [sc.anchor]: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
    [sc.halo_token]: "terra1lxlqekpkwjhacljgcfjm7vxul50wqas6yvuc27",
    [sc.halo_stake]: "",
  },
  [chains.testnet]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [sc.halo_token]: "terra1lxlqekpkwjhacljgcfjm7vxul50wqas6yvuc27",
    [sc.halo_stake]: "terra1ve9jpy2pumfg33ky8gl7l6l3e7h8ppuwajkx0k",
  },
  [chains.localterra]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
    [sc.halo_token]: "terra1tc2yp07pce93uwnneqr0cptqze6lvke9edal3l",
    [sc.halo_stake]: "terra1ve9jpy2pumfg33ky8gl7l6l3e7h8ppuwajkx0k",
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
    [chains.cosmos_4]: "terra1epw9e02r3cdgem0c74847v2fm529rxatklsvnx", //replace with ap_wallet
  },
};
