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
  registrar:             "0x3a6401423dd7D145b3EdF3b21f77caC180866BF9",
  "index-fund":          "0x46F9E60BacBa503e406A099aF30c16a8062BFeBA",
  "multisig/ap":         "0xB8A37752b3Ed29A3F984127e4b9eF8514E9be371",
  "multisig/review":     "0x98aD858917410Eb4E0f7E617Ce385B57B4142c88",
  accounts:              "0x7602AB005DEe896A0ecac7B87C6D09f8609348d4",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
