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
        "juno1rafegcggtmetfcdfp2umvlmperpu6vdcxwraz59wcgja85mz25fs27yvae",
      registrar:
        "juno1tsg3rqyzj32swe4ah392psej4szldx582ga32gnw925medju5h6su2fefg",
      accounts:
        "juno1fd0xwagz43w053sj0z948rlegyt24wglfyjjtd7l7vf2pvme6dsqmpc73n",

      // Admin
      cw3ApTeam:
        "juno1a6grxe4nz2r0p7h048exta4qx6wfj47h7yug0zw44ele6a7faausqqhzcg",
      cw4GrpApTeam:
        "juno1k77vksqvhy4r83scmh80gqkfluv5kjtxcxfuw6de323cdpnxgvhqqcq40y",

      cw3ReviewTeam:
        "juno1xe4pewxhddsg3y2rpemjnvdx0ut4dpsze32t0fj47kr4m9ryy02sq35jq0",
      cw4GrpReviewTeam:
        "juno1sfu6h84vk82zrqac5s72tnh3pujcxgraxgdnamalhsafet7unf8q7stmgz",

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
