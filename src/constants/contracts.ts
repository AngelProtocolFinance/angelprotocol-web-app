import { NETWORK } from "./env";

//prettier-ignore
const mainnet = {
  registrar:       "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
  index_fund:      "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
  cw4GrpApTeam:    "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
  cw3ApTeam:       "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
  accounts:        "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",
  cw4GrpReviewTeam:"juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",
  cw3ReviewTeam:   "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
  halo_token: "",
  gift_cards:      "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
  gov: "",
  airdrop: "",
  loop_haloust_pair: "",
}

//just reuse literal structure
type Contracts = typeof mainnet;

//prettier-ignore
const testnet:Contracts = {
  registrar:       "juno1nsttv2lpv3kl4zteze99fs72mevmxcfutqvfza90e9243wy0a40qk87j0l",
  index_fund:      "juno1cp4ddyn4wg0lh3gugacng5wk8kjsahxpgpd5m5jhqjfssfqasxzsjqtr8y",
  cw4GrpApTeam:    "juno1l6dstn6kyys6cg0fqn2k9dyxzetcxffkuwspe6t8qqqrjy9vs8usxu50ed",
  cw3ApTeam:       "juno17shnd06l8guaqw3ekq56x5u3z0n65qu2qfms6nvzh3mwxr2cr53smmj4yq",
  accounts:        "juno1xc6sahdstwyc3a9rrupvjj87xps8d396seutnh40578mdpygpenqjg04rd",
  cw4GrpReviewTeam:"juno168v32h347du4wc8y5gf6sljkhvktqvn85r2vywekzfwaq4e3sdlqscd5sd",
  cw3ReviewTeam:   "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
  halo_token: "",
  gift_cards:      "juno1q5q8fgw83fusujz7x339yq352tlxdk2f0q2a6qz72dl0r9lk5y7qwf6w3u",
  gov: "",
  airdrop: "",
  loop_haloust_pair: "",
}

//prettier-ignore
const local: Contracts = {
  //change this according to your local juno contract uploads
  registrar:       "juno14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9skjuwg8",
  index_fund:      "juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p",
  cw4GrpApTeam:    "juno1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqzzdhr6",
  cw3ApTeam:       "juno1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgs44adts",
  accounts:        "juno1qwlgtx52gsdu7dtp0cekka5zehdl0uj3fhp9acg325fvgs8jdzks9z8n5r",
  cw4GrpReviewTeam:"juno1kj8q8g2pmhnagmfepp9jh9g2mda7gzd0m5zdq0s08ulvac8ck4dqhnemjt",
  cw3ReviewTeam:   "juno1fyr2mptjswz4w6xmgnpgm93x0q4s4wdl6srv3rtz3utc4f6fmxeql2yarc",
  halo_token: "",
  gift_cards: "",
  gov: "",
  airdrop: "",
  loop_haloust_pair: "",
};

export const contracts: Contracts =
  NETWORK === "LOCAL" ? local : NETWORK === "TESTNET" ? testnet : mainnet;
