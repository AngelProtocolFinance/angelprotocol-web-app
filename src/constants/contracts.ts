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
        "juno107zpvrdyww48d0fylez3lxjf87qwwh8r5nphcdzlwnepnm2kga5q36quta",
      registrar:
        "juno13ufhg4xjdzylk9mhayc8khmgg25tl2vs42pzala9x53vxa8ppjkschfr0x",
      accounts:
        "juno1prqanslytzwtrext3qpfy4p83ld7yw04ga06n6yufg53fukf4x0q0udwj2",

      // Admin
      cw3ApTeam:
        "juno1pgedpd8m0g76ckxd6fduwpnm6x4g6fzsg0xj4u3xdchvjdxuzckqdhjv9a",
      cw4GrpApTeam:
        "juno13mk4dzwc5qdz7fxcrnkyj448lvap06rp7aw5h34xkcudrm98yv2sz4fysa",
      cw3ReviewTeam:
        "juno13mlk69qjx2cm8upx3d04h9dxh78mzhfksxrrnuyjk2l5s5wknl8skvkjhp",
      cw4GrpReviewTeam:
        "juno1h94wjgxv32zsg64f34retxudwd4nppslwm4glvu2jld9vrqh7k6srzjhcj",

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
