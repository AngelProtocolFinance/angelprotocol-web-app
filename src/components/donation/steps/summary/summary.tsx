import { useRootData } from "hooks/use-root-data";
import { currency } from "../common/currency";
import { minFeeAllowance } from "../common/min-fee-allowance";
import SummaryContainer from "../common/summary";
import { token } from "../common/token";
import { useDonationState } from "../context";
import type { SummaryStep } from "../types";
import SummaryForm from "./summary-form";

export default function Summary(props: SummaryStep) {
  const user = useRootData();
  const { details, donor, honorary, tip, init, feeAllowance } = props;

  const { setState } = useDonationState();

  const [amount, Amount] = (() => {
    switch (details.method) {
      case "crypto": {
        return [
          +details.token.amount,
          token(details.token.rate, details.token.precision),
        ];
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
      onBack={() => {
        if (init.recipient.hide_bg_tip) {
          return setState({ ...props, step: "donate-form" });
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
        recipientName={init.recipient.name}
        recipientMembers={init.recipient.members}
        donor={
          donor || {
            first_name: user?.firstName ?? "",
            last_name: user?.lastName ?? "",
            email: user?.email ?? "",
            title: "",
            donor_public: true,
          }
        }
        honorary={honorary}
        onSubmit={({
          with_honorary,
          honorary_fullname,
          with_tribute_notif,
          tribute_notif,
          is_with_msg_to_npo,
          uk_tax_resident,
          cover_fee: fv_cover_fee,
          ...donor
        }) => {
          setState({
            ...props,
            step: "submit",
            donor,
            honorary: { honorary_fullname, tribute_notif },
            feeAllowance: fv_cover_fee
              ? minFeeAllowance(details, tip?.value ?? 0)
              : 0,
          });
        }}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
