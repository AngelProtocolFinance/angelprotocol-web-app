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
        "juno1eqga4gkll92pl8qle87hhe3dnq3fengyvtrpanrktfklrx620a2sxz2qpd",
      registrar:
        "juno1m20gu8tzfcaywgwnm24zamnfc0h925u2evrttqwwpkd887h9qclq9q9ud5",

      // Admin
      apCW3: "juno1l9hwkpxytdfzlysq48a8zcug6u8lh9z9rxy0wwrvl4jdhyzla2wqj3n5nt",
      apCW4: "juno1gy85asevaugtst2pgzlx6m2xuf0dlzard3ux0edpds4dydglx0usqfagyp",

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
