import { chainIDs, sc } from "contracts/types";

type Contracts = {
  [index: string]: {
    [key in sc]: string;
  };
};

export const contracts: Contracts = {
  [chainIDs.mainnet]: {
    //core
    [sc.anchor]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

    //terraswap
    [sc.halo_token]: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",

    //halo
    [sc.halo_gov]: "terra1lzdqv40fd8am5ac5tr9kvrmplqywmrgh4dslvk",

    //lbp
    [sc.lbp_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.lbp_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.lbp_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.lbp_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",

    //lbp
    [sc.loop_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.loop_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.loop_haloust_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.loop_haloust_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",
  },
  [chainIDs.testnet]: {
    //core
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",

    //terraswap
    [sc.halo_token]: "terra1ah3gd4uhxtrpc3qeqn84l6v3wcvfkh3vw25fyl",

    //halo
    [sc.halo_gov]: "terra19e8yx8x5m5radap4plecnl4cppa0tyupzwesx6",

    //lbp
    [sc.lbp_factory]: "terra167m64seqj7cucxm5wep3hyu4suqw4sl5s8uzjz",
    [sc.lbp_pair]: "terra17al3hudq2vcxtyvw9008edjhyqaw74mayva2d8",
    [sc.lbp_router]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.lbp_lp]: "terra19zgdunfrx79nqvznqmx4satj5kxndvmrsx502m",

    //lbp
    [sc.loop_factory]: "terra167m64seqj7cucxm5wep3hyu4suqw4sl5s8uzjz",
    [sc.loop_router]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.loop_haloust_pair]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.loop_haloust_lp]: "terra19zgdunfrx79nqvznqmx4satj5kxndvmrsx502m",
  },
  [chainIDs.localterra]: {
    //core
    [sc.anchor]: "",
    [sc.index_fund]: "",
    [sc.registrar]: "",

    //terraswap
    [sc.halo_token]: "",

    //halo
    [sc.halo_gov]: "",

    //lbp
    [sc.lbp_factory]: "",
    [sc.lbp_pair]: "",
    [sc.lbp_router]: "",
    [sc.lbp_lp]: "",

    //lbp
    [sc.loop_factory]: "",
    [sc.loop_router]: "",
    [sc.loop_haloust_pair]: "",
    [sc.loop_haloust_lp]: "",
  },
};
