import { chains, sc } from "contracts/types";
import { denoms } from "./currency";

export const contracts: { [index: string]: { [key in sc]: string } } = {
  [chains.mainnet]: {
    [sc.anchor]: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",
  },
  [chains.testnet]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
  },
  [chains.localterra]: {
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",
  },
};

export const ap_wallets: { [index: string]: { [index: string]: string } } = {
  [denoms.ether]: {
    [chains.kovan]: "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c",
  },
  [denoms.btc]: {
    [chains.btc_test]: "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq",
  },
  [denoms.uusd]: {
    [chains.testnet]: "terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx",
  },
};
