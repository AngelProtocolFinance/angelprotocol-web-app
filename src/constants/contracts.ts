import { NETWORK } from "./env";

//prettier-ignore
const mainnet = {
  registrar:              "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
  index_fund:             "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
  cw4GrpApTeam:           "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
  cw3ApTeam:              "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
  accounts:               "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",
  cw4GrpCharityReviewTeam:"juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",
  cw3CharityReviewTeam:   "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
  cw4GrpImpactReviewTeam: "juno1ek5s4zyrwzawax0f2ya0rlxrnfe9ae0ste3y5r6ewfyy6mkp8gcstkrphx",
  cw3ImpactReviewTeam:    "juno1hrz89efl89v7pxvah0lsp0q38j5dvqmmew5rexpz7k4l577h2ddq4zmcdl",
  "cw4GrpReviewTeam":     "",
  "cw3ReviewTeam":        "",
  halo_token:             "",
  gift_cards:             "juno17pghl3qreyqnjlq6hun5ymshl0dkfeelcy738dkgk602lzmgcvaq2e4xav",
  gov:                    "",
  airdrop:                "",
  loop_haloust_pair:      "",
  settingsController:     "",
}

//just reuse literal structure
type Contracts = typeof mainnet;

//prettier-ignore
const testnet:Contracts = {
  registrar:              "juno120jxhdz7n4qk9kjeelq5q2ae7w3mslc2qeteptvhv83dnff6x56qdsq93m",
  index_fund:             "juno1dztxk384lhvtexmmkts3ycjdgyuxnjdr5g08m6rx8mkwykkc6qrqdce9ta",
  cw4GrpApTeam:           "juno1m6uc8tqprqmde9w3zz4tta5g7qjtk84lxd3d8kx48p6qf87t9tnqhw22vy",
  cw3ApTeam:              "juno1e24yglups708f4udtxj0fkgrf2r88prpse6nrmunc0gzyycvzl9svz00uu",
  accounts:               "juno1tesh9uuz60dxzh4cy0kvcunfavv4egptgr5e6l3h2cv6apjdmhfsydfklv",
  cw4GrpReviewTeam:       "juno1nqpd8dvgdc94fvytlxell09qv6xkswafjtq3c967p89gy683ccvskae63y",
  cw3ReviewTeam:          "juno19zkn0ch2nnctamtrkp8g5cr0p077lgyefrlehtya854ke050r0mqxxthd2",
  cw4GrpCharityReviewTeam:"",
  cw3CharityReviewTeam:   "",
  cw4GrpImpactReviewTeam: "",
  cw3ImpactReviewTeam:    "",
  halo_token:             "",
  gift_cards:             "juno138x649c22xxuark66pwwwwyya4xy4lkka4hcxgtfutclxakp5ltqv8dz9j",
  gov:                    "",
  airdrop:                "",
  loop_haloust_pair:      "",
  settingsController:     "juno1y9wec20gnat9chrapmlm7jwz6cytvr9jqfeny2h4kw32tqqd2kwq3ctkfu",
}

//prettier-ignore
const local: Contracts = {
  //change this according to your local juno contract uploads
  registrar:              "juno14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9skjuwg8",
  index_fund:             "juno1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrq68ev2p",
  cw4GrpApTeam:           "juno1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqzzdhr6",
  cw3ApTeam:              "juno1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgs44adts",
  accounts:               "juno1qwlgtx52gsdu7dtp0cekka5zehdl0uj3fhp9acg325fvgs8jdzks9z8n5r",
  cw4GrpCharityReviewTeam:"juno1kj8q8g2pmhnagmfepp9jh9g2mda7gzd0m5zdq0s08ulvac8ck4dqhnemjt",
  cw3CharityReviewTeam:   "juno1fyr2mptjswz4w6xmgnpgm93x0q4s4wdl6srv3rtz3utc4f6fmxeql2yarc",
  cw4GrpImpactReviewTeam: "juno1m7gwjd4slsnsh6l7c36g7n5c5nhqewfr9lsx6hf2w48wftcm3qssfxdswq",
  cw3ImpactReviewTeam:    "juno1dullel90lmwxkf5djwvqzqq4rcqwfh92x3ymnv3jpv7ey6tm8scq3pw3wy",
  "cw4GrpReviewTeam":     "",
  "cw3ReviewTeam":        "",
  halo_token:             "",
  gift_cards:             "",
  gov:                    "",
  airdrop:                "",
  loop_haloust_pair:      "",
  settingsController:     "",
};

export const contracts: Contracts =
  NETWORK === "LOCAL" ? local : NETWORK === "TESTNET" ? testnet : mainnet;
