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
        "juno1mx32w9tnfxv0z5j000750h8ver7qf3xpj09w3uzvsr3hq68f4hxqvzedz6",
      registrar:
        "juno1ul4msjc3mmaxsscdgdtjds85rg50qrepvrczp0ldgma5mm9xv8yqpv6zva",
      accounts:
        "juno12cfxezwfq4q90nk0g5zvzpjf0t9t2gfdn8vlnwkhm9lpde0pd49qwfdvn4",

      // Admin
      cw3ApTeam:
        "juno186ucx5mtdq6ams8rsvvcu7yfw5lhtxue8ykdkyqvlnk3gpc77las5wms6m",
      cw4GrpApTeam:
        "juno1lqgdq9u8zhcvwwwz3xjswactrtq6qzptmlzlh6xspl34dxq32uhqhlphat",
      cw3ReviewTeam:
        "juno1qt0gkcrvcpv765k8ec4tl2svvg6hd3e3td8pvg2fsncrt3dzjefsmyhx8r",
      cw4GrpReviewTeam:
        "juno14483x4pm76hwpzyvj56ccarl8kls3tdyz2rtve7p0u7lj9dgsjcqft5umc",

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
        "juno1ycpml96cru0ln20zv7qxkc6xuass8lerpk0cfwvgmvyn6zjux55srqkah5",
      registrar:
        "juno16uva5mgmzj78rdwf5hcqv688lyenms6s32zfjectg8zkr4vc3xfq95eueu",
      accounts:
        "juno148s6297wzl42cm2l44wnl5xs5m45qe6a2e945c0px8jgq860yfhqq56e9g",

      // Admin
      cw3ApTeam:
        "juno1dftgv4yhy8yqx95c7a3jar9dg5nnq4p2m50nzk6wdlkahd2h4hms3js63a",
      cw4GrpApTeam:
        "juno1ucjmf3nztyq4a6q8tzja9thefq7092s9r4a2yk8267spr2fays2qks9rl4",
      cw3ReviewTeam:
        "juno1w5uypgtrm03k7qrrj4pf6cf8aj6tnglm4ze2mxv94f2xgy97muyswfcd9j",
      cw4GrpReviewTeam:
        "juno1yv9rs87s6f4ql5mnuu0hmg4ehpdc7urdhty8ja8992hhc8dgxscsygwt9t",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
