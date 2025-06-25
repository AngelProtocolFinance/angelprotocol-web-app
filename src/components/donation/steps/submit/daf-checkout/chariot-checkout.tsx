import { valibotResolver } from "@hookform/resolvers/valibot";
import { useNavigate } from "@remix-run/react";
import ContentLoader from "components/content-loader";
import { ErrorBoundaryClass } from "components/error";
import { CheckField, Field, Form } from "components/form";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes } from "constants/routes";
import { errorPrompt } from "helpers/error-prompt";
import { Eraser, PenToolIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import ChariotConnect from "react-chariot-connect";
import { useForm } from "react-hook-form";
import type { DonationIntent } from "types/donation-intent";
import {
  donor_msg_max_length,
  from_msg_max_length,
  msg_to_npo_max_length,
} from "types/donation-intent";
import { type InferOutput, boolean, object, pick } from "valibot";
import { toDonor } from "../../common/constants";
import { currency } from "../../common/currency";
import { minFeeAllowance } from "../../common/min-fee-allowance";
import Summary from "../../common/summary";
import { useDonationState } from "../../context";
import {
  type DafCheckoutStep,
  type Honorary,
  form_donor,
  honorary,
} from "../../types";
import { DonationTerms } from "../donation-terms";
import { type AdjustedAmounts, toPlatformValues } from "./to-platform-values";

const chariot_donor = pick(form_donor, [
  "msg_to_npo",
  "donor_message",
  "donor_public",
]);

interface ChariotDonor extends InferOutput<typeof chariot_donor> {}

const schema = object({
  is_with_msg_to_npo: boolean(),
  ...chariot_donor.entries,
  with_honorary: boolean(),
  with_tribute_notif: boolean(),
  ...honorary.entries,
  cover_fee: boolean(),
});

const default_fv = (
  cover_fee: boolean,
  honorary?: Honorary,
  donor?: ChariotDonor
): FV => {
  console.log(donor, honorary);
  const fv: FV = {
    is_with_msg_to_npo: (donor?.donor_message?.length ?? 0) > 0,
    with_honorary: false,
    with_tribute_notif: false,
    cover_fee,
    ...donor,
  };
  if (honorary?.honorary_fullname) {
    fv.honorary_fullname = honorary.honorary_fullname;
    fv.with_honorary = true;
    if (honorary.tribute_notif) {
      fv.with_tribute_notif = true;
      fv.tribute_notif = {
        to_email: honorary.tribute_notif.to_email,
        to_fullname: honorary.tribute_notif.to_fullname,
        from_msg: honorary.tribute_notif.from_msg,
      };
    }
  }
  return fv;
};

interface FV extends InferOutput<typeof schema> {}
interface GrantMetaData extends FV {
  _totalCents: number;
  _tip: number;
  _fee: number;
  _amount: number;
}

export default function ChariotCheckout(props: DafCheckoutStep) {
  const { setState } = useDonationState();
  const [prompt, setPrompt] = useState<IPromptV2>();
  const [grantState, setGrantState] = useState<"pending">();
  const navigate = useNavigate();

  const {
    watch,
    formState: { errors },
    register,
    trigger,
    getValues,
    setValue,
  } = useForm<FV>({
    defaultValues: default_fv(
      !!props.feeAllowance,
      props.honorary,
      props.donor
    ),
    resolver: valibotResolver(schema),
  });

  /** save actual grant amount and reflect in Summary form */
  const [adjusted, setAdjusted] = useState<AdjustedAmounts>();
  const [with_donor_msg, set_with_donor_msg] = useState(
    (props.donor.donor_message?.length ?? 0) > 0
  );
  const with_honorary = watch("with_honorary");
  const with_tribute_notif = watch("with_tribute_notif");
  const fv_cover_fee = watch("cover_fee");
  const custom_msg = watch("tribute_notif.from_msg");
  const is_public = watch("donor_public");
  const public_msg = watch("donor_message");

  const is_with_msg_to_npo = watch("is_with_msg_to_npo");
  const msg_to_npo = watch("msg_to_npo");

  const newFeeAllowance = fv_cover_fee
    ? minFeeAllowance(props.details, props.tip?.value ?? 0)
    : 0;

  return (
    <Summary
      program={props.details.program}
      classes="group grid content-start p-4 @md/steps:p-8 [&_#connectContainer]:mt-8"
      onBack={async () => {
        const { init } = props;
        //summary is skipped for chariot, also skip when going back
        if (init.recipient.hide_bg_tip) {
          return setState({ ...props, step: "donate-form" });
        }
        return setState({ ...props, step: "tip" });
      }}
      Amount={currency(props.details.currency)}
      amount={adjusted?.amount || +props.details.amount}
      feeAllowance={adjusted?.feeAllowance || newFeeAllowance}
      frequency="one-time"
      tip={
        props.tip
          ? {
              value: adjusted?.tip || props.tip.value,
              charityName: props.init.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundaryClass>
        <Form className="grid grid-cols-2 gap-x-4 mt-4">
          <div className="col-span-full flex gap-x-2 flex-wrap gap-y-1 items-center">
            <CheckField
              {...register("donor_public", {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const x = e.target.checked;
                  set_with_donor_msg(x);
                  setValue("donor_message", x ? "" : undefined);
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
                data-exceed={errors.donor_message?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
              >
                {/** customMsg becomes undefined when unmounted */}
                {public_msg?.length ?? 0}/{donor_msg_max_length}
              </p>
              <textarea
                {...register("donor_message", { shouldUnregister: true })}
                aria-invalid={!!errors.donor_message?.message}
                className="field-input w-full text-base font-semibold"
              />
              <p className="text-red text-xs empty:hidden text-right">
                {errors.donor_message?.message}
              </p>
            </div>
          )}
          {props.init.recipient.members.length < 2 && (
            <CheckField {...register("is_with_msg_to_npo")} classes="mt-4">
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
                {msg_to_npo?.length ?? 0}/{msg_to_npo_max_length}
              </p>
              <textarea
                {...register("msg_to_npo", { shouldUnregister: true })}
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

          <CheckField
            {...register("with_honorary", {
              onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                const x = ev.target.checked;
                setValue("honorary_fullname", x ? "" : undefined);
                if (!x) setValue("tribute_notif", undefined);
              },
            })}
            classes="col-span-full mt-4"
          >
            Dedicate my donation
          </CheckField>

          {with_honorary && (
            <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
              <Field
                {...register("honorary_fullname")}
                label="Honoree's name"
                placeholder="e.g. Jane Doe"
                classes={{
                  container: "w-full [&_input]:bg-white",
                  input: "field-input-donate",
                }}
                required
                error={errors.honorary_fullname?.message}
              />
              <CheckField
                {...register("with_tribute_notif", {
                  onChange: (ev: ChangeEvent<HTMLInputElement>) => {
                    const x = ev.target.checked;
                    setValue(
                      "tribute_notif",
                      x
                        ? {
                            to_email: "",
                            to_fullname: "",
                            from_msg: "",
                          }
                        : undefined
                    );
                  },
                })}
                classes="col-span-full mt-3 text-sm"
              >
                Notify someone about this tribute
              </CheckField>

              {with_tribute_notif && (
                <div className="grid gap-y-3 mt-4 rounded-lg p-4 bg-white shadow-inner">
                  <Field
                    {...register("tribute_notif.to_fullname")}
                    label="Recipient name"
                    placeholder="e.g. Jane Doe"
                    classes={{
                      container: "[&_label]:text-sm [&_input]:text-sm",
                      input: "field-input-donate",
                    }}
                    required
                    error={errors.tribute_notif?.to_fullname?.message}
                  />
                  <Field
                    {...register("tribute_notif.to_email")}
                    label="Email address"
                    placeholder="e.g. janedoe@better.giving"
                    classes={{
                      container: "[&_label]:text-sm [&_input]:text-sm",
                      input: "field-input-donate",
                    }}
                    required
                    error={errors.tribute_notif?.to_email?.message}
                  />
                  <Field
                    {...register("tribute_notif.from_msg")}
                    rows={2}
                    type="textarea"
                    label="Custom message"
                    placeholder="Message to recipient"
                    classes={{
                      container: "[&_label]:text-sm [&_textarea]:text-sm",
                      input: "field-input-donate",
                    }}
                    required={false}
                    error={errors.tribute_notif?.from_msg?.message}
                  />
                  <p
                    data-exceed={errors.tribute_notif?.from_msg?.type === "max"}
                    className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red"
                  >
                    {custom_msg.length}/{from_msg_max_length}
                  </p>
                </div>
              )}
            </div>
          )}
        </Form>
        <ChariotConnect
          theme="LightBlueTheme"
          disabled={grantState === "pending"}
          cid={CHARIOT_CONNECT_ID}
          // https://givechariot.readme.io/reference/integrating-connect#pre-populate-data-into-your-connect-session
          onDonationRequest={async () => {
            const isValid = await trigger(undefined, { shouldFocus: true });
            if (!isValid) throw `invalid`;

            //always use recent values
            const _tip = adjusted?.tip || (props.tip?.value ?? 0);
            const _fee = adjusted?.feeAllowance || newFeeAllowance;
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

              const {
                postalCode,
                line1,
                line2,
                city: _,
                state: _2,
              } = grantor.address;

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
                donor: toDonor({
                  title: "",
                  email: grantor.email,
                  first_name: grantor.firstName,
                  last_name: grantor.lastName,
                  company_name: "",
                  address: {
                    street: [line1, line2].filter(Boolean).join(", "),
                    zip_code: postalCode,
                  },
                }),
                source: props.init.source,
                donor_public: props.donor.donor_public,
              };

              if (props.donor.msg_to_npo) {
                intent.msg_to_npo = props.donor.msg_to_npo;
              }

              if (props.donor.donor_message) {
                intent.donor_message = props.donor.donor_message;
              }

              if (props.details.program.value) {
                intent.program = {
                  id: props.details.program.value,
                  name: props.details.program.label,
                };
              }

              if (meta.honorary_fullname) {
                intent.tribute = {
                  full_name: meta.honorary_fullname,
                };
                if (meta.with_tribute_notif) {
                  intent.tribute.notif = meta.tribute_notif;
                }
              }

              setGrantState("pending");
              const res = await fetch("/api/donation-intents/chariot", {
                method: "POST",
                body: JSON.stringify(intent),
              });
              if (!res.ok) throw await res.text();

              setPrompt(undefined);

              const to = encodeURIComponent(props.init.recipient.name);
              navigate(`${appRoutes.donate_thanks}?recipient_name=${to}`);
            } catch (err) {
              setPrompt(errorPrompt(err, { context: "processing donation" }));
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
      {prompt && <PromptV2 {...prompt} onClose={() => setPrompt(undefined)} />}
    </Summary>
  );
}
