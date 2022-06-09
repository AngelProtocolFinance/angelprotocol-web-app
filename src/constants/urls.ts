import { chainIDs } from "constants/chainIDs";

export const aws_endpoint =
  "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com";
export const apes_endpoint =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com";

//terra urls
export const terra_lcds: URL_GROUP = {
  [chainIDs.terra_classic]:
    "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/terra/lcd/main",
  //when wallet is not connected network === phoenix-1
  //query classis endpoint when wallet is not connected
  [chainIDs.terra_main]:
    "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/terra/lcd/main",
  //
  [chainIDs.terra_test]: "https://pisco-lcd.terra.dev",
};

export const TERRA_FINDER = "https://finder.terra.money/";

type URL_GROUP = {
  [index: string]: string;
};
