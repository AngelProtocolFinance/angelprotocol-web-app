import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { useDonationState } from "../Context";
import { currency } from "../common/Currency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import { initDonorTitleOption } from "../common/constants";
import type { SummaryStep } from "../types";
import SummaryForm from "./SummaryForm";

export default function Summary(props: SummaryStep) {
  const { details, liquidSplitPct, donor, honorary, tip, init, coverFee } =
    props;

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
      onBack={() => {
        if (init.recipient.hide_bg_tip) {
          if (init.config?.splitDisabled) {
            return setState({ ...props, step: "donate-form" });
          }
          return setState({ ...props, step: "splits" });
        }
        return setState({ ...props, step: "tip" });
      }}
      tip={
        tip
          ? {
              value: tip.value,
              charityName: init.recipient.name,
            }
          : undefined
      }
    >
      <SummaryForm
        method={details.method}
        mode={init.mode}
        coverFee={tip && tip.value > 0 ? "tipped" : coverFee ?? false}
        nonprofitName={init.recipient.name}
        donor={
          donor || {
            lastName: userIsSignedIn(user) ? user.lastName ?? "" : "",
            firstName: userIsSignedIn(user) ? user.firstName ?? "" : "",
            email: userIsSignedIn(user) ? user.email : "",
            ukTaxResident: false,
            title: initDonorTitleOption,
            zipCode: "",
            streetAddress: "",
          }
        }
        honorary={
          honorary || {
            withHonorary: false,
            honoraryFullName: "",
          }
        }
        onSubmit={({
          withHonorary,
          honoraryFullName,
          coverFee: fvCoverFee,
          ...donor
        }) => {
          setState({
            ...props,
            step: "submit",
            donor,
            honorary: { withHonorary, honoraryFullName },
            coverFee: fvCoverFee,
          });
        }}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
