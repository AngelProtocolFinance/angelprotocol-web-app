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
  | "multicall";

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
        "juno18kkuz3ztvtsqcylrcmgezs5awcuftlxyzsgcf9gsunuxfgx8vmnq3mpp60",
      registrar:
        "juno14p5dep5wnc2576nr3u9kakz0nunh44rncwlkz8jgl8z0umenqe5su2p38a",

      // Admin
      apCW3: "juno1m80n4ykrws0pstwdv7yfefvpvwumm6zeuk4mdy57mqh5cqvhcmcs288edl",
      apCW4: "juno1wtztrpxxu6s0delnwtcyqfd590lwyww2uhgqur0uapqjh2njm7wq64udrm",

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

      //multicall
      multicall: "terra1z9p02s5fkasx5qxdaes6mfyf2gt3kxuhcsd4va",
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

      //multicall
      multicall: "terra1y60jx2jqh5qpmcnvgz3n0zg2p6ky4mr6ax2qa5",
    };
