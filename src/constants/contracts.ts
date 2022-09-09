import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "accounts"
  | "cw3ApTeam"
  | "cw4GrpApTeam"
  | "cw3ReviewTeam"
  | "cw4GrpReviewTeam"
  | "halo_token"
  | "gov"
  | "airdrop"
  | "loop_haloust_pair";

type Contracts = {
  [key in SC]: string;
};

export const contracts: Contracts = IS_TEST
  ? {
      //TESTNET CONTRACTS
      //core
      index_fund:
        "juno1vnu73u7z8arxxlde3thfq2ww5973lnvys6x8kcgr24hem4wrfexqs0j2we",
      registrar:
        "juno1zq4q5dusl6ylfehpd03q2wck34afm0unudk7lp6u6canhgxk8v0slufjag",
      accounts:
        "juno1yhnr9a3zzh4e09dglgrx0g9rv3pfx8ffx0tspuewkg68clp5zz6qrl5fyn",

      // Admin
      cw3ApTeam:
        "juno1vll6a5fknhjktk7aulunvlvkp7aeft57z0rpcqnh3ztmhza9etxq2a9tm5",
      cw4GrpApTeam:
        "juno1a53zpqwkxsxlxycvv6yx2fda9unp5s56tndmmp9x534jdq7xwp3qv5n8hh",

      cw3ReviewTeam:
        "juno1vll6a5fknhjktk7aulunvlvkp7aeft57z0rpcqnh3ztmhza9etxq2a9tm5",
      cw4GrpReviewTeam:
        "juno1a53zpqwkxsxlxycvv6yx2fda9unp5s56tndmmp9x534jdq7xwp3qv5n8hh",

      //terraswap
      halo_token: "",

      //halo
      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    }
  : {
      //MAINNET CONTRACTS
      //core
      index_fund: "",
      registrar: "",
      accounts: "",

      // Admin
      cw3ApTeam: "",
      cw4GrpApTeam: "",
      cw3ReviewTeam: "",
      cw4GrpReviewTeam: "",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
