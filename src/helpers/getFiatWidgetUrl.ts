import { TokenWithAmount } from "types/slices";
import { ap_wallets } from "constants/ap_wallets";
import {
  DESTINATION_CURRENCY_CODE,
  MELD_ACCESS_TOKEN,
  SERVICE_PROVIDER,
} from "constants/fiatTransactions";

export const getFiatWidgetUrl = async (
  token: TokenWithAmount,
  address: string
) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `BASIC ${MELD_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      sessionData: {
        lockFields: ["cryptoCurrency", "walletAddress"],
        countryCode: "US",
        destinationCurrencyCode: DESTINATION_CURRENCY_CODE,
        serviceProvider: SERVICE_PROVIDER,
        sourceAmount: token.amount,
        sourceCurrencyCode: token.symbol,
        walletAddress: ap_wallets.eth,
      },
      customerId: address,
    }),
  };

  const response = await fetch(
    "https://api-sb.meld.io/crypto/session/widget",
    options
  );

  return response.json();
};
