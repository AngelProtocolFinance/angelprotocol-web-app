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
  registrar:             "0xe1215B3e150dd298d787D41a4879959D30Dc3939",
  "index-fund":          "0xf6B32b4a0371050321fC01672FDfad76aF55603f",
  "multisig/ap":         "0xeA2B4CD932f5Cecea867D8794206c5D51A13a516",
  "multisig/review":     "0x3769916a8c97FFf1C48DE49b03181578576aFdF1",
  accounts:              "0xE2e48880d780c4Fa36655EC9014DBbdA1164C0cA",
  "gift-card":           "0x47e49a7700c9D79412bb47385eD349106d4941F9",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
