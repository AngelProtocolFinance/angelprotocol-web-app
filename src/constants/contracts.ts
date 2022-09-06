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
        "juno17qjnys68aemf9nzncyr7gt8yscquzxm792mc35nklwqyzk7qcvxqwt9l5m",
      registrar:
        "juno1xdcdynleemkjmlwcz44wnl3px8h4ctueec8segt6dm58g4dzw5uq4ne3cz",
      accounts:
        "juno1eudag2gs6q5fgf0gxga5dz468fuj3kwnd72vys8alnn4x62zefhsqxg330",

      // Admin
      cw3ApTeam:
        "juno1mcq9sg7y2ms589w7tj63u2ta3g57gnv554z26tdnnjnldklsju7qmxn6zt",
      cw4GrpApTeam:
        "juno10vnq2rpvh7ztyuefzh6dre9pzdyvg7ve8ghev3ufgeyu227wt2fq5e07du",

      cw3ReviewTeam:
        "juno1whhz5ywu6ff7ghhyt76v0dc586mk5ehncmmfxnf6u0hxu6uxfsdq8arm4p",
      cw4GrpReviewTeam:
        "juno1mlm82v0yascqgsf3sngfvn67w6mqhjw3ysr6eeyndzden6ggsh3qlmne93",

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
