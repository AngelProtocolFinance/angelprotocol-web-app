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
        "juno1wg3f833gp0qze6g5exsc3wfe4rhjd6w7j8u000usyekngt8aku6sfp32z0",
      registrar:
        "juno1junqfhptf0tnx843eepl8pksk25wvcgapfhsz6v97u87ax0qjpus55qsga",
      accounts:
        "juno1gfrzmrs9qj6av5r4q9d5sdysl9m84a2c8ls8yv8lqg4qm6aftfkql2v6df",

      // Admin
      cw3ApTeam:
        "juno16esez5e20tqwah87cujkscxqt37zf48vyhqhj9m8ney64m9mwucqz6dr6f",
      cw4GrpApTeam:
        "juno1zzzj2l20ma43v0296ey453j00ju2uy9havdmavyp6kqeke2pvdysrf3cps",

      cw3ReviewTeam:
        "juno1g4s92cezesughqge4m9atmp96nykh6dr5244z4y4gl2suvzcjfvqh6e0ma",
      cw4GrpReviewTeam:
        "juno1pgcp5q80wappe4dc0zurugft88k82t70znznsphpyeweyz5vsjvq2e6dt7",

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
