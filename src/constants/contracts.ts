import { sc } from "contracts/types";
import { chainIDs } from "constants/chainIDs";
import { VaultFields } from "components/Withdrawer/types";

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
    [sc.anchor_vault1]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",
    [sc.anchor_vault2]: "terra172ue5d0zm7jlsj2d9af4vdff6wua7mnv6dq5vp",

    [sc.index_fund]: "terra19cevhng6nunl7gmc90sph0syuqyvtqn7mlhwz0",
    [sc.registrar]: "terra1nwk2y5nfa5sxx6gtxr84lre3zpnn7cad2f266h",

    // Multisig
    [sc.apCW3]: "terra1m6rqwmxlpztjf3zfhza906d44c9rpf2t6vn37n",
    [sc.apCW4]: "terra1qzdgs73h3rnh9j7f4t6tyuw9lmrp5esn6yunyl",
    [sc.coCW4]: "terra1lycc2zyhd676294c604euh8hxw7h6jrjd68x83",
    [sc.gaCW3]: "",

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
  [chainIDs.testnet]: {
    //core
    // WARNING: below sc.anchor address will not work
    [sc.anchor]: "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
    [sc.anchor_vault1]: "terra1mvtfa3zkayfvczqdrwahpj8wlurucdykm8s2zg",
    [sc.anchor_vault2]: "terra16y7du2keuersslsevvqx32z04wy6juyfwjs3ru",

    [sc.index_fund]: "terra1typpfzq9ynmvrt6tt459epfqn4gqejhy6lmu7d",
    [sc.registrar]: "terra15upcsqpg57earvp7mc49kl5e7cppptu2ndmpak",

    // Multisig
    [sc.apCW3]: "terra1qspgamxqn9slwe7ecca4n2fs2xsl5hxvkc9lzs",
    [sc.apCW4]: "terra1wpnzy6w9gd3tt9wkvnqkcmzkyc8v0tgz75nuue",
    [sc.coCW4]: "terra1ldrkpnysrasq4sg4zu9mgh74wt9nxvk9qgvxtd",
    [sc.gaCW3]: "",

    //terraswap
    [sc.halo_token]: "terra1ah3gd4uhxtrpc3qeqn84l6v3wcvfkh3vw25fyl",

    //halo
    [sc.halo_gov]: "terra16tw444h6qtzxr4kf2p276qt0u6w3ggtc20xgly",
    [sc.airdrop]: "terra1drmtlm4d9lps8jcecpw2erea0eg3lwnyvu4xjn",

    //lbp
    [sc.lbp_factory]: "terra167m64seqj7cucxm5wep3hyu4suqw4sl5s8uzjz",
    [sc.lbp_pair]: "terra17al3hudq2vcxtyvw9008edjhyqaw74mayva2d8",
    [sc.lbp_router]: "terra19dpanzuhtmdsw8ds5zschrh4mnxcejc0ut6dnk",
    [sc.lbp_lp]: "terra19zgdunfrx79nqvznqmx4satj5kxndvmrsx502m",

    //loop
    [sc.loop_factory]: "terra16hdjuvghcumu6prg22cdjl96ptuay6r0hc6yns",
    [sc.loop_router]: "",
    [sc.loop_haloust_pair]: "",
    [sc.loop_haloust_lp]: "",
    // terra12aazc56hv7aj2fcvmhuxve0l4pmayhpn794m0p /// HALO-LOOP PAIR
  },
  [chainIDs.localterra]: {
    //core
    [sc.anchor]: "",
    [sc.anchor_vault1]: "",
    [sc.anchor_vault2]: "",

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
    [sc.airdrop]: "",

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

export type VaultInfo = {
  address: string;
  name: string;
  symbol: string;
  field_id: VaultFields;
};
export const vaults: VaultInfo[] = [
  {
    address: contracts[chainIDs.testnet][sc.anchor_vault1],
    name: "Anchor Vault 1",
    symbol: "aUST",
    field_id: VaultFields.anchor1_amount,
  },
  {
    address: contracts[chainIDs.testnet][sc.anchor_vault2],
    name: "Anchor Vault 2",
    symbol: "aUST",
    field_id: VaultFields.anchor2_amount,
  },
  {
    address: contracts[chainIDs.mainnet][sc.anchor_vault1],
    name: "Anchor Vault 1",
    symbol: "aUST",
    field_id: VaultFields.anchor1_amount,
  },
];

export const vault_field_map: { [index: string]: VaultFields } = {
  [contracts[chainIDs.testnet][sc.anchor_vault1]]: VaultFields.anchor1_amount,
  [contracts[chainIDs.testnet][sc.anchor_vault2]]: VaultFields.anchor2_amount,
  [contracts[chainIDs.mainnet][sc.anchor_vault1]]: VaultFields.anchor1_amount,
};
