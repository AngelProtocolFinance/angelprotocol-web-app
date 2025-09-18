import { useRootData } from "hooks/use-root-data";
import { currency } from "../common/currency";
import { min_fee_allowance } from "../common/min-fee-allowance";
import SummaryContainer from "../common/summary";
import { token } from "../common/token";
import { use_donation_state } from "../context";
import type { SummaryStep } from "../types";
import { SummaryForm } from "./summary-form";

export default function Summary(props: SummaryStep) {
  const user = useRootData();
  const { details, donor, tribute, tip, init, fee_allowance } = props;

  const { set_state } = use_donation_state();

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
        const { num_shares, symbol } = details;
        return [+num_shares, currency({ code: symbol, rate: 0, min: 0 })];
      }
      default:
        return [+details.amount, currency(details.currency)];
    }
  })();

  return (
    <SummaryContainer
      // fee_allowance : don't show fee allowance as it's being set in this step
      program={details.program}
      frequency={details.method === "stripe" ? details.frequency : "one-time"}
      classes="grid content-start p-4 @md/steps:p-8"
      Amount={Amount}
      amount={amount}
      on_back={() => {
        if (init.recipient.hide_bg_tip) {
          return set_state({ ...props, step: "donate-form" });
        }

        return set_state({ ...props, step: "tip" });
      }}
      tip={
        tip
          ? {
              value: tip.value,
              charity_name: init.recipient.name,
            }
          : undefined
      }
    >
      <SummaryForm
        method={details.method}
        mode={init.mode}
        coverFee={!!fee_allowance}
        recipientName={init.recipient.name}
        recipientMembers={init.recipient.members}
        donor={
          donor || {
            first_name: user?.firstName ?? "",
            last_name: user?.lastName ?? "",
            email: user?.email ?? "",
            title: "",
            is_public: true,
          }
        }
        tribute={tribute}
        onSubmit={({
          with_tribute,
          tribute,
          with_tribute_notif,
          is_with_msg_to_npo,
          cover_fee: fv_cover_fee,
          ...donor
        }) => {
          set_state({
            ...props,
            step: "submit",
            donor,
            tribute,
            fee_allowance: fv_cover_fee
              ? min_fee_allowance(details, tip?.value ?? 0)
              : 0,
          });
        }}
        classes="mt-6"
      />
    </SummaryContainer>
  );
}
