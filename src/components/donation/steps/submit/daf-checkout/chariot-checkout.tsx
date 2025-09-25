import { valibotResolver } from "@hookform/resolvers/valibot";
import { ContentLoader } from "components/content-loader";
import { ErrorBoundaryClass } from "components/error";
import { CheckField, Form } from "components/form";
import { type IPrompt, Prompt } from "components/prompt";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes } from "constants/routes";
import { error_prompt } from "helpers/error-prompt";
import { Eraser, PenToolIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import ChariotConnect from "react-chariot-connect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { DonationIntent } from "types/donation-intent";
import {
  donor,
  donor_address,
  donor_msg_to_npo_max_length,
  donor_public_msg_max_length,
  tribute,
} from "types/donation-intent";
import {
  type InferOutput,
  boolean,
  object,
  optional,
  pick,
  safeParse,
} from "valibot";
import { currency } from "../../common/currency";
import { min_fee_allowance } from "../../common/min-fee-allowance";
import { Summary } from "../../common/summary";
import { TributeFields } from "../../common/tribute-fields";
import { use_donation_state } from "../../context";
import type { DafCheckoutStep, Tribute } from "../../types";
import { DonationTerms } from "../donation-terms";
import { type AdjustedAmounts, toPlatformValues } from "./to-platform-values";

const chariot_donor = pick(donor, ["msg_to_npo", "public_msg", "is_public"]);

interface ChariotDonor extends InferOutput<typeof chariot_donor> {}

const schema = object({
  is_with_msg_to_npo: optional(boolean()),
  ...chariot_donor.entries,
  with_tribute: optional(boolean()),
  with_tribute_notif: optional(boolean()),
  tribute: optional(tribute),
  cover_fee: boolean(),
});

const default_fv = (
  cover_fee: boolean,
  tribute?: Tribute,
  donor?: ChariotDonor
): FV => {
  const fv: FV = {
    is_with_msg_to_npo: (donor?.public_msg?.length ?? 0) > 0,
    with_tribute: tribute != null,
    with_tribute_notif: tribute?.notif != null,
    cover_fee,
    ...donor,
    tribute,
  };
  return fv;
};

interface FV extends InferOutput<typeof schema> {}
interface GrantMetaData extends FV {
  _totalCents: number;
  _tip: number;
  _fee: number;
  _amount: number;
}

export function ChariotCheckout(props: DafCheckoutStep) {
  const { set_state } = use_donation_state();
  const [prompt, setPrompt] = useState<IPrompt>();
  const [grantState, setGrantState] = useState<"pending">();
  const navigate = useNavigate();

  const {
    watch,
    formState: { errors },
    register,
    trigger,
    getValues,
  } = useForm<FV>({
    defaultValues: default_fv(
      !!props.fee_allowance,
      props.tribute,
      props.donor
    ),
    resolver: valibotResolver(schema),
    shouldUnregister: true,
  });

  /** save actual grant amount and reflect in Summary form */
  const [adjusted, setAdjusted] = useState<AdjustedAmounts>();
  const [with_donor_msg, set_with_donor_msg] = useState(
    (props.donor.public_msg?.length ?? 0) > 0
  );
  const with_tribute = watch("with_tribute");
  const with_tribute_notif = watch("with_tribute_notif");
  const fv_cover_fee = watch("cover_fee");
  // tribute.notif can be undefined when unregisters
  const custom_msg: string | undefined = watch("tribute.notif.from_msg");
  const is_public = watch("is_public");
  const public_msg = watch("public_msg");

  const is_with_msg_to_npo = watch("is_with_msg_to_npo");
  const msg_to_npo = watch("msg_to_npo");

  const new_fee_allowance = fv_cover_fee
    ? min_fee_allowance(props.details, props.tip?.value ?? 0)
    : 0;

  return (
    <Summary
      program={props.details.program}
      classes="group grid content-start p-4 @md/steps:p-8 [&_#connectContainer]:mt-8"
      on_back={async () => {
        const { init } = props;
        //summary is skipped for chariot, also skip when going back
        if (init.recipient.hide_bg_tip) {
          return set_state({ ...props, step: "donate-form" });
        }
        return set_state({ ...props, step: "tip" });
      }}
      Amount={currency(props.details.currency)}
      amount={adjusted?.amount || +props.details.amount}
      fee_allowance={adjusted?.feeAllowance || new_fee_allowance}
      frequency="one-time"
      tip={
        props.tip
          ? {
              value: adjusted?.tip || props.tip.value,
              charity_name: props.init.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundaryClass>
        <Form className="grid grid-cols-2 gap-x-4 mt-4">
          <div className="col-span-full flex gap-x-2 flex-wrap gap-y-1 items-center">
            <CheckField
              {...register("is_public", {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.checked) set_with_donor_msg(false);
                },
              })}
            >
              Share my support publicly
            </CheckField>
            {is_public && (
              <button
                onClick={() => set_with_donor_msg((p) => !p)}
                type="button"
                className={`${with_donor_msg ? "text-red-l1" : "text-(--accent-primary) hover:enabled:text-(--accent-primary)"} font-semibold normal-case flex items-center gap-x-1 text-xs`}
              >
                {with_donor_msg ? (
                  <Eraser size={12} className="shrink-0" />
                ) : (
                  <PenToolIcon size={12} className="rotate-z-270 shrink-0" />
                )}
                <span>{with_donor_msg ? "Remove" : "Add"} testimony</span>
              </button>
            )}
          </div>
          {is_public && with_donor_msg && (
            <div className="col-span-full">
              <p
                data-exceed={errors.public_msg?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
              >
                {/** customMsg becomes undefined when unmounted */}
                {public_msg?.length ?? 0}/{donor_public_msg_max_length}
              </p>
              <textarea
                {...register("public_msg")}
                aria-invalid={!!errors.public_msg?.message}
                className="field-input w-full text-base font-semibold"
              />
              <p className="text-red text-xs empty:hidden text-right">
                {errors.public_msg?.message}
              </p>
            </div>
          )}
          {props.init.recipient.members.length < 2 && (
            <CheckField
              {...register("is_with_msg_to_npo")}
              classes="mt-4 col-span-full"
            >
              Add a note for {props.init.recipient.name}
            </CheckField>
          )}
          {is_with_msg_to_npo && (
            <div className="col-span-full">
              <p
                data-exceed={errors.msg_to_npo?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
              >
                {/** customMsg becomes undefined when unmounted */}
                {msg_to_npo?.length ?? 0}/{donor_msg_to_npo_max_length}
              </p>
              <textarea
                {...register("msg_to_npo")}
                aria-invalid={!!errors.msg_to_npo?.message}
                className="field-input w-full text-base font-semibold"
              />
              <p className="text-red text-xs empty:hidden text-right">
                {errors.msg_to_npo?.message}
              </p>
            </div>
          )}
          <CheckField {...register("cover_fee")} classes="col-span-full mt-4">
            Cover payment processing fees for your donation{" "}
            <span className="text-gray text-sm">
              (&nbsp;{props.init.recipient.name} receives the full amount&nbsp;)
            </span>
          </CheckField>
          {/*
      {method !== "crypto" && (
        <CheckField {...register("ukTaxResident")} classes="col-span-full mt-4">
          UK Taxpayer? Supercharge your donation with gift aid
        </CheckField>
      )}
      */}

          <TributeFields
            register={register as any}
            errors={errors}
            classes="mt-4 col-span-full"
            wid={{
              tribute_notif: with_tribute_notif,
              tribute: with_tribute,
            }}
            custom_msg={custom_msg}
          />
        </Form>
        <ChariotConnect
          theme="LightBlueTheme"
          disabled={grantState === "pending"}
          cid={CHARIOT_CONNECT_ID}
          // https://givechariot.readme.io/reference/integrating-connect#pre-populate-data-into-your-connect-session
          onDonationRequest={async () => {
            const isValid = await trigger(undefined, { shouldFocus: true });
            if (!isValid) throw "invalid";

            //always use recent values
            const _tip = adjusted?.tip || (props.tip?.value ?? 0);
            const _fee = adjusted?.feeAllowance || new_fee_allowance;
            const _amount = adjusted?.amount || +props.details.amount;
            const _total = _fee + _tip + _amount;

            const _totalCents = Math.floor(_total) * 100;
            const metadata: GrantMetaData = {
              ...getValues(),
              _tip,
              _fee,
              _amount,
              _totalCents,
            };

            return {
              amount: _totalCents, //in cents
              metadata,
            };
          }}
          // see https://givechariot.readme.io/reference/integrating-connect#capture-your-grant-intent
          onSuccess={async (ev) => {
            try {
              setPrompt({
                type: "loading",
                children: "Processing payment",
                isDismissable: false,
              });

              const {
                grantIntent,
                workflowSessionId,
                user: grantor,
              } = ev.detail;
              const meta = grantIntent.metadata as GrantMetaData;
              /** user may input amount different from our donate form */
              const grantAmount: number = grantIntent.amount / 100;

              const adjusted = toPlatformValues(grantAmount, {
                amount: meta._amount,
                tip: meta._tip,
                feeAllowance: meta._fee,
              });

              setAdjusted(adjusted);

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
                amount: {
                  currency: props.details.currency.code,
                  amount: adjusted.amount,
                  tip: adjusted.tip,
                  fee_allowance: adjusted.feeAllowance,
                },
                recipient: props.init.recipient.id,
                donor: {
                  title: "",
                  email: grantor.email,
                  first_name: grantor.firstName,
                  last_name: grantor.lastName,
                  company_name: "",
                  address: addr.issues ? undefined : addr.output,
                  is_public: props.donor.is_public,
                  public_msg: props.donor.public_msg,
                  msg_to_npo: props.donor.msg_to_npo,
                },
                tribute: meta.tribute,
                source: props.init.source,
              };

              if (props.details.program.value) {
                intent.program = {
                  id: props.details.program.value,
                  name: props.details.program.label,
                };
              }

              setGrantState("pending");
              const res = await fetch("/api/donation-intents/chariot", {
                method: "POST",
                body: JSON.stringify(intent),
              });
              if (!res.ok) throw await res.text();

              setPrompt(undefined);

              const search = `?name=${encodeURIComponent(props.init.recipient.name)}&id=${props.init.recipient.id}`;
              navigate(`${appRoutes.donate_thanks}${search}`);
            } catch (err) {
              setPrompt(error_prompt(err, { context: "processing donation" }));
            } finally {
              setGrantState(undefined);
            }
          }}
        />
      </ErrorBoundaryClass>
      <ContentLoader className="h-12 mt-4 block group-has-[chariot-connect]:hidden" />
      <DonationTerms
        endowName={props.init.recipient.name}
        classes="border-t border-gray-l3 mt-5 pt-4 "
      />
      {prompt && <Prompt {...prompt} onClose={() => setPrompt(undefined)} />}
    </Summary>
  );
}
