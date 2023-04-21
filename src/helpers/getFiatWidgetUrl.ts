import { NetworkType } from "types/lists";
import { IS_TEST } from "constants/env";
import { MELD_ACCESS_TOKEN } from "constants/fiatTransactions";
import { APIs } from "constants/urls";

const network: NetworkType = IS_TEST ? "testnet" : "mainnet";

export const getFiatWidgetUrl = async (payload: any) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `BASIC ${MELD_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    `${APIs.apes}/v1/fiat/meld-widget-proxy/${network}`,
    options
  );

  return response.json();
};
