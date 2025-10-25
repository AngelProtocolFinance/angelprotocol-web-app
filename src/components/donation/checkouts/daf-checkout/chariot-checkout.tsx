import { ContentLoader } from "components/content-loader";
import { ErrorBoundaryClass } from "components/error";
import { type IPrompt, Prompt } from "components/prompt";
import { PROCESSING_RATES } from "constants/common";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { min_fee_allowance } from "helpers/donation";
import { error_prompt } from "helpers/error-prompt";
import { useState } from "react";
import ChariotConnect from "react-chariot-connect";
import { href, useNavigate } from "react-router";
import type { DonationIntent } from "types/donation-intent";
import { donor_address } from "types/donation-intent";
import { safeParse } from "valibot";
import { currency } from "../../common/currency";
import { Summary } from "../../common/summary";
import { use_donation } from "../../context";
import {
  type DafDonationDetails,
  back_to_form,
  tip_from_val,
  tip_val,
} from "../../types";
import { DonationTerms } from "../donation-terms";
import { to_platform_values } from "./to-platform-values";
import { usd_option } from "components/donation/common/constants";

interface GrantMetadata {
  /** includes tip and fee_allowance */
  amount: number;
  tip: number;
  fee_allowance: number;
}

export function ChariotCheckout(props: DafDonationDetails) {
  const { don_set, don } = use_donation();
  const [prompt, set_prompt] = useState<IPrompt>();
  const [grant_state, set_grant_state] = useState<"pending">();
  const navigate = useNavigate();

  const tipv = tip_val(props.tip_format, props.tip, +props.amount);
  const mfa = props.cover_processing_fee
    ? min_fee_allowance(tipv + +props.amount, PROCESSING_RATES.chariot)
    : 0;

  return (
    <Summary
      classes="group grid content-start p-4 @md/steps:p-8 [&_#connectContainer]:mt-8"
      on_back={() => back_to_form("daf", props, don_set)}
      Amount={currency(usd_option)}
      amount={+props.amount}
      fee_allowance={mfa}
      frequency="one-time"
      tip={tipv ? { value: tipv, charity_name: don.recipient.name } : undefined}
    >
      <ErrorBoundaryClass>
        <ChariotConnect
          theme="LightBlueTheme"
          disabled={grant_state === "pending"}
          cid={CHARIOT_CONNECT_ID}
          // https://givechariot.readme.io/reference/integrating-connect#pre-populate-data-into-your-connect-session
          onDonationRequest={async () => {
            const total = +props.amount + tipv + mfa;
            const total_cents = Math.floor(total) * 100;
            const metadata: GrantMetadata = {
              amount: +props.amount + tipv + mfa,
              tip: tipv,
              fee_allowance: mfa,
            };

            return {
              amount: total_cents,
              metadata,
            };
          }}
          // see https://givechariot.readme.io/reference/integrating-connect#capture-your-grant-intent
          onSuccess={async (ev) => {
            try {
              set_prompt({
                type: "loading",
                children: "Processing payment",
                isDismissable: false,
              });

              const {
                grantIntent,
                workflowSessionId,
                user: grantor,
              } = ev.detail;
              const meta: GrantMetadata = grantIntent.metadata;
              /** user may input amount different from our donate form */
              const grant_amount: number = grantIntent.amount / 100;

              const adj = to_platform_values(grant_amount, meta);

              //reflect adjustment to state
              don_set((x) => ({
                ...x,
                method: "daf",
                daf: {
                  type: "daf",
                  step: "checkout",
                  fv: { ...props, ...tip_from_val(adj.tip, adj.amount) },
                },
              }));

              const { postalCode, line1, line2, city, state } = grantor.address;

              const addr = safeParse(donor_address, {
                street: [line1, line2].filter(Boolean).join(", "),
                city,
                state,
                country: "n/a",
                zip_code: postalCode,
              });

              const intent: DonationIntent = {
                frequency: "one-time",
                via_id: workflowSessionId,
                via_name: "",
                amount: { currency: usd_option.code, ...adj },
                recipient: state.init.recipient.id,
                donor: {
                  title: "",
                  email: grantor.email,
                  first_name: grantor.firstName,
                  last_name: grantor.lastName,
                  company_name: "",
                  address: addr.issues ? undefined : addr.output,
                },
                source: state.init.source,
              };

              if (state.init.program) intent.program = state.init.program;

              set_grant_state("pending");
              const res = await fetch("/api/donation-intents/chariot", {
                method: "POST",
                body: JSON.stringify(intent),
              });
              if (!res.ok) throw await res.text();
              const { id } = await res.json();

              set_prompt(undefined);

              const to =
                state.init.source === "bg-widget"
                  ? href("/donate-widget/donations/:id", { id })
                  : href("/donations/:id", { id });

              navigate(to);
            } catch (err) {
              set_prompt(error_prompt(err, { context: "processing donation" }));
            } finally {
              set_grant_state(undefined);
            }
          }}
        />
      </ErrorBoundaryClass>
      <ContentLoader className="h-12 mt-4 block group-has-[chariot-connect]:hidden" />
      <DonationTerms
        endowName={don.recipient.name}
        classes="border-t border-gray-l3 mt-5 pt-4 "
      />
      {prompt && <Prompt {...prompt} onClose={() => set_prompt(undefined)} />}
    </Summary>
  );
}
