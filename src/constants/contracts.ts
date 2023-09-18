import { Contract } from "types/lists";
import { NETWORK } from "./env";

type Contracts = { [key in Contract]: string };

//prettier-ignore
const mainnet:Contracts = {
  registrar:             "0xE43146c332603072F11ca0c191910F613B1D096F",
  "index-fund":          "0x61220f6977595ce33DccbcFdE68B8641Aca08F81",
  "multisig/ap":         "0x52E2657Ab33B5A540D277737374d72CfB75c8D98",
  "multisig/review":     "0x723ca90Ab7A2778F8D8bAc07c789cA989909367e",
  accounts:              "0xf3f48A60EbA732aC2993e11eC93eAD782Ab237e4",
  "gift-card":           "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:             "0x129C401C221a7C7FaD2E7102fE43a0B18651f24e",
  "index-fund":          "0x242E5B8B5dAe322A7A714D01d945d4effF53bfC3",
  "multisig/ap":         "0x2e163f5362a24635f5536d1b5feEb709C7821abd",
  "multisig/review":     "0x0fe705c721fade290c49c190f90c1968229e44Df",
  accounts:              "0x543dDFcAFAF31629b46cb8c108633cA8A11F31cc",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
