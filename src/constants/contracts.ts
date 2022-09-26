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
