import { BASE_URL, INFURA_ID, IS_TEST } from "./env";

export const APIs = {
  aws: "https://kpnxz5rzo2.execute-api.us-east-1.amazonaws.com",
  apes: "https://fctqkloitc.execute-api.us-east-1.amazonaws.com",
  flipside: "https://flipside.leslug.com/angel",
};
export const WC_BRIDGE = "https://bridge.walletconnect.org";

export const LITEPAPER = `${BASE_URL}/docs/litepaper-introduction/`;
export const PRIVACY_POLICY = `${BASE_URL}/privacy-policy/`;

export const TERMS_OF_USE = `${BASE_URL}/terms-of-use-npo/`;

export const POLYGON_RPC = IS_TEST
  ? `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`
  : `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`;

export const GRAPHQL_ENDPOINT = IS_TEST
  ? "https://api.studio.thegraph.com/query/49156/angel-giving/v0.0.49"
  : `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_SUBGRAPH_API_KEY}/subgraphs/id/Gxn2c4EreorowwD3VZeenNS1RrXATh14P3uyUmvuvPwi`;
