import transakSDK from "@transak/transak-sdk";
import { ap_wallets } from "constants/ap_wallets";
import { currency_text, denoms } from "constants/currency";

const isDevelopment = process.env.NODE_ENV === "development";
const apiKey = isDevelopment
  ? process.env.REACT_APP_TRANSAK_API_KEY_STAGING
  : process.env.REACT_APP_TRANSAK_API_KEY_PRODUCTION;

const env = isDevelopment ? "STAGING" : "PRODUCTION";

export default function useTransak() {
  function initTransak() {
    let transak = new transakSDK({
      apiKey: apiKey, // Your API Key (Required)
      environment: env, // STAGING/PRODUCTION (Required)
      cryptoCurrencyCode: currency_text[denoms.uusd],
      network: "terra",
      walletAddress: ap_wallets[denoms.uusd],
      hostURL: window.location.origin,
      widgetHeight: "550px",
      widgetWidth: "450px",
    });

    console.log(transak);
    transak.init();
    // To get all the events
    transak.on(transak.ALL_EVENTS, () => {});

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, () => {
      transak.close();
    });
  }

  return { initTransak };
}
