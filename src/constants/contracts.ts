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
        "juno1hm8djnz470mrxq67tydezdzhvqsslef4qe5h42aher7grq3venxsprm8py",
      registrar:
        "juno1mhnds5wkr26haxpe33svu0jvwsk2nnrwd89zuthc25kjwmx53tgs7hat9k",
      accounts:
        "juno16sxyhrfjcq7z5q2fhe66q9tkc4204agdynrksj8y6vkucg3sgnrqdkp7ue",

      // Admin
      cw3ApTeam:
        "juno1ytnpxkfnt2qeynyspwzu7hzlyulpu4far5gtu9xppalg2p4neecsgdthpj",
      cw4GrpApTeam:
        "juno1vqwwnmzzgeat62rja9e390fe79aqq56lpamtxcq2c7jzsxxtvwpsc8q5mv",

      cw3ReviewTeam:
        "juno1sa3mzc7mg7ndlxz0laph3lnvx2v5uwmn286grgyxqurgrztz02hsnnltmx",
      cw4GrpReviewTeam:
        "juno1nn0k4sf330qvzk797y068c9hdy75ng9tg3fzpkmafgrepnqcwk3sh5nqer",

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
