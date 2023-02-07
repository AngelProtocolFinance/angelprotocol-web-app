import { chainIds, chains } from "./chains";
import { JUNO_LCD_OVERRIDE } from "./env";

export const APIs = {
  aws: "https://kpnxz5rzo2.execute-api.us-east-1.amazonaws.com",
  apes: "https://fctqkloitc.execute-api.us-east-1.amazonaws.com",
  flipside: "https://flipside.leslug.com/angel",
};
export const WC_BRIDGE = "https://bridge.walletconnect.org";

export const FEEDBACK =
  "https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37";
export const LITEPAPER =
  "https://angelprotocol.io/docs/litepaper-introduction/";
export const PRIVACY_POLICY = "https://angelprotocol.io/privacy-policy/";
export const SUPPORT =
  "https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37";

export const TERMS_OF_USE = "https://angelprotocol.io/terms-of-use";

export const JUNO_LCD = JUNO_LCD_OVERRIDE || chains[chainIds.juno].lcd;
