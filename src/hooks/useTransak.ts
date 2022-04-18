import transakSDK from "@transak/transak-sdk";
import { ap_wallets } from "constants/ap_wallets";
import { chainIDs } from "constants/chainIDs";
import { currency_text, denoms } from "constants/currency";
import { useEffect } from "react";
import { Step } from "services/transaction/types";
import useTxUpdator from "services/transaction/updators";

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
  widgetHeight: "550px",
  widgetWidth: "450px",
  // hideMenu: true,
  isFeeCalculationHidden: true,
  disableWalletAddressForm: true,
  isDisableCrypto: true, //don't show anything crypto related
});

export default function useTransak() {
  const { updateTx } = useTxUpdator();

  function initTransak() {
    transak.init();
    //order created
    transak.on(transak.EVENTS.TRANSAK_ORDER_CREATED, () => {
      updateTx({ step: Step.submit, message: "Order is submitted" });
    });

    //order creation cancelled
    transak.on(transak.EVENTS.TRANSAK_ORDER_CANCELLED, () => {
      updateTx({ step: Step.error, message: "Order cancelled" });
    });

    //order created successfully
    //order is being processed
    //other order status
    transak.on(
      transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
      (orderEvent: OrderEvent) => {
        switch (orderEvent.status.status) {
          case "PROCESSING":
            updateTx({
              step: Step.submit,
              message: "Order is being processed",
            });
            break;
          case "CANCELLED":
            updateTx({
              step: Step.error,
              message: "Order processing cancelled",
            });
            break;
          case "EXPIRED":
            updateTx({
              step: Step.error,
              message: "Order processing expired",
            });
            break;
          case "FAILED":
            updateTx({
              step: Step.error,
              message: "Order processing failed",
            });
            break;
          case "COMPLETED":
            updateTx({
              step: Step.success,
              message: "Thank you for your donation!",
              txHash: orderEvent.status.transactionHash,
              chainId: isDevelopment ? chainIDs.testnet : chainIDs.mainnet,
              isReceiptEnabled: true,
            });
            break;
          default:
            updateTx({
              step: Step.error,
              message: "Something wen't wrong",
            });
        }
      }
    );

    //order creation failed
    transak.on(transak.EVENTS.TRANSAK_ORDER_FAILED, () => {
      updateTx({ step: Step.error, message: "Failed to created order" });
    });

    //widget closed
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
      transak.close();
    });
  }

  return { initTransak };
}

type OrderStatus =
  | "PROCESSING"
  | "COMPLETED"
  | "EXPIRED"
  | "FAILED"
  | "CANCELLED";

interface OrderEvent {
  status: {
    id: string; //"25f13c67-3228-430c-9ab3-e5c112aa969f";
    walletAddress: string; //"terra1gmxefcqt8sfckw0w44tpkuaz0p27eddq76elzx";
    createdAt: string; //"2022-04-18T14:41:18.824Z";
    status: OrderStatus;
    fiatCurrency: string; //"USD";
    userId: string; //"0650c419-e4e3-411c-b02f-87c1dcd4c752";
    cryptoCurrency: string; //"UST";
    network: string; // "terra";
    transactionHash: string; // NOTE: only available at orderStatus "COMPLETED"
    fiatAmountInUsd: number; //199.94;
  };
  eventName: string;
}
