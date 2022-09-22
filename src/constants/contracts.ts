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
        "juno16rz2d0n4sjuwlzwgwxn3xuk7zarr2u2css3v5qy6azc9f002tgrqhekful",
      registrar:
        "juno19vfquz8hz0dp773ct9q39anqghw7lzqpdzafwcqjl0c7tn5mz0vqmvww28",
      accounts:
        "juno1wj0dak9qwv6jtay0knldyupg7a56m2awpezyh8u407v66la5q9tqt345ng",

      // Admin
      cw3ApTeam:
        "juno1qur3fztscxwutxpl2xk3gsmy442gqneskj95q8zpmvmvd7zam96sxdq55k",
      cw4GrpApTeam:
        "juno1lr0jcep4ckr7fwcteu9jgndj4nycstksajy2fjy3ap4n2usc67ss7tqsep",

      cw3ReviewTeam:
        "juno1wtkvj07sxk8wa2sjsvaneym8ly5nzhvzdwwukelmf4ywklqdy96qlhllvt",
      cw4GrpReviewTeam:
        "juno1qf6jqdr633ry7e52hq9kels98vlzxh2lt983w79qafvdzse3dk6s6zecnw",

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
      cw3ApTeam: "",
      cw4GrpApTeam: "",
      cw3ReviewTeam: "",
      cw4GrpReviewTeam: "",

      //terraswap
      halo_token: "",

      gov: "",
      airdrop: "",

      //loop
      loop_haloust_pair: "",
    };
