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
  "locked-withdraw":     "",
  "charity-application": "",
  "gift-card":           "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:             "0xf9ae9FEb01B382C87d391F04a021fae312264CA7",
  "index-fund":          "0xba4A7987e34BFDCb1D10e1318934dBce1024bDC8",
  "multisig/ap":         "0xC26Ac43b14ebCbff5029792052aF3e4DF3233902",
  "multisig/review":     "0x1edC050B5d84cbB0cA0b56356f3F7307efcd50Fb",
  accounts:              "0xf725Ff6235D53dA06Acb4a70AA33206a1447D550",
  "locked-withdraw":     "0x2d618cDa8cbd2FFc742DD9E8BBEa774B30d06665",
  "charity-application": "0x14A7bb3A01D9011D39FC0ECb5d09C84f7F596e4B",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
