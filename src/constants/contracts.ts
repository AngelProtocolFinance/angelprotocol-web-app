import { IS_TEST } from "./env";

type SC =
  | "index_fund"
  | "registrar"
  | "accounts"
  | "apCW4"
  | "apCW3"
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
        "juno19l9msl003n0zrnl3xsccr4ypvhxyamaqddv0fqh45lf0dwtyplxqef4xp8",
      registrar:
        "juno1ea06p4lms9ku2dca9vxnta28nwl5t0z7pr7e50jh0xhm4ujkp35szz7sae",
      accounts:
        "juno1mfqqu85m0mvc0ahsrz57c8d4x0x0teyq4jmfq92vuy8fgwv0uepq9uj0kr",

      // Admin
      apCW3: "juno1ttn32lntds7tk64fcy8ldz30t9frhy3uxg5lzak2ej0jd4md0szqda2nuc",
      apCW4: "juno1nmetyh7phu89rp8pl8rxdtyzkcan8tp90899er9jnqjf9pylzm8sypfqhq",

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
      index_fund: "",
      registrar: "",
      accounts: "",

      // Admin
      apCW3: "",
      apCW4: "",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
