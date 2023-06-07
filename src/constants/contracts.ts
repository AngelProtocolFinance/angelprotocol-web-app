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
  "charity-application": "",
  "gift-card":           "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:             "0x74f62eE5330EE95B72c6CDFA301Be106bDe5D454",
  "index-fund":          "0xE036D1034640fa16280682fd8CC00Ccf3D42e8E4",
  "multisig/ap":         "0xD812901336D4f1c910a2Ac51921E0105BD980887",
  "multisig/review":     "0xaDC97799AAC1430e297edb86136579710B081e0A",
  accounts:              "0xFCbE277d74027455A92fA67253FA16385F0579F4",
  "charity-application": "0xbF6b148a440acAb936796ad40947C0C33C78639A",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
