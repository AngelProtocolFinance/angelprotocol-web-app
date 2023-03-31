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
  registrar:              "juno1cgmrq76kx0nh764gumq0r9xa99ec0krvs5y86xqmp8csttc7pwnqh9ftf7",
  index_fund:             "juno1ueexvz5hspl8se5448dylq9zpm0fp65qx6g20slj7vuhkeh6yxgqv5x9j6",
  cw4GrpApTeam:           "juno1sj057c5ufqgqjh66y0dgfhvjl6xw2jd96l3lm99fz0pym86uaj9sl62dxn",
  cw3ApTeam:              "juno17jz7gpzxnrp42q8rt0ultku0205uxye6mq2cwpnvertaqwvcy5dq3q6kdm",
  accounts:               "juno1kkzhj4m73p6yylev6ycy6dkneddqy88e5t0kdtla9h0wnnlq3g0q4wmcm4",
  cw4GrpReviewTeam:       "juno1xwlmdadkrw960fzzl9tqe2u46hxeu44xjyu76zhk343re05x85fqzpnkx3",
  cw3ReviewTeam:          "juno10kvhxyq56j4tjs8dm8r7yhd0f8ct5hjyrrga0cd6kjqwatej07jqc09fqn",
  cw4GrpCharityReviewTeam:"",
  cw3CharityReviewTeam:   "",
  cw4GrpImpactReviewTeam: "",
  cw3ImpactReviewTeam:    "",
  halo_token:             "",
  gift_cards:             "juno1zfjggfdjadcgd4f2jugw440vfdecf5erqfy0ts9f5v9yucmu99rqdsy6j6",
  gov:                    "",
  airdrop:                "",
  loop_haloust_pair:      "",
  settingsController:     "juno1aztgl4v5nnrewnqqlqg9yvwv4s7gtssql9gzvshlyhgt9w80z3aqx5gnvp",
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

export const polygonContracts = {
  INFO: "ALL ADDRESS ARE MENTIONED INTO THIS FILE",
  libraries: {
    STRING_LIBRARY: "0x57D47BE8eCd58A506292b5Ebd3bFba5E3F41F63f",
    ANGEL_CORE_STRUCT_LIBRARY: "0x5FD2a6cE261c6131Ca479Fb04A7cE9AEBCB53FB9",
  },
  multiSig: {
    ApplicationsMultiSigProxy: "0x1edC050B5d84cbB0cA0b56356f3F7307efcd50Fb",
    APTeamMultiSigProxy: "0xC26Ac43b14ebCbff5029792052aF3e4DF3233902",
    ApplicationMultisigImplementation:
      "0x4bCbb6eec52d710e0f699Fe5f4D4920E0627B6C1",
    APTeamMultisigImplementation: "0x308AD7B20A0070D848a551E70C7C47d0e9673DA3",
  },
  charityApplication: {
    CharityApplicationProxy: "0x8ead0CF0f28a0dF2de0Ac7cFEB1b48dB20619cD7",
    CharityApplicationImplementation:
      "0x89831907835e537Be7818b692482B39815C55FEB",
  },
  swapRouterAddress2: {
    swapRouterProxy: "0x89831907835e537Be7818b692482B39815C55FEB",
    swapRouterImplementation: "0xDfE663881Dd23d4B0d32899fE43E6347F21fF41f",
  },
  indexFundAddress: {
    indexFundProxy: "0x89831907835e537Be7818b692482B39815C55FEB",
    indexFundImplementation: "0xDfE663881Dd23d4B0d32899fE43E6347F21fF41f",
  },
  subDaoEmitter: {
    SubdaoEmitterProxyAddress: "0x89831907835e537Be7818b692482B39815C55FEB",
    SubdaoEmitterImplementationAddress:
      "0xDfE663881Dd23d4B0d32899fE43E6347F21fF41f",
  },
  HaloImplementations: {
    DonationMatchImplementation: "0xDfE663881Dd23d4B0d32899fE43E6347F21fF41f",
    DonationMatchAddress: {
      DonationMatchProxy: "0x8ead0CF0f28a0dF2de0Ac7cFEB1b48dB20619cD7",
      DonationMatchImplementation: "0x89831907835e537Be7818b692482B39815C55FEB",
    },
    SubDaoImplementation: "0x10618938dFD69dA98eB5f4112a4487fAC6b22ef7",
    subDaoERC20Implementation: "0x25E2c69e9775bA8d2c0a38b3212987123b8727eF",
    subDaoCurveTokenImplementation:
      "0xBdf1fFA5B0357744DE7517d98aDf8dC22c1eF373",
    IncentivisedVotingLockupImplementation:
      "0x0c7056652736A06d6D90f11B29176DEa7630f14C",
  },
  registrar: {
    registrarImplementation: "0xD0DF2E81A44A8d5191C4Aaba74B1fA6b1429F729",
    registrarProxy: "0xf9ae9FEb01B382C87d391F04a021fae312264CA7",
  },
  accounts: {
    diamond: "0xf725Ff6235D53dA06Acb4a70AA33206a1447D550",
  },
  EndowmentMultiSigAddress: {
    EndowmentMultiSigEmitterProxy: "0xC0c1d1659f88c0D0737069354b93874cBebfdfD7",
    EndowmentMultiSigEmitterImplementation:
      "0x6472BC08F58D989483665F8Da7999516Ec7dF489",
    MultiSigWalletFactory: "0x59802CEB7B8af8F0619A74Db0fC70e880ca9f47D",
    MultiSigWalletImplementation: "0x7D8F4C57582abBbfa977541d740908b983A39525",
  },
};
