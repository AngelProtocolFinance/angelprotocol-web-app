import { IS_DEV } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "apCW4"
  | "apCW3"
  | "halo_token"
  | "gov"
  | "airdrop"
  | "loop_halo_uluna_pair"
  | "multicall";

type Contracts = {
  [key in SC]: string;
};

export const contracts: Contracts = IS_DEV
  ? {
      //TESTNET CONTRACTS
      //core
      index_fund:
        "terra1h6j0jhetc3qef4m8ypksa82jmn5wlue9dxncpx53zxvznlsukdwq9vagev",
      registrar:
        "terra1jpdrgx66yhz23yjs0nzthjtrafrhfmmst67h73atn6km8pnuh7ys42dnlj",

      // Admin
      apCW3: "terra1hjx9hspsm62x7aasxktxsv75asquyss9ns3wmr03xsqyp3wfj4vqxpq5l6",
      apCW4: "terra138ejrx6fu62gx7jwnypjfjxt2p9epm083892tymxh93kzhysu74qak3clf",

      //terraswap
      halo_token:
        "terra1xqvq0sglawp39crdax6729uexcp49c842tlmvk26wwkdjlq9qx2skrd7rf",

      //halo
      gov: "terra16tw444h6qtzxr4kf2p276qt0u6w3ggtc20xgly",
      airdrop: "terra1drmtlm4d9lps8jcecpw2erea0eg3lwnyvu4xjn",

      //loop
      loop_halo_uluna_pair:
        "terra1p6qq27havgzu9p9rxw9zqflghs23ffm9gppf95ea63w9h2ahwd9sg0l989",

      //multicall
      multicall: "terra1z9p02s5fkasx5qxdaes6mfyf2gt3kxuhcsd4va",
    }
  : {
      //TESTNET CONTRACTS
      //core
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
      loop_halo_uluna_pair: "terra1yjg0tuhc6kzwz9jl8yqgxnf2ctwlfumnvscupp",

      //multicall
      multicall: "terra1y60jx2jqh5qpmcnvgz3n0zg2p6ky4mr6ax2qa5",
    };
