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
  registrar:             "0x5602bAF3002df39FbAA568C0657bBBBB8e84527a",
  "index-fund":          "0x486b1C056AC365dD969056C717ab8E7AEd59a178",
  "multisig/ap":         "0xD3d0B4fFF90c36e1a31d478e35d699f432428Ae5",
  "multisig/review":     "0xB2BD05A652973f567aD6472b9FEa29FE293f6cD9",
  accounts:              "0x6d8778e0C742e0f0c31d85d271089C0668a95738",
  "locked-withdraw":     "0x84efD60753f006DE6878C7139675b110Da654459",
  "charity-application": "0xbF6b148a440acAb936796ad40947C0C33C78639A",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
