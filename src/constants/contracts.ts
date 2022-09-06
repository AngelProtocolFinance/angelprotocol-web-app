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
        "juno13h6n255rnlxg0uu88k5l3h944a3hcpf3cwclyq4q864hqez4v3ss0gg06s",
      registrar:
        "juno12z2ju6ez2tth6znk6dyqjqf834ala4nf88mr53csq7g0256nqqnqst6fcv",
      accounts:
        "juno1swwdd0m9rxsdswlcwkdzxd9qcrs9vtgl2vgdvmtfjqasynq65xuq3jlrr6",

      // Admin
      cw3ApTeam:
        "juno1cld4sc94584c4s2g0t0t3p8wrz9q59z67y9p6c2yyarkppnwazmqzhk9wm",
      cw4GrpApTeam:
        "juno124a8f0jyn3y7e7q6sqeg5pppgmm9seq59ctk7fvd9tcqpa63a3asgqat5m",

      cw3ReviewTeam:
        "juno1zuh2ed22hyclcgaw70fve3l6q35m28drtckfs9hjrnt32z8jacaqtlq9q2",
      cw4GrpReviewTeam:
        "juno1j5xs6z40z82fx2s9zzcksl93u49eummzawpp0hzj7sxl4ef4jg5qfxht78",

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
