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
        "juno1mvr3c4ezjkfmu8j3eka4rxh92zcc6j7ln8jlapt8yg3fv6xhwmjq4m9tfk",
      registrar:
        "juno1p06jg204wnv262xywsagww49t0gvunqk4vzjcdvhn55sqvprls5sgrw8jd",
      accounts:
        "juno1y0wuuhyhrl7e5auu6pmgydhry20cu2pecte9ekeye4u3ddlvmwmqk6ve2a",

      // Admin
      cw3ApTeam:
        "juno1u9atwm9ut0krjvez87akc8u873r4hqhg05vscwztzufaujfz8etqh20g8h",
      cw4GrpApTeam:
        "juno1nrp3q7rnfc8qq8a3rchg689rl5qks68h9gqy9kfcs0z8wqql0vhsx3rv8s",

      cw3ReviewTeam:
        "juno1dsluvths8jrdajvz89ge7epnwrdmrcgg4ua02j2kkw8m2fvp3shqsr5glp",
      cw4GrpReviewTeam:
        "juno18tlf8peuc3xm0ua897ucsampmavv5m897pr596tawc4tu3le8usqs33tsx",

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
