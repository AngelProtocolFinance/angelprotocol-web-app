import { chainIDs, sc } from "contracts/types";

type Contracts = {
  [index: string]: {
    [key in sc]: string;
  };
};

export const contracts: Contracts = {
  [chainIDs.mainnet]: {
    [sc.anchor]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

    //halo
    [sc.halo_token]: "terra1w8kvd6cqpsthupsk4l0clwnmek4l3zr7c84kwq",
    [sc.halo_stake]: "",
    [sc.halo_gov]: "",

    //lbp
    [sc.lbp_factory]: "terra10dl5u40lj50scntv4qmwykfw2zulf77zyv34u0",
    [sc.lbp_pair]: "terra1hhpgcp2stvzx952zfxtxg4dhgf60yfzchesj3e",
    [sc.lbp_router]: "terra1l32eafhapmn9c8m7epyraxa2yty4xngamvewfs",
    [sc.lbp_lp]: "terra1kt26adtzwu4yefw37snr73n393vsu8w0hmazxc",
  },
  /********************************************************************* */
  [chainIDs.testnet]: {
    [sc.anchor]: "terra1mvtfa3zkayfvczqdrwahpj8wlurucdykm8s2zg",
    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",

    //halo
    [sc.halo_token]: "terra1ah3gd4uhxtrpc3qeqn84l6v3wcvfkh3vw25fyl",
    [sc.halo_stake]: "terra1y5klltj4u3ggel25n5ew26sndsd805fr8ngav3",
    [sc.halo_gov]: "terra1t0ughmzr4u4r09lsj7z97q56fpde8qqmrxg2df",

    //lbp
    [sc.lbp_factory]: "terra1rg723ngfpwn2yfnvmrg4jlcq0dw0al9haxch09",
    [sc.lbp_pair]: "terra1mmqdr6es5fz2hm2l6qw26vv8g0jvvu4rfdsman  ",
    [sc.lbp_router]: "terra1vc6wxu2adjr63df8hfc2jtfeh9nktfq59slwf5",
    [sc.lbp_lp]: "terra1udawd5mvys5xkwq8gqdq5frjkmn4feztel4m5r",
  },
  /********************************************************************* */
  [chainIDs.localterra]: {
    //same as testnet
    [sc.anchor]: "terra1mvtfa3zkayfvczqdrwahpj8wlurucdykm8s2zg",
    [sc.index_fund]: "terra1gv07846a3867ezn3uqkk082c5ftke7hpemzu9q",
    [sc.registrar]: "terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5",

    //halo
    [sc.halo_token]: "terra1pcmqku8swxdsfl6dtp04c08hpc3crwmqrz2spp",
    [sc.halo_stake]: "",
    [sc.halo_gov]: "",

    //lbp
    [sc.lbp_factory]: "terra193lv5grxfjuppsku56ldx90qxlg2mdsfpk5uw0",
    [sc.lbp_pair]: "terra174u76knkvh9c9va2ktjlwus35jtmdsh6cjyxeu",
    [sc.lbp_router]: "terra1v5l3yfxnmu4j3e2z7s73try82jg5kjnclxtctz",
    [sc.lbp_lp]: "terra1am7gpv35q80c6x2w8vfg4kp9mnedujjj73g3dr",
  },
};
