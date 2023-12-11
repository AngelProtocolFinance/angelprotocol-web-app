import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import LoaderRing from "components/LoaderRing";
import { PAYPAL_CLIENT_ID } from "constants/env";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: PAYPAL_CLIENT_ID,
  commit: true,
  currency: "USD",
  enableFunding: "card,paylater,venmo",
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
