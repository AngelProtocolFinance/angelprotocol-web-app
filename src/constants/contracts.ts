import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "anchor_vault1"
  | "anchor_vault2" //mainnet doesn't have anchor vault2
  | "apCW4"
  | "apCW3"
  | "halo_token"
  | "gov"
  | "airdrop"
  | "loop_factory"
  | "loop_router"
  | "loop_haloust_pair"
  | "loop_haloust_lp"
  | "apCW3ReviewTeam"
  | "apCW4ReviewTeam";

type Contracts = {
  [key in SC]: string;
};

export const contracts: Contracts = IS_TEST
  ? {
      //TESTNET CONTRACTS
      //core
      anchor_vault1: "terra1mvtfa3zkayfvczqdrwahpj8wlurucdykm8s2zg",
      anchor_vault2: "terra16y7du2keuersslsevvqx32z04wy6juyfwjs3ru",
      index_fund:
        "juno1rafegcggtmetfcdfp2umvlmperpu6vdcxwraz59wcgja85mz25fs27yvae",
      registrar:
        "juno1tsg3rqyzj32swe4ah392psej4szldx582ga32gnw925medju5h6su2fefg",

      // Admin
      apCW3: "juno1a6grxe4nz2r0p7h048exta4qx6wfj47h7yug0zw44ele6a7faausqqhzcg",
      apCW4: "juno1k77vksqvhy4r83scmh80gqkfluv5kjtxcxfuw6de323cdpnxgvhqqcq40y",

      // Review team
      apCW3ReviewTeam:
        "juno1xe4pewxhddsg3y2rpemjnvdx0ut4dpsze32t0fj47kr4m9ryy02sq35jq0",
      apCW4ReviewTeam:
        "juno1sfu6h84vk82zrqac5s72tnh3pujcxgraxgdnamalhsafet7unf8q7stmgz",

      //terraswap
      halo_token: "terra1ah3gd4uhxtrpc3qeqn84l6v3wcvfkh3vw25fyl",

      //halo
      gov: "terra16tw444h6qtzxr4kf2p276qt0u6w3ggtc20xgly",
      airdrop: "terra1drmtlm4d9lps8jcecpw2erea0eg3lwnyvu4xjn",

      //loop
      loop_factory: "terra16hdjuvghcumu6prg22cdjl96ptuay6r0hc6yns",
      loop_router: "",
      loop_haloust_pair: "",
      loop_haloust_lp: "",
    }
  : {
      //MAINNET CONTRACTS
      //core
      anchor_vault1: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
      anchor_vault2: "",
      index_fund: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
      registrar: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

      // Admin
      apCW3: "terra1zrwpm9htqdh80nhqcuvw999cexvtmu0xt4dks5",
      apCW4: "terra1eueh924845wwsc2mna5u3ysn79q66kwqgq26mj",

      // Review team
      apCW3ReviewTeam: "",
      apCW4ReviewTeam: "",

      //terraswap
      halo_token: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",

      //halo
      gov: "terra1zcmp45vemypvd3j6ek2j2gz4mevjzyv3jc4ree",
      airdrop: "terra1pe6mnf0ursz0h80h2hwk690hvrph8vgt9pnw0w",

      //loop
      loop_factory: "terra16hdjuvghcumu6prg22cdjl96ptuay6r0hc6yns",
      loop_router: "",
      loop_haloust_pair: "terra1yjg0tuhc6kzwz9jl8yqgxnf2ctwlfumnvscupp",
      loop_haloust_lp: "terra17pzt8t2hmx6587zn6yh5ensylm3s9mm4m72v2n",
    };
