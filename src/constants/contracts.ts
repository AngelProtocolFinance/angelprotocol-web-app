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
        "juno1sddduqk23xrvnga8am6v9gvfqnjw640exxt9quk3qv95spe829vqc78uyt",
      registrar:
        "juno15ckjm0va7gd57p70t609hggq5stuc5hwzyc5ksm62uj4rwzwj42sj6utrw",
      accounts:
        "juno1tvqhftjf73hvznhtungc3t5mn0u6xflqrl3wk3e4huxn09v0w2rqf68apr",

      // Admin
      cw3ApTeam:
        "juno178c53lrle9my5cm4y3yqjjgp0gfx9ks4nnv64gvy35nyfzn4uf6q8f6agw",
      cw4GrpApTeam:
        "juno1zc67wc0gwac8cear606a8mr5py4kr790g8vy5zxlt7prde400yas3zklpr",

      cw3ReviewTeam:
        "juno165l8yuh7mjkxq93zlxhann7m4l69g0rwm50rstswqf0hdym0lmlqcgy5nw",
      cw4GrpReviewTeam:
        "juno1rpg6ue3fv2ay5zd49akmpxnxf2dq0q4ugsutah8vekpa43g3ahrqtvzpsp",

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
