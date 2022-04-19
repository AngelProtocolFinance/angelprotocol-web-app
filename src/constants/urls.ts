import { chainIDs } from "types/chainIDs";

export const aws_endpoint =
  "https://mu2d2e0oj0.execute-api.us-east-1.amazonaws.com";
export const apes_endpoint =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com";

//terra urls
export const terra_lcds: URL_GROUP = {
  [chainIDs.testnet]:
    "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/terra/lcd/test",
  [chainIDs.mainnet]:
    "https://59vigz9r91.execute-api.us-east-1.amazonaws.com/terra/lcd/main",
  [chainIDs.localterra]: "http://localhost:3060",
};

export const terra_rpcs: URL_GROUP = {
  [chainIDs.testnet]:
    "https://bombay-12--rcp--full.datahub.figment.io/apikey/1ddd68fdcf80475836f8f815095d34c6",
  [chainIDs.mainnet]:
    "https://columbus-5--rpc--full.datahub.figment.io/apikey/1ddd68fdcf80475836f8f815095d34c6",
  [chainIDs.localterra]: "",
};

//cosmos urls
export const cosmos4_lcds: URL_GROUP = {
  [chainIDs.cosmos_4]:
    "https://cosmoshub-4--lcd--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
  [chainIDs.cosmos_test]: "https://api.testnet.cosmos.network:443",
};

export const cosmos4_rpcs: URL_GROUP = {
  [chainIDs.cosmos_4]:
    "https://cosmoshub-4--rpc--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
  [chainIDs.cosmos_test]:
    "https://cosmoshub-4--lcd--full.datahub.figment.io/apikey/afe639fa07917ec085c0ce737ab39e67",
};

//ethereum
export const eth_rpcs: URL_GROUP = {
  [chainIDs.eth_main]:
    "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
  [chainIDs.eth_ropsten]:
    "https://ropsten.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
  [chainIDs.eth_kovan]:
    "https://kovan.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
};

export const TERRA_FINDER = "https://terrascope.info/";

type URL_GROUP = {
  [index: string]: string;
};
