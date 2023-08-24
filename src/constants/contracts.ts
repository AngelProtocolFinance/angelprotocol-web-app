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
  registrar:             "0xF4A06771BFCADf6B750e92281E19e8d50455763a",
  "index-fund":          "0xcECd3FB781F3188A6A68536D65364E5259ac8BcC",
  "multisig/ap":         "0x9fb2Fe98029D760167E74115B09bab97124EbC7E",
  "multisig/review":     "0x9f4F6436E351Fc04731ac522Ab90C5C1a3a8FDF4",
  accounts:              "0xf04B21CAF20A131588a3B577BB7AD6c8b37b4326",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
