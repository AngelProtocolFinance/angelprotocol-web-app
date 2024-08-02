import { yupResolver } from "@hookform/resolvers/yup";
import ContentLoader from "components/ContentLoader";
import Prompt from "components/Prompt";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { PROCESSING_RATES } from "constants/common";
import { CHARIOT_CONNECT_ID } from "constants/env";
import { appRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import ErrorBoundary from "errors/ErrorBoundary";
import { useState } from "react";
import ChariotConnect from "react-chariot-connect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { schema } from "schemas/shape";
import { useLazyChariotGrantQuery } from "services/apes";
import { userIsSignedIn } from "types/auth";
import type { DonateThanksState } from "types/pages";
import { mixed, string } from "yup";
import { useDonationState } from "../../Context";
import { currency } from "../../common/Currency";
import Summary from "../../common/Summary";
import {
  initDonorTitleOption,
  initTributeNotif,
  toDonor,
} from "../../common/constants";
import type { DafCheckoutStep, Honorary } from "../../types";
import { DonationTerms } from "../DonationTerms";
import { type AdjustedAmounts, toPlatformValues } from "./toPlatformValues";

export type FV = Honorary & { coverFee: boolean; ukTaxResident: boolean };
type GrantMetaData = FV & {
  _totalCents: number;
  _tip: number;
  _fee: number;
  _amount: number;
};

const withHonoraryKey: keyof FV = "withHonorary";
const withTributeNotifKey: keyof FV = "withTributeNotif";
const CUSTOM_MSG_MAX_LENGTH = 250;

export default function ChariotCheckout(props: DafCheckoutStep) {
  const {
    init,
    details,
    liquidSplitPct,
    tip,
    donor: fvDonor,
    honorary,
    feeAllowance,
  } = props;

  const { setState } = useDonationState();
  const { handleError } = useErrorContext();
  const { showModal, closeModal } = useModalContext();
  const [createGrant, { isLoading }] = useLazyChariotGrantQuery();
  const navigate = useNavigate();

  const {
    watch,
    formState: { errors },
    register,
    trigger,
    getValues,
  } = useForm<FV>({
    defaultValues: {
      ...(honorary || {
        withHonorary: false,
        honoraryFullName: "",
        withTributeNotif: false,
        tributeNotif: initTributeNotif,
      }),
      coverFee: !!feeAllowance,
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
                toFullName: string().required("required"),
                toEmail: string().required("required").email("invalid email"),
                fromMsg: string().max(
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

  const withHonorary = watch("withHonorary");
  const withTributeNotif = watch("withTributeNotif");
  const fvCoverFee = watch("coverFee");
  const customMsg = watch("tributeNotif.fromMsg");

  const newFvFeeAllowance = fvCoverFee
    ? +details.amount * PROCESSING_RATES.chariot
    : 0;

  return (
    <Summary
      program={details.program}
      classes="group grid content-start p-4 @md/steps:p-8 [&_#connectContainer]:mt-8"
      onBack={() => {
        //summary is skipped for chariot, also skip when going back
        if (init.recipient.hide_bg_tip) {
          if (init.config?.splitDisabled) {
            return setState({ ...props, step: "donate-form" });
          }
          return setState({ ...props, step: "splits" });
        }
        return setState({ ...props, step: "tip" });
      }}
      Amount={currency(details.currency)}
      amount={adjusted?.amount || +details.amount}
      feeAllowance={adjusted?.feeAllowance || newFvFeeAllowance}
      splitLiq={liquidSplitPct}
      frequency="one-time"
      tip={
        tip
          ? {
              value: adjusted?.tip || tip.value,
              charityName: init.recipient.name,
            }
          : undefined
      }
    >
      <ErrorBoundary>
        <Form className="grid grid-cols-2 gap-x-4 mt-4">
          <CheckField {...register("coverFee")} classes="col-span-full">
            Cover payment processing fees for your donation{" "}
            <span className="text-navy-l1 text-sm">
              (&nbsp;{init.recipient.name} receives the full amount&nbsp;)
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
            {...register("withHonorary")}
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
                classes="w-full field-donate [&_input]:bg-white"
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
                    {...register("tributeNotif.toFullName")}
                    label="Recipient name"
                    placeholder="e.g. Jane Doe"
                    classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                    required
                    error={errors.tributeNotif?.toFullName?.message}
                  />
                  <Field
                    {...register("tributeNotif.toEmail")}
                    label="Email address"
                    placeholder="e.g. janedoe@better.giving"
                    classes="field-donate [&_label]:text-sm [&_input]:text-sm"
                    required
                    error={errors.tributeNotif?.toEmail?.message}
                  />
                  <Field
                    {...register("tributeNotif.fromMsg")}
                    rows={2}
                    type="textarea"
                    label="Custom message"
                    placeholder="Message to recipient"
                    classes={{
                      container:
                        "field-donate [&_label]:text-sm [&_input]:text-sm",
                    }}
                    required={false}
                    error={errors.tributeNotif?.fromMsg?.message}
                  />
                  <p
                    data-exceed={errors.tributeNotif?.fromMsg?.type === "max"}
                    className="text-xs text-navy-l4 -mt-2 data-[exceed='true']:text-red"
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
          disabled={isLoading}
          cid={CHARIOT_CONNECT_ID}
          // https://givechariot.readme.io/reference/integrating-connect#pre-populate-data-into-your-connect-session
          onDonationRequest={async () => {
            const isValid = await trigger(undefined, { shouldFocus: true });
            if (!isValid) throw `invalid`;

            //always use recent values

            const _tip = adjusted?.tip || (props.tip?.value ?? 0);
            const _fee = adjusted?.feeAllowance || newFvFeeAllowance;
            const _amount = adjusted?.amount || +details.amount;
            const _total = _fee + _tip + _amount;

            const _totalCents = Math.ceil(_total) * 100;
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
              showModal(Prompt, {
                type: "loading",
                children: "Processing payment..",
              });

              const { grantIntent, workflowSessionId, user } = ev.detail;
              const meta = grantIntent.metadata as GrantMetaData;
              console.log(meta);
              /** user may input amount different from our donate form */
              const grantAmount: number = grantIntent.amount / 100;

              const adjusted = toPlatformValues(grantAmount, {
                amount: meta._amount,
                tip: meta._tip,
                feeAllowance: meta._fee,
              });

              setAdjusted(adjusted);

              const { postalCode, line1, line2, city, state } = user.address;

              await createGrant({
                transactionId: workflowSessionId,
                amount: adjusted.amount,
                tipAmount: adjusted.tip,
                feeAllowance: adjusted.feeAllowance,
                currency: details.currency.code,
                endowmentId: init.recipient.id,
                splitLiq: liquidSplitPct,
                donor: toDonor({
                  title: initDonorTitleOption,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  zipCode: postalCode,
                  streetAddress: [line1, line2, city, state]
                    .filter(Boolean)
                    .join(", "),
                  ukTaxResident: meta.ukTaxResident,
                }),
                source: init.source,
                ...(details.program.value && {
                  programId: details.program.value,
                }),
                ...(meta.honoraryFullName && {
                  inHonorOf: meta.honoraryFullName,
                  tributeNotif: meta.withTributeNotif
                    ? meta.tributeNotif
                    : undefined,
                }),
              }).unwrap();

              closeModal();

              navigate(`${appRoutes.donate_thanks}`, {
                state: {
                  guestDonor: userIsSignedIn(user)
                    ? undefined
                    : {
                        email: fvDonor.email,
                        fullName: `${fvDonor.firstName} ${fvDonor.lastName}`,
                      },
                  recipientId: init.recipient.id,
                  recipientName: init.recipient.name,
                } satisfies DonateThanksState,
              });
            } catch (err) {
              handleError(err, { context: "processing donation" });
            }
          }}
        />
      </ErrorBoundary>
      <ContentLoader className="h-12 mt-4 block group-has-[chariot-connect]:hidden" />
      <DonationTerms
        endowName={props.init.recipient.name}
        classes="border-t border-gray-l4 mt-5 pt-4 "
      />
    </Summary>
  );
}
