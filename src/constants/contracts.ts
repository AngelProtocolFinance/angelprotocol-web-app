import { sc } from "constants/sc";
import { chainIDs } from "constants/chainIDs";

type Contracts = {
  [index: string]: {
    [key in sc]: string;
  };
};

export const contracts: Contracts = {
  [chainIDs.terra_classic]: {
    //core
    [sc.anchor_vault1]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.anchor_vault2]: "",

    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

    //terraswap
    [sc.halo_token]: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",

    //halo
    [sc.halo_gov]: "terra1zcmp45vemypvd3j6ek2j2gz4mevjzyv3jc4ree",
    [sc.airdrop]: "terra1pe6mnf0ursz0h80h2hwk690hvrph8vgt9pnw0w",

    //lbp
    [sc.lbp_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.lbp_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.lbp_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.lbp_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",

    //loop
    [sc.loop_factory]: "terra16hdjuvghcumu6prg22cdjl96ptuay6r0hc6yns",
    [sc.loop_router]: "",
    [sc.loop_haloust_pair]: "terra1yjg0tuhc6kzwz9jl8yqgxnf2ctwlfumnvscupp",
    [sc.loop_haloust_lp]: "terra17pzt8t2hmx6587zn6yh5ensylm3s9mm4m72v2n",
    // terra12aazc56hv7aj2fcvmhuxve0l4pmayhpn794m0p /// HALO-LOOP PAIR
  },
};
