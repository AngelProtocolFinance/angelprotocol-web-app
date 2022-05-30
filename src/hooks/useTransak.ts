import transakSDK from "@transak/transak-sdk";
import { Receiver, TxLogPayload } from "types/server/aws";
import { useSetter } from "store/accessors";
import { sendDonationLog } from "slices/transaction/transactors/sendDonationLog";
import { ap_wallets } from "constants/ap_wallets";

const isDevelopment = process.env.NODE_ENV === "development";
const apiKey = isDevelopment
  ? process.env.REACT_APP_TRANSAK_API_KEY_STAGING
  : process.env.REACT_APP_TRANSAK_API_KEY_PRODUCTION;

const env = isDevelopment ? "STAGING" : "PRODUCTION";
let transak = new transakSDK({
  apiKey: apiKey,
  environment: env,
  cryptoCurrencyCode: "AVAX",
  network: "AVAXCCHAIN",
  walletAddress: ap_wallets.eth,
  hostURL: window.location.origin,

  //widget look
  widgetHeight: "70vh",
  widgetWidth: "70vmin",
  hideMenu: true,
  isFeeCalculationHidden: true,
  disableWalletAddressForm: true,
  // isDisableCrypto: true, //don't show anything crypto related
  exchangeScreenTitle: "Donate to Angel Protocol",
  themeColor: "#3FA9F5", //angel-blue
});

export default function useTransak(receiver: Receiver) {
  //receiver can't be charity and fundId at the same time

  const dispatch = useSetter();
  function initTransak() {
    transak.init();

    //widget closed
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
    });

    //runs when order is created, order completed
    transak.on(
      transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
      (eventPayload: EventPayload) => {
        if (eventPayload.status.status === "PROCESSING") {
          const logDonationPayload: TxLogPayload = {
            ...receiver,
            transactionId: eventPayload.status.id,
            transactionDate: eventPayload.status.createdAt,
            chainId: isDevelopment ? "bombay-12" : "columbus-5",
            amount: eventPayload.status.cryptoAmount,
            fiatRamp: "transak",
            paymentMethod: eventPayload.status.paymentOptionId,
            denomination: eventPayload.status.cryptoCurrency, //change to eventPayload
            splitLiq: "0", //default: transak widget can't be modified to accept meta fields
          };

          dispatch(sendDonationLog(logDonationPayload));
        }
      }
    );
  }

  return { initTransak };
}

interface EventPayload {
  status: {
    id: string; //order id "9af4c841-1702-4266-8d55-c822582435ec";
    walletAddress: string;
    createdAt: string; //"2022-04-19T09:56:05.282Z";
    paymentOptionId: string; //"credit_debit_card";
    //ORDER STATUSES
    //https://transak.gitbook.io/transak-docs/technical-details/tracking-user-kyc-and-order-status#order-statuses
    status: string; //"PROCESSING";
    cryptoCurrency: string; // "UST";
    cryptoAmount: number; //190.24;
  };
  //TRANSAK SDK Events
  //https://transak.gitbook.io/transak-docs/technical-details/tracking-javascript-sdk-widget-events
  eventName: string; // "TRANSAK_ORDER_SUCCESSFUL";
}
