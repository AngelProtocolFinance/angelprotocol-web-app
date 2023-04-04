import { Contract } from "types/lists";
import { NETWORK } from "./env";

type Contracts = { [key in Contract]: string };

//prettier-ignore
const mainnet = {
  registrar:    "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  "index-fund": "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  "cw4/ap":     "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  "cw3/ap":     "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:     "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  "cw4/review": "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  "cw3/review": "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  "gift-card":  "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:          "",
  airdrop:      "",
  controller:   "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
}

//just reuse literal structure

//prettier-ignore
const testnet:Contracts = {
  registrar:    "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  "index-fund": "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  "cw4/ap":     "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  "cw3/ap":     "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:     "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  "cw4/review": "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  "cw3/review": "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  "gift-card":  "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:          "",
  airdrop:      "",
  controller:   "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
}

//prettier-ignore
const local: Contracts = {
  registrar:    "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  "index-fund": "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  "cw4/ap":     "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  "cw3/ap":     "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:     "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  "cw4/review": "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  "cw3/review": "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  "gift-card":  "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:          "",
  airdrop:      "",
  controller:   "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
};

export const contracts: Contracts =
  NETWORK === "LOCAL" ? local : NETWORK === "TESTNET" ? testnet : mainnet;
