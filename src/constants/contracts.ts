import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "accounts"
  | "apCW4"
  | "apCW3"
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
      apCW3: "juno1a6grxe4nz2r0p7h048exta4qx6wfj47h7yug0zw44ele6a7faausqqhzcg",
      apCW4: "juno1k77vksqvhy4r83scmh80gqkfluv5kjtxcxfuw6de323cdpnxgvhqqcq40y",

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
      apCW3: "",
      apCW4: "",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
