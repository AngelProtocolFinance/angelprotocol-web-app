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
        "juno1lm0p8fh60wr9kduyl6uh9zyw0ljfadxfptzjwz9eweygcldnuqfswk45zj",
      registrar:
        "juno1tf850c8m3yzrpgn5eke8ggxamzwsqknxnk08pwwjjlpmvyelk37qu5d3dr",
      accounts:
        "juno1ypvd2ypg9neyy0v9rgdk3egvllymucgzdqun6hcnwnund2h6m0eqz399m7",

      // Admin
      cw3ApTeam:
        "juno1qp4fhaq7ge52v79dmtdjws5jfsgn7vak3pegjj0fvegpsn5acrqqs0z6cu",
      cw4GrpApTeam:
        "juno1mnn9c35ej476rvf7xcg8unc70kg2ntwcqyzw8r9lrhqthmmann7q35guk2",

      cw3ReviewTeam:
        "juno1xp2u6v7eqvfn6vy7pr8qpsgl4cd4clpkesfcgg6kdjeh3nldwjrs06zwre",
      cw4GrpReviewTeam:
        "juno1lj9ranpx8efjx5lxs6djp6zwe0k66x63xprg0wj2nu223nuk273sr5eq5s",

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
