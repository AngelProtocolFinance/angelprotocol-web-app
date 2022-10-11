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
        "juno1jxgswmw6kndcqtp545pt0wn4m2rqunf7mzaxncyguuc9nx2tycgqalxeg6",
      registrar:
        "juno1dmry032p0khv2d5knrtf8q5hzcnv06f8ps24naw9hrpv699zw9xqad4jma",
      accounts:
        "juno1ltu4ng2gnm5zs3gnmww89udr0kknd5hlds44lq48guem5xxf4nzsawa9sc",

      // Admin
      cw3ApTeam:
        "juno189gdk2aczgkx7p0cyll2whah5afazazhmaw4rmfhh7lda2twyrxseq76zw",
      cw4GrpApTeam:
        "juno1ptpsp2shhyqqesd52gwtj0lele46sl3wp3myvxa46zq3r0g596wsztqvur",
      cw3ReviewTeam:
        "juno1dkt5kujyd876wf0xgv3sedsjh6nzlhtdyykaz2e6tmnamzwphryqvaayaj",
      cw4GrpReviewTeam:
        "juno129g6ldqjnfpgzyxn3lm5yr67r2zl7e35upsrswejdds49q5s60dqnttzx9",

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
      index_fund:
        "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
      registrar:
        "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
      accounts:
        "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",

      // Admin
      cw3ApTeam:
        "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
      cw4GrpApTeam:
        "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
      cw3ReviewTeam:
        "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
      cw4GrpReviewTeam:
        "juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
