import { chains } from "constants/chains";
import {
  useLazyCreateCryptoIntentQuery,
  useLazyStripePaymentIntentQuery,
} from "services/apes";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { Donor } from "types/aws";
import { useDonationState } from "../Context";
import ContinueBtn from "../common/ContinueBtn";
import { currency } from "../common/Currency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import type { SummaryStep } from "../types";
import DonorForm from "./DonorForm";

export default function Summary(props: SummaryStep) {
  const { details, liquidSplitPct, donor, tip, init } = props;
  const { setState } = useDonationState();
  const user = useGetter((state) => state.auth.user);
  const [cryptoIntent, { isLoading: isCreatingCryptoIntent }] =
    useLazyCreateCryptoIntentQuery();
  const [getStripeIntent, { isLoading: isCreatingStripeIntent }] =
    useLazyStripePaymentIntentQuery();

  type IntentCreator = (donor: Donor) => Promise<string>;
  const [amount, Amount, intentId] = (() => {
    switch (details.method) {
      case "crypto": {
        const intent: IntentCreator = (donor) =>
          cryptoIntent(
            {
              amount: +details.token.amount,
              tipAmount: tip?.value ?? 0,
              chainId: details.chainId.value,
              chainName: chains[details.chainId.value].name,
              denomination: details.token.symbol,
              splitLiq: liquidSplitPct,
              endowmentId: init.recipient.id,
              source: init.widgetConfig ? "bg-widget" : "bg-marketplace",
              donor,
            },
            true
          )
            .unwrap()
            .then((res) => res.transactionId);

        return [
          +details.token.amount,
          token(details.token.coingecko_denom),
          intent,
        ];
      }

      case "stripe": {
        const intent: IntentCreator = (donor: Donor) =>
          getStripeIntent(
            {
              type: details.frequency,
              amount: +details.amount,
              tipAmount: tip?.value ?? 0,
              currency: details.currency.code,
              endowmentId: init.recipient.id,
              splitLiq: liquidSplitPct,
              source: init.widgetConfig ? "bg-widget" : "bg-marketplace",
              donor,
            },
            true
          ).unwrap();
        return [+details.amount, currency(details.currency), intent];
      }
      //stocks skips summary (straight to submit), as donor info is not saved in DB
      case "stocks": {
        const { numShares, symbol } = details;
        return [numShares, currency({ code: symbol, rate: null })];
      }

      default:
        return [+details.amount, currency(details.currency)];
    }
  })();

  async function createIntent(donor: Donor) {
    setState({
      ...props,
      step: "submit",
      donor,
      intentId: intentId ? await intentId(donor) : "not used intent",
    });
  }

  const isCreatingIntent = isCreatingCryptoIntent || isCreatingStripeIntent;
  const isContinueDisabled = isCreatingIntent || props.init.mode === "preview";

  return (
    <SummaryContainer
      frequency={details.method === "stripe" ? details.frequency : "one-time"}
      classes="grid content-start p-4 @md/steps:p-8"
      Amount={Amount}
      amount={amount}
      splitLiq={liquidSplitPct}
      onBack={() =>
        init.recipient.hide_bg_tip
          ? setState({ ...props, step: "splits" })
          : setState({ ...props, step: "tip" })
      }
      tip={
        tip
          ? {
              value: tip.value,
              charityName: init.recipient.name,
            }
          : undefined
      }
    >
      <DonorForm
        submitBtn={
          <ContinueBtn
            disabled={isContinueDisabled}
            isLoading={isCreatingIntent}
            type="submit"
            className="px-4 col-span-full"
            text="Checkout"
          />
        }
        donor={
          donor ||
          (userIsSignedIn(user)
            ? {
                lastName: user.lastName ?? "",
                firstName: user.firstName ?? "",
                email: user.email,
              }
            : undefined)
        }
        onSubmit={createIntent}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
