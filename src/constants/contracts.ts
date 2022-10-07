import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "accounts"
  | "cw3ApTeam"
  | "cw4GrpApTeam"
  | "cw3ReviewTeam"
  | "cw4GrpReviewTeam"
  | "halo_token"
  | "gov"
  | "airdrop"
  | "loop_haloust_pair";

type Contracts = {
  [key in SC]: string;
};

export const contracts: Contracts = IS_TEST
  ? {
      //TESTNET CONTRACTS
      //core
      index_fund:
        "juno1xqv6xn0jzccdfe8rd7ma9jepqmfmwq95ul4vm3x3dwewwyxlvx8sk6hsgw",
      registrar:
        "juno1kcz4zrkv3pn6q8gguzdvaqwlu2wqfflekmwr66ackdqrc3d44mxq6u0u23",
      accounts:
        "juno1wfp7cxyrql4yn2usjl9rhchnhwtd0z84z9zrdz8ltgsxyv6gypmqgkpc6a",

      // Admin
      cw3ApTeam:
        "juno1h7xxnfqtxhduj3gk86pjxk5qchmdtmg44r822u0s2d427ndm699qsg5tpu",
      cw4GrpApTeam:
        "juno1npdhl2fqcn73f7ps6e3az3zlrnkrqmjm95zm8g7h4vfef74snkwqc45jxa",
      cw3ReviewTeam:
        "juno14l0pph9fcqn2muvwxhh6dwh59umvc4c0egv0nv6z78wl0aj53rrs4hftwr",
      cw4GrpReviewTeam:
        "juno1gc8d69t05azccdrwx5jkvln2tvhafn5l6p828jjm30flndk6h56q53e3r2",

      //terraswap
      halo_token: "",

      //halo
      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    }
  : {
      //MAINNET CONTRACTS
      //core
      index_fund:
        "juno1yrahlxavwr7juyrty580d24mgvmhknn6h3sgepjtkyg7udvj2l2sujdlqn",
      registrar:
        "juno17emcut72n6ycmf54qd0l4mzsefqxnqdhqxzlczxstlkkatdlst5qf9s3qr",
      accounts:
        "juno1e0w8892n60v0juuugvwptj8f6v3ad56ydr3cgxstmpkggjrqzfhsaqh38c",

      // Admin
      cw3ApTeam:
        "juno1sae4p8crnac0h9m27psn205d6k586f7cnm4eshws623v05g95teqvj2s8q",
      cw4GrpApTeam:
        "juno15g9u395kprfhxxzfqhfw56rvwfhjzg8k6mjq82u3yg7fxkhprv8stsu8mm",
      cw3ReviewTeam:
        "juno1vp2q50smgzw64xm2j2ksntej34pnnedaz4qkwdh8zah9kjcaas6s8g92t8",
      cw4GrpReviewTeam:
        "juno1a22f8dxevu3er7vs4lkrca9n8rgf8uvgjd8s2p5eq787vmczq59syuplqx",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
