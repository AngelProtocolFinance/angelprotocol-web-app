import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import { useDonationState } from "../Context";
import { currency } from "../common/Currency";
import SummaryContainer from "../common/Summary";
import { token } from "../common/Token";
import { initDonorTitleOption, initTributeNotif } from "../common/constants";
import type { SummaryStep } from "../types";
import SummaryForm from "./SummaryForm";
import { processingFee } from "./helpers";

export default function Summary(props: SummaryStep) {
  const { details, liquidSplitPct, donor, honorary, tip, init, feeAllowance } =
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
      // feeAllowance : don't show fee allowance as it's being set in this step
      program={details.program}
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
        coverFee={!!feeAllowance}
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
            withTributeNotif: false,
            tributeNotif: initTributeNotif,
          }
        }
        onSubmit={({
          withHonorary,
          honoraryFullName,
          coverFee: fvCoverFee,
          withTributeNotif,
          tributeNotif,
          ...donor
        }) => {
          setState({
            ...props,
            step: "submit",
            donor,
            honorary: {
              withHonorary,
              honoraryFullName,
              withTributeNotif,
              tributeNotif,
            },
            feeAllowance: fvCoverFee ? processingFee(details) : 0,
          });
        }}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
