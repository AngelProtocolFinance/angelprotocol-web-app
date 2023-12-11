import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: "sb",
  commit: true,
  currency: "USD",
  enableFunding: "card,paylater,venmo",
  dataSdkIntegrationSource: "integrationbuilder_sc",
};

export default function PayPal() {
  return (
    <div className="grid place-items-center min-h-[16rem]">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>
    </div>
  );
}
