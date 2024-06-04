import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { useDonationState } from "../Context";
import { currency } from "../common/Currency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import type { SummaryStep } from "../types";
import DonorForm from "./DonorForm";

export default function Summary(props: SummaryStep) {
  const { details, liquidSplitPct, donor, tip, init } = props;
  const { setState } = useDonationState();
  const user = useGetter((state) => state.auth.user);

  const [amount, Amount] = (() => {
    switch (details.method) {
      case "crypto": {
        return [+details.token.amount, token(details.token.coingecko_denom)];
      }
      //stocks skips summary (straight to submit), as donor info is not saved in DB
      case "stocks": {
        const { numShares, symbol } = details;
        return [+numShares, currency({ code: symbol, rate: null })];
      }
      default:
        return [+details.amount, currency(details.currency)];
    }
  })();

  return (
    <SummaryContainer
      frequency={details.method === "stripe" ? details.frequency : "one-time"}
      classes="grid content-start p-4 @md/steps:p-8"
      Amount={Amount}
      amount={amount}
      splitLiq={liquidSplitPct}
      onBack={() =>
        setState({
          ...props,
          step: init.recipient.hide_bg_tip
            ? init.config?.splitDisabled
              ? "donate-form"
              : "splits"
            : "tip",
        })
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
        mode={init.mode}
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
        onSubmit={(donor) => setState({ ...props, step: "submit", donor })}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
