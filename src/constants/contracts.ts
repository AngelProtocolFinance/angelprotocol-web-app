import { chainIDs, sc } from "contracts/types";

type Contracts = {
  [index: string]: {
    [key in sc]: string;
  };
};

export const contracts: Contracts = {
  //latest address here - https://github.com/AngelProtocolFinance/angelprotocol-test-suite/blob/main/src/config/constants.ts
  [chainIDs.mainnet]: {
    //core
    [sc.anchor]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

    // Multisig
    [sc.apCW3]: "terra1m6rqwmxlpztjf3zfhza906d44c9rpf2t6vn37n",
    [sc.apCW4]: "terra1qzdgs73h3rnh9j7f4t6tyuw9lmrp5esn6yunyl",
    [sc.gaCW3]: "terra1jd2n0ze7er80x9h8k3x006aypaxs7mvrggdmn9",
    [sc.coCW4]: "terra1lycc2zyhd676294c604euh8hxw7h6jrjd68x83",

    //terraswap
    [sc.halo_token]: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",

    //halo
    [sc.halo_gov]: "terra1lzdqv40fd8am5ac5tr9kvrmplqywmrgh4dslvk",

    //lbp
    [sc.lbp_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.lbp_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.lbp_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.lbp_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",
  },
  [chainIDs.testnet]: {
    //core
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",

    // Multisig
    [sc.apCW3]: "terra1yp5we2meetcfxql522q9ve3dsl29epye86528j",
    [sc.apCW4]: "terra1jngs5xj00e9fq0hfmpr2pqyq96x3aj8la8kr3p",
    [sc.gaCW3]: "terra1ydp9qd9xgdq63ua6axfvauye3l7a3476lm6l28",
    [sc.coCW4]: "terra1ldrkpnysrasq4sg4zu9mgh74wt9nxvk9qgvxtd",

    //terraswap
    [sc.halo_token]: "terra1ah3gd4uhxtrpc3qeqn84l6v3wcvfkh3vw25fyl",

    //halo
    [sc.halo_gov]: "terra19e8yx8x5m5radap4plecnl4cppa0tyupzwesx6",

    //lbp
    [sc.lbp_factory]: "terra167m64seqj7cucxm5wep3hyu4suqw4sl5s8uzjz",
    [sc.lbp_pair]: "terra17al3hudq2vcxtyvw9008edjhyqaw74mayva2d8",
    [sc.lbp_router]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.lbp_lp]: "terra19zgdunfrx79nqvznqmx4satj5kxndvmrsx502m",
  },
  [chainIDs.localterra]: {
    //core
    [sc.anchor]: "",
    [sc.index_fund]: "",
    [sc.registrar]: "",

    // Multisig
    [sc.apCW3]: "",
    [sc.apCW4]: "",
    [sc.gaCW3]: "",
    [sc.coCW4]: "",

    //terraswap
    [sc.halo_token]: "",

    //halo
    [sc.halo_gov]: "",

    //lbp
    [sc.lbp_factory]: "",
    [sc.lbp_pair]: "",
    [sc.lbp_router]: "",
    [sc.lbp_lp]: "",
  },
};
