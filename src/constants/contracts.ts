import { NETWORK } from "./env";

//prettier-ignore
const mainnet = {
  registrar:       "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
  index_fund:      "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
  cw4GrpApTeam:    "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
  cw3ApTeam:       "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
  accounts:        "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",
  cw4GrpCharityReviewTeam:"juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",
  cw3CharityReviewTeam:   "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
  cw4GrpImpactReviewTeam: "juno1ek5s4zyrwzawax0f2ya0rlxrnfe9ae0ste3y5r6ewfyy6mkp8gcstkrphx",
  cw3ImpactReviewTeam: "juno1hrz89efl89v7pxvah0lsp0q38j5dvqmmew5rexpz7k4l577h2ddq4zmcdl",
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
  registrar:       "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  index_fund:      "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  cw4GrpApTeam:    "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  cw3ApTeam:       "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:        "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  cw4GrpCharityReviewTeam:"juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  cw3CharityReviewTeam:   "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  cw4GrpImpactReviewTeam: "",
  cw3ImpactReviewTeam: "",
  halo_token: "",
  gift_cards:      "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
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
  cw4GrpCharityReviewTeam:"juno1kj8q8g2pmhnagmfepp9jh9g2mda7gzd0m5zdq0s08ulvac8ck4dqhnemjt",
  cw3CharityReviewTeam:   "juno1fyr2mptjswz4w6xmgnpgm93x0q4s4wdl6srv3rtz3utc4f6fmxeql2yarc",
  cw4GrpImpactReviewTeam: "juno1m7gwjd4slsnsh6l7c36g7n5c5nhqewfr9lsx6hf2w48wftcm3qssfxdswq",
  cw3ImpactReviewTeam: "juno1dullel90lmwxkf5djwvqzqq4rcqwfh92x3ymnv3jpv7ey6tm8scq3pw3wy",
  halo_token: "",
  gift_cards: "",
  gov: "",
  airdrop: "",
  loop_haloust_pair: "",
};

export const contracts: Contracts =
  NETWORK === "LOCAL" ? local : NETWORK === "TESTNET" ? testnet : mainnet;
