import { Contract } from "types/lists";
import { NETWORK } from "./env";

type Contracts = { [key in Contract]: string };

//prettier-ignore
const mainnet:Contracts = {
  registrar:             "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
  "index-fund":          "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
  "multisig/ap":         "",
  "multisig/review":     "",
  accounts:              "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",
  "gift-card":           "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:             "0xa93b02DAD1bC3Ab4177FB3F2bFCbD2d2CA27Fda9",
  "index-fund":          "0xcf0cA88b8BF985032b27aE4c7488F7A6ad90D643",
  "multisig/ap":         "0x5ffD7a356AaF24c47C230077c851ec25DcD2eaD9",
  "multisig/review":     "0x824F03DdEB9a7cd6852AA156392e358ACC79924b",
  accounts:              "0xc2bA254F7De519ef72C4f69Aa4843e89B6F8483d",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
