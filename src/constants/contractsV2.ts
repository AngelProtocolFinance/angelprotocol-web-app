import { Contract } from "types/lists";
import { NETWORK } from "./env";

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
    "accounts/settings":  "",
}

//prettier-ignore
const testnet:Contracts = {
  registrar:              "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  "index-fund":           "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  "cw4/ap":               "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  "cw3/ap":               "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:               "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  "cw4/review":           "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  "cw3/review":           "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  "cw4/charity-review":   "",
  "cw3/charity-review":   "",
  "cw4/impact-review":    "",
  "cw3/impact-review":    "",
  halo:                   "",
  "gift-card":            "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:                    "",
  "accounts/settings":    "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
}

export const contracts: Contracts = NETWORK === "TESTNET" ? testnet : mainnet;
