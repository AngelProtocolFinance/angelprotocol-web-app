import type { DonationIntent } from "@better-giving/donation/intent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@remix-run/react";
import ContentLoader from "components/content-loader";
import { ErrorBoundaryClass } from "components/error";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { type IPromptV2, PromptV2 } from "components/prompt";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes } from "constants/routes";
import { errorPrompt } from "helpers/error-prompt";
import { Eraser, PenToolIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import ChariotConnect from "react-chariot-connect";
import { useForm } from "react-hook-form";
import { schema } from "schemas/shape";
import { mixed, string } from "yup";
import {
  initDonorTitleOption,
  initTributeNotif,
  toDonor,
} from "../../common/constants";
import { currency } from "../../common/currency";
import { minFeeAllowance } from "../../common/min-fee-allowance";
import Summary from "../../common/summary";
import { useDonationState } from "../../context";
import type { DafCheckoutStep, Honorary } from "../../types";
import { DonationTerms } from "../donation-terms";
import { type AdjustedAmounts, toPlatformValues } from "./to-platform-values";

type FV = Honorary & {
  coverFee: boolean;
  ukTaxResident: boolean;
  isPublic: boolean;
  publicMsg: string;
};
type GrantMetaData = FV & {
  _totalCents: number;
  _tip: number;
  _fee: number;
  _amount: number;
};

const withHonoraryKey: keyof FV = "withHonorary";
const withTributeNotifKey: keyof FV = "withTributeNotif";
const CUSTOM_MSG_MAX_LENGTH = 250;
const PUBLIC_MSG_MAX_LENGTH = 500;

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
    resetField,
  } = useForm<FV>({
    defaultValues: {
      ...(props.honorary || {
        withHonorary: false,
        honoraryFullName: "",
        withTributeNotif: false,
        tributeNotif: initTributeNotif,
        publicMsg: "",
        isPublic: true,
      }),
      coverFee: !!props.feeAllowance,
      ukTaxResident: false,
    },
    resolver: yupResolver(
      schema<FV>({
        honoraryFullName: string().when(withHonoraryKey, (values, schema) => {
          const [withHonorary] = values as [boolean];
          return withHonorary ? schema.required("required") : schema;
        }),
        tributeNotif: mixed().when(withTributeNotifKey, (values, obj) => {
          const [withTributeNotif] = values as [boolean];
          return !withTributeNotif
            ? obj.optional()
            : schema<FV["tributeNotif"]>({
                to_fullname: string().required("required"),
                to_email: string().required("required").email("invalid email"),
                from_msg: string().max(
                  CUSTOM_MSG_MAX_LENGTH,
                  "must be less than 250 characters"
                ),
              });
        }),
      })
    ),
  });

  /** save actual grant amount and reflect in Summary form */
  const [adjusted, setAdjusted] = useState<AdjustedAmounts>();
  const [withDonorMsg, setWithDonorMsg] = useState(
    props.donor.publicMsg.length > 0
  );
  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");
  const fvCoverFee = watch("coverFee");
  const customMsg = watch("tributeNotif.from_msg");
  const isPublic = watch("isPublic");
  const publicMsg = watch("publicMsg");

  const newFeeAllowance = fvCoverFee
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
              {...register("isPublic", {
                onChange: () => setWithDonorMsg(false),
              })}
            >
              Share my support publicly
            </CheckField>
            {isPublic && (
              <button
                onClick={() => setWithDonorMsg((p) => !p)}
                type="button"
                className={`${withDonorMsg ? "text-red-l1" : "text-(--accent-primary) hover:enabled:text-(--accent-primary)"} font-semibold normal-case flex items-center gap-x-1 text-xs`}
              >
                {withDonorMsg ? (
                  <Eraser size={12} className="shrink-0" />
                ) : (
                  <PenToolIcon size={12} className="rotate-z-270 shrink-0" />
                )}
                <span>{withDonorMsg ? "Remove" : "Add"} testimony</span>
              </button>
            )}
          </div>
          {isPublic && withDonorMsg && (
            <div className="col-span-full">
              <p
                data-exceed={errors.publicMsg?.type === "max"}
                className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red text-right mb-1"
              >
                {/** customMsg becomes undefined when unmounted */}
                {publicMsg?.length ?? 0}/{PUBLIC_MSG_MAX_LENGTH}
              </p>
              <textarea
                {...register("publicMsg", { shouldUnregister: true })}
                aria-invalid={!!errors.publicMsg?.message}
                className="field-input w-full text-base font-semibold"
              />
              <p className="text-red text-xs empty:hidden text-right">
                {errors.publicMsg?.message}
              </p>
            </div>
          )}
          <CheckField {...register("coverFee")} classes="col-span-full mt-4">
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
            {...register("withHonorary", {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.checked) {
                  resetField("withTributeNotif");
                  resetField("tributeNotif");
                }
              },
            })}
            classes="col-span-full mt-4"
          >
            Dedicate my donation
          </CheckField>

          {withHonorary && (
            <div className="col-span-full p-4 bg-blue-l5 rounded-lg mt-2 shadow-inner">
              <Field
                {...register("honoraryFullName")}
                label="Honoree's name"
                placeholder="e.g. Jane Doe"
                classes={{
                  container: "w-full [&_input]:bg-white",
                  input: "field-input-donate",
                }}
                required
                error={errors.honoraryFullName?.message}
              />
              <CheckField
                {...register("withTributeNotif")}
                classes="col-span-full mt-3 text-sm"
              >
                Notify someone about this tribute
              </CheckField>

              {withTributeNotif && (
                <div className="grid gap-y-3 mt-4 rounded-lg p-4 bg-white shadow-inner">
                  <Field
                    {...register("tributeNotif.to_fullname")}
                    label="Recipient name"
                    placeholder="e.g. Jane Doe"
                    classes={{
                      container: "[&_label]:text-sm [&_input]:text-sm",
                      input: "field-input-donate",
                    }}
                    required
                    error={errors.tributeNotif?.to_fullname?.message}
                  />
                  <Field
                    {...register("tributeNotif.to_email")}
                    label="Email address"
                    placeholder="e.g. janedoe@better.giving"
                    classes={{
                      container: "[&_label]:text-sm [&_input]:text-sm",
                      input: "field-input-donate",
                    }}
                    required
                    error={errors.tributeNotif?.to_email?.message}
                  />
                  <Field
                    {...register("tributeNotif.from_msg")}
                    rows={2}
                    type="textarea"
                    label="Custom message"
                    placeholder="Message to recipient"
                    classes={{
                      container: "[&_label]:text-sm [&_textarea]:text-sm",
                      input: "field-input-donate",
                    }}
                    required={false}
                    error={errors.tributeNotif?.from_msg?.message}
                  />
                  <p
                    data-exceed={errors.tributeNotif?.from_msg?.type === "max"}
                    className="text-xs text-gray-l1 -mt-2 data-[exceed='true']:text-red"
                  >
                    {customMsg.length}/{CUSTOM_MSG_MAX_LENGTH}
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

              const { postalCode, line1, line2, city, state } = grantor.address;

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
                  title: initDonorTitleOption,
                  email: grantor.email,
                  first_name: grantor.firstName,
                  last_name: grantor.lastName,
                  company_name: "",
                  zipCode: postalCode,
                  streetAddress: [line1, line2, city, state]
                    .filter(Boolean)
                    .join(", "),
                  ukTaxResident: meta.ukTaxResident,
                }),
                source: props.init.source,
                donor_public: props.donor.isPublic,
              };

              if (props.donor.publicMsg) {
                intent.donor_message = props.donor.publicMsg;
              }

              if (props.details.program.value) {
                intent.program = {
                  id: props.details.program.value,
                  name: props.details.program.label,
                };
              }

              if (meta.honoraryFullName) {
                intent.tribute = {
                  full_name: meta.honoraryFullName,
                };
                if (meta.withTributeNotif) {
                  intent.tribute.notif = meta.tributeNotif;
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
