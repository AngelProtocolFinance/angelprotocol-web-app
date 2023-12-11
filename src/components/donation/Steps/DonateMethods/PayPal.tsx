import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import LoaderRing from "components/LoaderRing";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: "sb",
  commit: true,
  currency: "USD",
  enableFunding: "card,paylater,venmo",
  dataSdkIntegrationSource: "integrationbuilder_sc",
};

export default function PayPal() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Content />
    </PayPalScriptProvider>
  );
}

function Content() {
  const [{ isPending }] = usePayPalScriptReducer();
  return (
    <div className="grid place-items-center min-h-[16rem]">
      {isPending && <LoaderRing thickness={10} classes="w-8" />}
      <PayPalButtons />
    </div>
  );
}
