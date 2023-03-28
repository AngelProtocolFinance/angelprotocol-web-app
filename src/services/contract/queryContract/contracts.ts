import { Contract } from "types/lists";
import { NETWORK } from "constants/env";

type Contracts = { [key in Contract]: string };

//prettier-ignore
const mainnet:Contracts = {
    registrar:            "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
    "index-fund":         "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
    "cw4/ap":             "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
    "cw3/ap":             "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
    accounts:             "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",
    "cw4/charity-review": "juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",
    "cw3/charity-review": "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
    "cw4/impact-review":  "juno1ek5s4zyrwzawax0f2ya0rlxrnfe9ae0ste3y5r6ewfyy6mkp8gcstkrphx",
    "cw3/impact-review":  "juno1hrz89efl89v7pxvah0lsp0q38j5dvqmmew5rexpz7k4l577h2ddq4zmcdl",
    "cw4/review":         "",
    "cw3/review":         "",
    halo:                 "",
    "gift-card":          "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
    gov:                  "",
    airdrop:              "",
    "accounts/settings":  "",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:              "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  "index-fund":           "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  "cw4/ap":               "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  "cw3/ap":               "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:               "0xf725Ff6235D53dA06Acb4a70AA33206a1447D550",
  "cw4/review":           "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  "cw3/review":           "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  "cw4/charity-review":   "",
  "cw3/charity-review":   "",
  "cw4/impact-review":    "",
  "cw3/impact-review":    "",
  halo:                   "",
  "gift-card":            "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:                    "",
  airdrop:                "",
  "accounts/settings":    "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
}

//prettier-ignore
const local: Contracts = {
  //change this according to your local juno contract uploads
  registrar:              "juno14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9skjuwg8",
  "index-fund":           "juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p",
  "cw4/ap":               "juno1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqzzdhr6",
  "cw3/ap":               "juno1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgs44adts",
  accounts:               "juno1qwlgtx52gsdu7dtp0cekka5zehdl0uj3fhp9acg325fvgs8jdzks9z8n5r",
  "cw4/charity-review":   "juno1kj8q8g2pmhnagmfepp9jh9g2mda7gzd0m5zdq0s08ulvac8ck4dqhnemjt",
  "cw3/charity-review":   "juno1fyr2mptjswz4w6xmgnpgm93x0q4s4wdl6srv3rtz3utc4f6fmxeql2yarc",
  "cw4/impact-review":    "juno1m7gwjd4slsnsh6l7c36g7n5c5nhqewfr9lsx6hf2w48wftcm3qssfxdswq",
  "cw3/impact-review":    "juno1dullel90lmwxkf5djwvqzqq4rcqwfh92x3ymnv3jpv7ey6tm8scq3pw3wy",
  "cw4/review":           "",
  "cw3/review":           "",
  halo:                   "",
  "gift-card":            "",
  gov:                    "",
  airdrop:                "",
  "accounts/settings":    "",
};

export const contracts: Contracts =
  NETWORK === "LOCAL" ? local : NETWORK === "TESTNET" ? testnet : mainnet;
