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
        "juno1cp4ddyn4wg0lh3gugacng5wk8kjsahxpgpd5m5jhqjfssfqasxzsjqtr8y",
      registrar:
        "juno1nsttv2lpv3kl4zteze99fs72mevmxcfutqvfza90e9243wy0a40qk87j0l",
      accounts:
        "juno1xc6sahdstwyc3a9rrupvjj87xps8d396seutnh40578mdpygpenqjg04rd",

      // Admin
      cw3ApTeam:
        "juno17shnd06l8guaqw3ekq56x5u3z0n65qu2qfms6nvzh3mwxr2cr53smmj4yq",
      cw4GrpApTeam:
        "juno1l6dstn6kyys6cg0fqn2k9dyxzetcxffkuwspe6t8qqqrjy9vs8usxu50ed",
      cw3ReviewTeam:
        "juno16p5mnk2r73yze7emyqw8w6p6cnf7qjlmqwc3lx6c36t9lj5fgmjst3cjnx",
      cw4GrpReviewTeam:
        "juno168v32h347du4wc8y5gf6sljkhvktqvn85r2vywekzfwaq4e3sdlqscd5sd",

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
