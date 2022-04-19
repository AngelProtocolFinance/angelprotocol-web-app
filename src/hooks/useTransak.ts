import transakSDK from "@transak/transak-sdk";
import { ap_wallets } from "constants/ap_wallets";
import { currency_text, denoms } from "constants/currency";

const isDevelopment = process.env.NODE_ENV === "development";
const apiKey = isDevelopment
  ? process.env.REACT_APP_TRANSAK_API_KEY_STAGING
  : process.env.REACT_APP_TRANSAK_API_KEY_PRODUCTION;

const env = isDevelopment ? "STAGING" : "PRODUCTION";
let transak = new transakSDK({
  apiKey: apiKey,
  environment: env,
  cryptoCurrencyCode: currency_text[denoms.uusd],
  network: "terra", //on staging environment, this will automatically be on bombay-12
  walletAddress: ap_wallets[denoms.uusd],
  hostURL: window.location.origin,

  //widget look
  widgetHeight: "70vh",
  widgetWidth: "70vmin",
  hideMenu: true,
  isFeeCalculationHidden: true,
  disableWalletAddressForm: true,
  isDisableCrypto: true, //don't show anything crypto related
  exchangeScreenTitle: "Donate to Angel Protocol",
  themeColor: "#3FA9F5", //angel-blue
});

export default function useTransak() {
  function initTransak() {
    transak.init();
    //order created
    //widget closed
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
    });
  }

  return { initTransak };
}
