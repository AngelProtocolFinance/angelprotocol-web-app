import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "accounts"
  | "cw3ApTeam"
  | "cw4GrpApTeam"
  | "cw3ReviewTeam"
  | "cw4GrpReviewTeam"
  | "anchor_vault1"
  | "anchor_vault2" //mainnet doesn't have anchor vault2
  | "halo_token"
  | "gov"
  | "airdrop"
  | "loop_factory"
  | "loop_router"
  | "loop_haloust_pair"
  | "loop_haloust_lp";

type Contracts = {
  [key in SC]: string;
};

export const contracts: Contracts = IS_TEST
  ? {
      //TESTNET CONTRACTS
      //core
      accounts:
        "juno1tvqhftjf73hvznhtungc3t5mn0u6xflqrl3wk3e4huxn09v0w2rqf68apr",
      anchor_vault1: "terra1mvtfa3zkayfvczqdrwahpj8wlurucdykm8s2zg",
      anchor_vault2: "terra16y7du2keuersslsevvqx32z04wy6juyfwjs3ru",
      index_fund:
        "juno1sddduqk23xrvnga8am6v9gvfqnjw640exxt9quk3qv95spe829vqc78uyt",
      registrar:
        "juno15ckjm0va7gd57p70t609hggq5stuc5hwzyc5ksm62uj4rwzwj42sj6utrw",

      // Admin
      cw3ApTeam:
        "juno178c53lrle9my5cm4y3yqjjgp0gfx9ks4nnv64gvy35nyfzn4uf6q8f6agw",
      cw4GrpApTeam:
        "juno1zc67wc0gwac8cear606a8mr5py4kr790g8vy5zxlt7prde400yas3zklpr",

      // Review team
      cw3ReviewTeam:
        "juno1xe4pewxhddsg3y2rpemjnvdx0ut4dpsze32t0fj47kr4m9ryy02sq35jq0",
      cw4GrpReviewTeam:
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
      accounts: "",
      anchor_vault1: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
      anchor_vault2: "",
      index_fund: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
      registrar: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

      // Admin
      cw3ApTeam: "terra1zrwpm9htqdh80nhqcuvw999cexvtmu0xt4dks5",
      cw4GrpApTeam: "terra1eueh924845wwsc2mna5u3ysn79q66kwqgq26mj",

      // Review team
      cw3ReviewTeam: "",
      cw4GrpReviewTeam: "",

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
