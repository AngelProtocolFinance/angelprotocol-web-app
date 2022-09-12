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
        "juno1s3vz9nu049es0ev89zwcd7amv0an4cwd3t2krvy93qvdp7sqyu9qsn9ykl",
      registrar:
        "juno1vatmkkf406ylknexkdrzfqtjdmeye2pzgzr5j6d6fgymd09yc3kqld5pp6",
      accounts:
        "juno1t09v4r2h2y8tdwhz3v8rcl22cwxjjl9arjce2dmp8mgs6snqd49sxpenxr",

      // Admin
      cw3ApTeam:
        "juno1xe3xg8auwx6krqz88depem703lekl7ce2jmnyrfs7s6ze9pdp36smcth68",
      cw4GrpApTeam:
        "juno1jjjax430dzrgqdapsgp306dp5tanc7zq4uvrx7vmf6mgg00tkw8su6p6te",

      cw3ReviewTeam:
        "juno1mu2erhc5k6ucvpdzq0kum3dcwln9la4mpdfgm5psehl98pw67zcs7qysy6",
      cw4GrpReviewTeam:
        "juno17pjg8zpkddd6hcsyqpu3u6vk4rry3uumf0zz05saw7d5jjavqavqu5e6my",

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
