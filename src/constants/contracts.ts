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
  registrar:             "0xAF5aC6c9de770303b2a1E8280dB36527dD82199d",
  "index-fund":          "0xABeD6ced3B2DAe00B6Eb0d1F93eCb479A5c853D4",
  "multisig/ap":         "0xbC8543cF59ABB82265f421Fe470698E588510443",
  "multisig/review":     "0xe1E4CD8a1c0273508A114A469e82eF28efB93c44",
  accounts:              "0xAF6BD38A5cF88bd6D32C22b819507E09dED37e59",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
